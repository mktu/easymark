create sequence "public"."import_status_id_seq";

create table "public"."import_status" (
    "id" integer not null default nextval('import_status_id_seq'::regclass),
    "user_id" uuid not null,
    "status" text not null,
    "progress" integer default 0,
    "total_items" integer default 0,
    "completed_items" integer default 0,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


alter sequence "public"."import_status_id_seq" owned by "public"."import_status"."id";

CREATE UNIQUE INDEX import_status_pkey ON public.import_status USING btree (id);

alter table "public"."import_status" add constraint "import_status_pkey" PRIMARY KEY using index "import_status_pkey";

grant delete on table "public"."import_status" to "anon";

grant insert on table "public"."import_status" to "anon";

grant references on table "public"."import_status" to "anon";

grant select on table "public"."import_status" to "anon";

grant trigger on table "public"."import_status" to "anon";

grant truncate on table "public"."import_status" to "anon";

grant update on table "public"."import_status" to "anon";

grant delete on table "public"."import_status" to "authenticated";

grant insert on table "public"."import_status" to "authenticated";

grant references on table "public"."import_status" to "authenticated";

grant select on table "public"."import_status" to "authenticated";

grant trigger on table "public"."import_status" to "authenticated";

grant truncate on table "public"."import_status" to "authenticated";

grant update on table "public"."import_status" to "authenticated";

grant delete on table "public"."import_status" to "service_role";

grant insert on table "public"."import_status" to "service_role";

grant references on table "public"."import_status" to "service_role";

grant select on table "public"."import_status" to "service_role";

grant trigger on table "public"."import_status" to "service_role";

grant truncate on table "public"."import_status" to "service_role";

grant update on table "public"."import_status" to "service_role";


