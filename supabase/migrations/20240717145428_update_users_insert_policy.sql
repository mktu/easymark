
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

CREATE TABLE IF NOT EXISTS "public"."categories" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "name" character varying(100) NOT NULL,
    "parent_id" integer,
    "created_at" timestamp without time zone DEFAULT "now"()
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

CREATE TABLE IF NOT EXISTS "public"."ogp_data" (
    "url" "text" NOT NULL,
    "title" "text",
    "description" "text",
    "image_url" "text",
    "last_fetched" timestamp without time zone DEFAULT "now"()
);

ALTER TABLE "public"."ogp_data" OWNER TO "postgres";

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

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."bookmark_tags"
    ADD CONSTRAINT "bookmark_tags_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id");

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

GRANT ALL ON TABLE "public"."bookmark_tags" TO "anon";
GRANT ALL ON TABLE "public"."bookmark_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmark_tags" TO "service_role";

GRANT ALL ON TABLE "public"."bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks" TO "service_role";

GRANT ALL ON SEQUENCE "public"."bookmarks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."bookmarks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."bookmarks_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."categories" TO "anon";
GRANT ALL ON TABLE "public"."categories" TO "authenticated";
GRANT ALL ON TABLE "public"."categories" TO "service_role";

GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."categories_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."ogp_data" TO "anon";
GRANT ALL ON TABLE "public"."ogp_data" TO "authenticated";
GRANT ALL ON TABLE "public"."ogp_data" TO "service_role";

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

