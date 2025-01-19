

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."get_filtered_bookmarks_with_tags"("input_user_id" "uuid", "input_bookmark_ids" integer[]) RETURNS TABLE("bookmark_id" integer, "user_id" "uuid", "url" "text", "category_id" integer, "note" "text", "ogp_title" "text", "ogp_description" "text", "ogp_image" "text", "created_at" timestamp without time zone, "updated_at" timestamp without time zone, "is_valid" boolean, "last_accessed_at" timestamp with time zone, "access_count" integer, "tag_names" "text")
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        b.bookmark_id,
        b.user_id,
        b.url,
        b.category_id,
        b.note,
        b.ogp_title,
        b.ogp_description,
        b.ogp_image,
        b.created_at,
        b.updated_at,
        b.is_valid,
        b.last_accessed_at,
        b.access_count,
        string_agg(t.name, ', ') AS tag_names
    FROM
        public.bookmarks_with_ogp b
    LEFT JOIN
        public.tag_mappings tm ON tm.bookmark_id = b.bookmark_id
    LEFT JOIN
        public.tags t ON t.id = tm.tag_id
    WHERE
        b.user_id = input_user_id
        AND b.bookmark_id = ANY(input_bookmark_ids)
    GROUP BY
        b.bookmark_id, b.user_id, b.url, b.category_id, b.note, b.ogp_title, 
        b.ogp_description, b.ogp_image, b.created_at, b.updated_at, 
        b.is_valid, b.last_accessed_at, b.access_count;
END;
$$;


