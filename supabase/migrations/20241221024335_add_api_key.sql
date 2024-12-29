create sequence "public"."api_keys_api_key_id_seq";

create table "public"."api_keys" (
    "api_key_id" integer not null default nextval('api_keys_api_key_id_seq'::regclass),
    "user_id" uuid not null,
    "api_key" character varying(255) not null,
    "expires_at" timestamp without time zone,
    "last_used_at" timestamp without time zone,
    "active" boolean not null default true,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
);


alter sequence "public"."api_keys_api_key_id_seq" owned by "public"."api_keys"."api_key_id";

CREATE UNIQUE INDEX api_keys_pkey ON public.api_keys USING btree (api_key_id);

CREATE INDEX idx_api_key ON public.api_keys USING btree (api_key);

CREATE INDEX idx_user_id ON public.api_keys USING btree (user_id);

CREATE UNIQUE INDEX unique_user_api_key ON public.api_keys USING btree (user_id, api_key);

alter table "public"."api_keys" add constraint "api_keys_pkey" PRIMARY KEY using index "api_keys_pkey";

alter table "public"."api_keys" add constraint "fk_user" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."api_keys" validate constraint "fk_user";

alter table "public"."api_keys" add constraint "unique_user_api_key" UNIQUE using index "unique_user_api_key";

grant delete on table "public"."api_keys" to "anon";

grant insert on table "public"."api_keys" to "anon";

grant references on table "public"."api_keys" to "anon";

grant select on table "public"."api_keys" to "anon";

grant trigger on table "public"."api_keys" to "anon";

grant truncate on table "public"."api_keys" to "anon";

grant update on table "public"."api_keys" to "anon";

grant delete on table "public"."api_keys" to "authenticated";

grant insert on table "public"."api_keys" to "authenticated";

grant references on table "public"."api_keys" to "authenticated";

grant select on table "public"."api_keys" to "authenticated";

grant trigger on table "public"."api_keys" to "authenticated";

grant truncate on table "public"."api_keys" to "authenticated";

grant update on table "public"."api_keys" to "authenticated";

grant delete on table "public"."api_keys" to "service_role";

grant insert on table "public"."api_keys" to "service_role";

grant references on table "public"."api_keys" to "service_role";

grant select on table "public"."api_keys" to "service_role";

grant trigger on table "public"."api_keys" to "service_role";

grant truncate on table "public"."api_keys" to "service_role";

grant update on table "public"."api_keys" to "service_role";


