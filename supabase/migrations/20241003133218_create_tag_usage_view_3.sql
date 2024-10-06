

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

SET default_tablespace = '';

SET default_table_access_method = "heap";


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
    "last_checked" timestamp without time zone,
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
    "b"."last_checked"
   FROM ("public"."bookmarks" "b"
     LEFT JOIN "public"."ogp_data" "o" ON (("b"."url" = "o"."url")));


ALTER TABLE "public"."bookmarks_with_ogp" OWNER TO "postgres";


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



CREATE TABLE IF NOT EXISTS "public"."tag_mappings" (
    "id" integer NOT NULL,
    "bookmark_id" integer NOT NULL,
    "tag_id" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."tag_mappings" OWNER TO "postgres";


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


CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" integer NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" character varying(50) NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "public"."tags" OWNER TO "postgres";


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


ALTER TABLE ONLY "public"."bookmarks" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."bookmarks_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."categories" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."categories_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."reminders" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."reminders_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."search_queries" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."search_queries_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."tag_mappings" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tag_mappings_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."tags" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tags_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."bookmark_tags"
    ADD CONSTRAINT "bookmark_tags_pkey" PRIMARY KEY ("bookmark_id", "tag_id");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



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



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "unique_user_tag" UNIQUE ("user_id", "name");



ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "unique_user_url" UNIQUE ("user_id", "url");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE VIEW "public"."tag_usage" AS
 SELECT "t"."id" AS "tag_id",
    "t"."name" AS "tag_name",
    "t"."user_id",
    COALESCE("count"("tm"."bookmark_id"), (0)::bigint) AS "bookmark_count"
   FROM ("public"."tags" "t"
     LEFT JOIN "public"."tag_mappings" "tm" ON (("t"."id" = "tm"."tag_id")))
  GROUP BY "t"."id", "t"."name"
  ORDER BY COALESCE("count"("tm"."bookmark_id"), (0)::bigint) DESC;



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



ALTER TABLE ONLY "public"."tag_mappings"
    ADD CONSTRAINT "fk_bookmark" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id");



ALTER TABLE ONLY "public"."tag_mappings"
    ADD CONSTRAINT "fk_tag" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



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


























































































































































































GRANT ALL ON FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_frequently_used_categories"("user_id" "uuid") TO "service_role";


















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



GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";



GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."categories_with_bookmark_count" TO "anon";
GRANT ALL ON TABLE "public"."categories_with_bookmark_count" TO "authenticated";
GRANT ALL ON TABLE "public"."categories_with_bookmark_count" TO "service_role";



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



GRANT ALL ON TABLE "public"."tag_mappings" TO "anon";
GRANT ALL ON TABLE "public"."tag_mappings" TO "authenticated";
GRANT ALL ON TABLE "public"."tag_mappings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tag_mappings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tag_mappings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tag_mappings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."tag_usage" TO "anon";
GRANT ALL ON TABLE "public"."tag_usage" TO "authenticated";
GRANT ALL ON TABLE "public"."tag_usage" TO "service_role";



GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "service_role";



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

