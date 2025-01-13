create sequence "public"."failed_bookmark_imports_id_seq";

create table "public"."failed_bookmark_imports" (
    "id" integer not null default nextval('failed_bookmark_imports_id_seq'::regclass),
    "import_status_id" integer not null,
    "user_id" uuid not null,
    "url" text not null,
    "error_message" text,
    "created_at" timestamp without time zone default now()
);


alter table "public"."import_status" add column "completed_at" timestamp without time zone;

alter sequence "public"."failed_bookmark_imports_id_seq" owned by "public"."failed_bookmark_imports"."id";

CREATE UNIQUE INDEX failed_bookmark_imports_pkey ON public.failed_bookmark_imports USING btree (id);

alter table "public"."failed_bookmark_imports" add constraint "failed_bookmark_imports_pkey" PRIMARY KEY using index "failed_bookmark_imports_pkey";

alter table "public"."failed_bookmark_imports" add constraint "failed_bookmark_imports_import_status_id_fkey" FOREIGN KEY (import_status_id) REFERENCES import_status(id) ON DELETE CASCADE not valid;

alter table "public"."failed_bookmark_imports" validate constraint "failed_bookmark_imports_import_status_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_completed_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed' THEN
    NEW.completed_at := NOW();
  END IF;
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."failed_bookmark_imports" to "anon";

grant insert on table "public"."failed_bookmark_imports" to "anon";

grant references on table "public"."failed_bookmark_imports" to "anon";

grant select on table "public"."failed_bookmark_imports" to "anon";

grant trigger on table "public"."failed_bookmark_imports" to "anon";

grant truncate on table "public"."failed_bookmark_imports" to "anon";

grant update on table "public"."failed_bookmark_imports" to "anon";

grant delete on table "public"."failed_bookmark_imports" to "authenticated";

grant insert on table "public"."failed_bookmark_imports" to "authenticated";

grant references on table "public"."failed_bookmark_imports" to "authenticated";

grant select on table "public"."failed_bookmark_imports" to "authenticated";

grant trigger on table "public"."failed_bookmark_imports" to "authenticated";

grant truncate on table "public"."failed_bookmark_imports" to "authenticated";

grant update on table "public"."failed_bookmark_imports" to "authenticated";

grant delete on table "public"."failed_bookmark_imports" to "service_role";

grant insert on table "public"."failed_bookmark_imports" to "service_role";

grant references on table "public"."failed_bookmark_imports" to "service_role";

grant select on table "public"."failed_bookmark_imports" to "service_role";

grant trigger on table "public"."failed_bookmark_imports" to "service_role";

grant truncate on table "public"."failed_bookmark_imports" to "service_role";

grant update on table "public"."failed_bookmark_imports" to "service_role";

CREATE TRIGGER trigger_set_completed_at BEFORE UPDATE ON public.import_status FOR EACH ROW EXECUTE FUNCTION set_completed_at();