ALTER FUNCTION "public"."get_filtered_bookmarks_with_tags"("input_user_id" "uuid", "input_bookmark_ids" integer[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") RETURNS TABLE("category_id" "uuid", "category_name" "text", "bookmark_count" integer)
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.name, COUNT(b.id) AS bookmark_count
  FROM categories c
  JOIN bookmarks b ON c.id = b.category_id
  WHERE b.user_id = user_id
  GROUP BY c.id, c.name
  ORDER BY bookmark_count DESC
  LIMIT 10;  -- 例えば上位10つを返す
END;
$$;


ALTER FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_last_updated_time"("input_user_id" "uuid") RETURNS timestamp without time zone
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    last_update_time TIMESTAMP;
BEGIN
    SELECT MAX(last_update) INTO last_update_time
    FROM (
        SELECT MAX(b.updated_at) AS last_update
        FROM bookmarks b
        WHERE b.user_id = input_user_id

        UNION ALL

        SELECT MAX(t.created_at) AS last_update
        FROM tag_mappings t
        JOIN bookmarks b ON t.bookmark_id = b.id
        WHERE b.user_id = input_user_id

        UNION ALL

        SELECT MAX(o.last_fetched) AS last_update
        FROM ogp_data o
        JOIN bookmarks b ON o.url = b.url
        WHERE b.user_id = input_user_id
    ) AS combined_updates;

    RETURN last_update_time;
END;
$$;


ALTER FUNCTION "public"."get_last_updated_time"("input_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_bookmarks"("input_user_id" "uuid", "input_tags" "text"[], "input_categories" "text"[], "input_title_keywords" "text"[], "input_sort_option" "text", "input_ascending" boolean, "input_offset" integer, "input_limit" integer) RETURNS TABLE("bookmark_id" integer, "user_id" "uuid", "url" "text", "category_id" integer, "note" "text", "ogp_title" "text", "ogp_description" "text", "ogp_image" "text", "created_at" timestamp without time zone, "updated_at" timestamp without time zone, "is_valid" boolean, "access_count" integer, "last_accessed_at" timestamp with time zone, "tag_list" "text")
    LANGUAGE "plpgsql" STABLE
    AS $_$
BEGIN
  RETURN QUERY EXECUTE
    'SELECT
        b.id as bookmark_id,
        b.user_id,
        b.url,
        b.category_id,
        b.note,
        o.title as ogp_title,
        o.description as ogp_description,
        o.image_url as ogp_image,
        b.created_at,
        b.updated_at,
        b.is_valid,
        COALESCE(ba.access_count, 0) as access_count,
        ba.last_accessed_at,
        string_agg(t.name, '','') as tag_list
    FROM
        bookmarks b
    LEFT JOIN
        ogp_data o ON b.url = o.url
    LEFT JOIN
        tag_mappings tm ON b.id = tm.bookmark_id
    LEFT JOIN
        tags t ON tm.tag_id = t.id
    LEFT JOIN
        categories c ON b.category_id = c.id
    LEFT JOIN
        bookmark_accesses ba ON b.id = ba.bookmark_id
    WHERE
        b.user_id = $1
    AND
        (t.name = ANY($2) OR $2 IS NULL)
    AND
        (c.name = ANY($3) OR $3 IS NULL)
    AND
        (o.title ILIKE ANY($4) OR $4 IS NULL)
    GROUP BY b.id, b.user_id, b.url, b.category_id, b.note, o.title, o.description, o.image_url, b.created_at, b.updated_at, b.is_valid, ba.access_count, ba.last_accessed_at
    ORDER BY ' || (CASE WHEN input_sort_option = 'created_at' THEN 'b.created_at' 
                        WHEN input_sort_option = 'ogp_title' THEN 'o.title'
                        WHEN input_sort_option = 'access_count' THEN 'ba.access_count'
                        ELSE 'b.created_at' END) ||
        (CASE WHEN input_ascending THEN ' ASC' ELSE ' DESC' END) ||
    ' LIMIT $5 OFFSET $6'
    USING input_user_id, input_tags, input_categories, input_title_keywords, input_limit, input_offset;
END;
$_$;


ALTER FUNCTION "public"."search_bookmarks"("input_user_id" "uuid", "input_tags" "text"[], "input_categories" "text"[], "input_title_keywords" "text"[], "input_sort_option" "text", "input_ascending" boolean, "input_offset" integer, "input_limit" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_completed_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed' THEN
    NEW.completed_at := NOW();
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_completed_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_bookmark_access"("input_bookmark_id" integer) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    INSERT INTO bookmark_accesses (bookmark_id, last_accessed_at, access_count)
    VALUES (input_bookmark_id, CURRENT_TIMESTAMP, 1)
    ON CONFLICT (bookmark_id)
    DO UPDATE SET
        last_accessed_at = EXCLUDED.last_accessed_at,
        access_count = bookmark_accesses.access_count + 1;
END;
$$;


ALTER FUNCTION "public"."update_bookmark_access"("input_bookmark_id" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."api_keys" (
    "api_key_id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "api_key" character varying(255) NOT NULL,
    "expires_at" timestamp without time zone,
    "last_used_at" timestamp without time zone,
    "active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "label" character varying(255) DEFAULT 'Unnamed'::character varying NOT NULL,
    "hashed_key" character varying(64) NOT NULL
);


ALTER TABLE "public"."api_keys" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."api_keys_api_key_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."api_keys_api_key_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."api_keys_api_key_id_seq" OWNED BY "public"."api_keys"."api_key_id";



CREATE TABLE IF NOT EXISTS "public"."bookmark_accesses" (
    "bookmark_id" integer NOT NULL,
    "last_accessed_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "access_count" integer DEFAULT 1
);


ALTER TABLE "public"."bookmark_accesses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bookmark_tags" (
    "bookmark_id" integer NOT NULL,
    "tag_id" integer NOT NULL
);


ALTER TABLE "public"."bookmark_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bookmarks" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "url" "text" NOT NULL,
    "category_id" integer,
    "note" "text",
    "is_valid" boolean DEFAULT true,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."bookmarks" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."bookmarks_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."bookmarks_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."bookmarks_id_seq" OWNED BY "public"."bookmarks"."id";



CREATE TABLE IF NOT EXISTS "public"."ogp_data" (
    "url" "text" NOT NULL,
    "title" "text",
    "description" "text",
    "image_url" "text",
    "last_fetched" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."ogp_data" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."bookmarks_with_ogp" AS
 SELECT "b"."id" AS "bookmark_id",
    "b"."user_id",
    "b"."url",
    "b"."category_id",
    "b"."note",
    "o"."title" AS "ogp_title",
    "o"."description" AS "ogp_description",
    "o"."image_url" AS "ogp_image",
    "b"."created_at",
    "b"."updated_at",
    "b"."is_valid",
    "a"."last_accessed_at",
    "a"."access_count"
   FROM (("public"."bookmarks" "b"
     LEFT JOIN "public"."ogp_data" "o" ON (("b"."url" = "o"."url")))
     LEFT JOIN ( SELECT "bookmark_accesses"."bookmark_id",
            "bookmark_accesses"."last_accessed_at",
            "bookmark_accesses"."access_count"
           FROM "public"."bookmark_accesses") "a" ON (("a"."bookmark_id" = "b"."id")));


ALTER TABLE "public"."bookmarks_with_ogp" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tag_mappings" (
    "id" integer NOT NULL,
    "bookmark_id" integer NOT NULL,
    "tag_id" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."tag_mappings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" character varying(50) NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."tags" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."bookmarks_with_tags" AS
 SELECT "b"."id",
    "b"."user_id",
    "json_agg"(DISTINCT "jsonb_build_object"('id', "t"."id", 'name', "t"."name")) AS "tags"
   FROM (("public"."bookmarks" "b"
     LEFT JOIN "public"."tag_mappings" "tm" ON (("b"."id" = "tm"."bookmark_id")))
     LEFT JOIN "public"."tags" "t" ON (("tm"."tag_id" = "t"."id")))
  GROUP BY "b"."id", "b"."user_id";


ALTER TABLE "public"."bookmarks_with_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "name" character varying(100) NOT NULL,
    "parent_id" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "color" character varying(7) DEFAULT '#FFFFFF'::character varying
);


ALTER TABLE "public"."categories" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."categories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."categories_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "public"."categories"."id";



CREATE OR REPLACE VIEW "public"."categories_with_bookmark_count" AS
 SELECT "c"."id",
    "c"."user_id",
    "c"."name",
    "c"."parent_id",
    "c"."created_at",
    "c"."color",
    COALESCE("b"."bookmark_count", (0)::bigint) AS "bookmark_count"
   FROM ("public"."categories" "c"
     LEFT JOIN ( SELECT "bookmarks"."category_id",
            "count"("bookmarks"."id") AS "bookmark_count"
           FROM "public"."bookmarks"
          GROUP BY "bookmarks"."category_id") "b" ON (("c"."id" = "b"."category_id")));


ALTER TABLE "public"."categories_with_bookmark_count" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."failed_bookmark_imports" (
    "id" integer NOT NULL,
    "import_status_id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "url" "text" NOT NULL,
    "error_message" "text",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."failed_bookmark_imports" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."failed_bookmark_imports_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."failed_bookmark_imports_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."failed_bookmark_imports_id_seq" OWNED BY "public"."failed_bookmark_imports"."id";



CREATE TABLE IF NOT EXISTS "public"."import_status" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "status" "text" NOT NULL,
    "progress" integer DEFAULT 0,
    "total_items" integer DEFAULT 0,
    "completed_items" integer DEFAULT 0,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "completed_at" timestamp without time zone
);


ALTER TABLE "public"."import_status" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."import_status_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."import_status_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."import_status_id_seq" OWNED BY "public"."import_status"."id";



CREATE TABLE IF NOT EXISTS "public"."reminders" (
    "id" integer NOT NULL,
    "bookmark_id" integer,
    "reminder_date" timestamp without time zone NOT NULL,
    "notified" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."reminders" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."reminders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."reminders_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."reminders_id_seq" OWNED BY "public"."reminders"."id";



CREATE TABLE IF NOT EXISTS "public"."search_queries" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "query" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."search_queries" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."search_queries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."search_queries_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."search_queries_id_seq" OWNED BY "public"."search_queries"."id";



CREATE SEQUENCE IF NOT EXISTS "public"."tag_mappings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."tag_mappings_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."tag_mappings_id_seq" OWNED BY "public"."tag_mappings"."id";



CREATE OR REPLACE VIEW "public"."tag_usage" AS
SELECT
    NULL::integer AS "tag_id",
    NULL::character varying(50) AS "tag_name",
    NULL::"uuid" AS "user_id",
    NULL::bigint AS "bookmark_count";


ALTER TABLE "public"."tag_usage" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."tags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."tags_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."tags_id_seq" OWNED BY "public"."tags"."id";



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "username" character varying(50),
    "profile_image_url" "text",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."api_keys" ALTER COLUMN "api_key_id" SET DEFAULT "nextval"('"public"."api_keys_api_key_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."bookmarks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."bookmarks_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."categories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."categories_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."failed_bookmark_imports" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."failed_bookmark_imports_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."import_status" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."import_status_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."reminders" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reminders_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."search_queries" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."search_queries_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."tag_mappings" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tag_mappings_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."tags" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tags_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."api_keys"
    ADD CONSTRAINT "api_keys_pkey" PRIMARY KEY ("api_key_id");



ALTER TABLE ONLY "public"."bookmark_accesses"
    ADD CONSTRAINT "bookmark_accesses_pkey" PRIMARY KEY ("bookmark_id");



ALTER TABLE ONLY "public"."bookmark_tags"
    ADD CONSTRAINT "bookmark_tags_pkey" PRIMARY KEY ("bookmark_id", "tag_id");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."failed_bookmark_imports"
    ADD CONSTRAINT "failed_bookmark_imports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."import_status"
    ADD CONSTRAINT "import_status_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ogp_data"
    ADD CONSTRAINT "ogp_data_pkey" PRIMARY KEY ("url");



ALTER TABLE ONLY "public"."reminders"
    ADD CONSTRAINT "reminders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."search_queries"
    ADD CONSTRAINT "search_queries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tag_mappings"
    ADD CONSTRAINT "tag_mappings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."api_keys"
    ADD CONSTRAINT "unique_user_api_key" UNIQUE ("user_id", "api_key");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "unique_user_tag" UNIQUE ("user_id", "name");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "unique_user_url" UNIQUE ("user_id", "url");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_api_key" ON "public"."api_keys" USING "btree" ("api_key");



CREATE INDEX "idx_user_id" ON "public"."api_keys" USING "btree" ("user_id");



CREATE OR REPLACE VIEW "public"."tag_usage" AS
 SELECT "t"."id" AS "tag_id",
    "t"."name" AS "tag_name",
    "t"."user_id",
    COALESCE("count"("tm"."bookmark_id"), (0)::bigint) AS "bookmark_count"
   FROM ("public"."tags" "t"
     LEFT JOIN "public"."tag_mappings" "tm" ON (("t"."id" = "tm"."tag_id")))
  GROUP BY "t"."id", "t"."name"
  ORDER BY COALESCE("count"("tm"."bookmark_id"), (0)::bigint) DESC;



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."bookmarks" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "trigger_set_completed_at" BEFORE UPDATE ON "public"."import_status" FOR EACH ROW EXECUTE FUNCTION "public"."set_completed_at"();



ALTER TABLE ONLY "public"."bookmark_accesses"
    ADD CONSTRAINT "bookmark_accesses_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."bookmark_tags"
    ADD CONSTRAINT "bookmark_tags_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."failed_bookmark_imports"
    ADD CONSTRAINT "failed_bookmark_imports_import_status_id_fkey" FOREIGN KEY ("import_status_id") REFERENCES "public"."import_status"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tag_mappings"
    ADD CONSTRAINT "fk_bookmark" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id");



ALTER TABLE ONLY "public"."tag_mappings"
    ADD CONSTRAINT "fk_tag" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."api_keys"
    ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reminders"
    ADD CONSTRAINT "reminders_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."search_queries"
    ADD CONSTRAINT "search_queries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE "public"."bookmarks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "delete_bookmark" ON "public"."bookmarks" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "delete_category" ON "public"."categories" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "delete_query" ON "public"."search_queries" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "delete_reminder" ON "public"."reminders" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "reminders"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))));



CREATE POLICY "delete_tag_mapping" ON "public"."tag_mappings" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "tag_mappings"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))));



CREATE POLICY "insert_bookmark" ON "public"."bookmarks" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "insert_category" ON "public"."categories" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "insert_query" ON "public"."search_queries" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "insert_reminder" ON "public"."reminders" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "reminders"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))));



CREATE POLICY "insert_tag_mapping" ON "public"."tag_mappings" FOR INSERT WITH CHECK (((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "tag_mappings"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))) AND (EXISTS ( SELECT 1
   FROM "public"."tags"
  WHERE (("tags"."id" = "tag_mappings"."tag_id") AND ("tags"."user_id" = "auth"."uid"()))))));



CREATE POLICY "insert_user" ON "public"."users" FOR INSERT TO "authenticated" WITH CHECK (true);



ALTER TABLE "public"."reminders" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."search_queries" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "select_bookmark" ON "public"."bookmarks" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "select_category" ON "public"."categories" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "select_query" ON "public"."search_queries" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "select_reminder" ON "public"."reminders" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "reminders"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))));



CREATE POLICY "select_tag_mapping" ON "public"."tag_mappings" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "tag_mappings"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))));



CREATE POLICY "select_user" ON "public"."users" FOR SELECT USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."tag_mappings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "update_bookmark" ON "public"."bookmarks" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "update_category" ON "public"."categories" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "update_reminder" ON "public"."reminders" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "reminders"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"()))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "reminders"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))));



CREATE POLICY "update_tag_mapping" ON "public"."tag_mappings" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "tag_mappings"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"()))))) WITH CHECK (((EXISTS ( SELECT 1
   FROM "public"."bookmarks"
  WHERE (("bookmarks"."id" = "tag_mappings"."bookmark_id") AND ("bookmarks"."user_id" = "auth"."uid"())))) AND (EXISTS ( SELECT 1
   FROM "public"."tags"
  WHERE (("tags"."id" = "tag_mappings"."tag_id") AND ("tags"."user_id" = "auth"."uid"()))))));



CREATE POLICY "update_user" ON "public"."users" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON FUNCTION "public"."get_filtered_bookmarks_with_tags"("input_user_id" "uuid", "input_bookmark_ids" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."get_filtered_bookmarks_with_tags"("input_user_id" "uuid", "input_bookmark_ids" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_filtered_bookmarks_with_tags"("input_user_id" "uuid", "input_bookmark_ids" integer[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_last_updated_time"("input_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_last_updated_time"("input_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_last_updated_time"("input_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."search_bookmarks"("input_user_id" "uuid", "input_tags" "text"[], "input_categories" "text"[], "input_title_keywords" "text"[], "input_sort_option" "text", "input_ascending" boolean, "input_offset" integer, "input_limit" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."search_bookmarks"("input_user_id" "uuid", "input_tags" "text"[], "input_categories" "text"[], "input_title_keywords" "text"[], "input_sort_option" "text", "input_ascending" boolean, "input_offset" integer, "input_limit" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_bookmarks"("input_user_id" "uuid", "input_tags" "text"[], "input_categories" "text"[], "input_title_keywords" "text"[], "input_sort_option" "text", "input_ascending" boolean, "input_offset" integer, "input_limit" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."set_completed_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_completed_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_completed_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_bookmark_access"("input_bookmark_id" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."update_bookmark_access"("input_bookmark_id" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_bookmark_access"("input_bookmark_id" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."api_keys" TO "anon";
GRANT ALL ON TABLE "public"."api_keys" TO "authenticated";
GRANT ALL ON TABLE "public"."api_keys" TO "service_role";



GRANT ALL ON SEQUENCE "public"."api_keys_api_key_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."api_keys_api_key_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."api_keys_api_key_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."bookmark_accesses" TO "anon";
GRANT ALL ON TABLE "public"."bookmark_accesses" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmark_accesses" TO "service_role";



GRANT ALL ON TABLE "public"."bookmark_tags" TO "anon";
GRANT ALL ON TABLE "public"."bookmark_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmark_tags" TO "service_role";



GRANT ALL ON TABLE "public"."bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks" TO "service_role";



GRANT ALL ON SEQUENCE "public"."bookmarks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."bookmarks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."bookmarks_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."ogp_data" TO "anon";
GRANT ALL ON TABLE "public"."ogp_data" TO "authenticated";
GRANT ALL ON TABLE "public"."ogp_data" TO "service_role";



GRANT ALL ON TABLE "public"."bookmarks_with_ogp" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks_with_ogp" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks_with_ogp" TO "service_role";



GRANT ALL ON TABLE "public"."tag_mappings" TO "anon";
GRANT ALL ON TABLE "public"."tag_mappings" TO "authenticated";
GRANT ALL ON TABLE "public"."tag_mappings" TO "service_role";



GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "service_role";



GRANT ALL ON TABLE "public"."bookmarks_with_tags" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks_with_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks_with_tags" TO "service_role";



GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";



GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."categories_with_bookmark_count" TO "anon";
GRANT ALL ON TABLE "public"."categories_with_bookmark_count" TO "authenticated";
GRANT ALL ON TABLE "public"."categories_with_bookmark_count" TO "service_role";



GRANT ALL ON TABLE "public"."failed_bookmark_imports" TO "anon";
GRANT ALL ON TABLE "public"."failed_bookmark_imports" TO "authenticated";
GRANT ALL ON TABLE "public"."failed_bookmark_imports" TO "service_role";



GRANT ALL ON SEQUENCE "public"."failed_bookmark_imports_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."failed_bookmark_imports_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."failed_bookmark_imports_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."import_status" TO "anon";
GRANT ALL ON TABLE "public"."import_status" TO "authenticated";
GRANT ALL ON TABLE "public"."import_status" TO "service_role";



GRANT ALL ON SEQUENCE "public"."import_status_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."import_status_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."import_status_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."reminders" TO "anon";
GRANT ALL ON TABLE "public"."reminders" TO "authenticated";
GRANT ALL ON TABLE "public"."reminders" TO "service_role";



GRANT ALL ON SEQUENCE "public"."reminders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."reminders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."reminders_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."search_queries" TO "anon";
GRANT ALL ON TABLE "public"."search_queries" TO "authenticated";
GRANT ALL ON TABLE "public"."search_queries" TO "service_role";



GRANT ALL ON SEQUENCE "public"."search_queries_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."search_queries_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."search_queries_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tag_mappings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tag_mappings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tag_mappings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."tag_usage" TO "anon";
GRANT ALL ON TABLE "public"."tag_usage" TO "authenticated";
GRANT ALL ON TABLE "public"."tag_usage" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;

--
-- Dumped schema changes for auth and storage
--

