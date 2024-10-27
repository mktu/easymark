create table "public"."bookmark_accesses" (
    "bookmark_id" integer not null,
    "last_accessed_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "access_count" integer default 1
);


CREATE UNIQUE INDEX bookmark_accesses_pkey ON public.bookmark_accesses USING btree (bookmark_id);

alter table "public"."bookmark_accesses" add constraint "bookmark_accesses_pkey" PRIMARY KEY using index "bookmark_accesses_pkey";

alter table "public"."bookmark_accesses" add constraint "bookmark_accesses_bookmark_id_fkey" FOREIGN KEY (bookmark_id) REFERENCES bookmarks(id) ON DELETE CASCADE not valid;

alter table "public"."bookmark_accesses" validate constraint "bookmark_accesses_bookmark_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_bookmark_access(bookmark_id integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO bookmark_accesses (bookmark_id, last_accessed_at, access_count)
    VALUES (bookmark_id, CURRENT_TIMESTAMP, 1)
    ON CONFLICT (bookmark_id)
    DO UPDATE SET
        last_accessed_at = EXCLUDED.last_accessed_at,
        access_count = bookmark_accesses.access_count + 1;
END;
$function$
;

grant delete on table "public"."bookmark_accesses" to "anon";

grant insert on table "public"."bookmark_accesses" to "anon";

grant references on table "public"."bookmark_accesses" to "anon";

grant select on table "public"."bookmark_accesses" to "anon";

grant trigger on table "public"."bookmark_accesses" to "anon";

grant truncate on table "public"."bookmark_accesses" to "anon";

grant update on table "public"."bookmark_accesses" to "anon";

grant delete on table "public"."bookmark_accesses" to "authenticated";

grant insert on table "public"."bookmark_accesses" to "authenticated";

grant references on table "public"."bookmark_accesses" to "authenticated";

grant select on table "public"."bookmark_accesses" to "authenticated";

grant trigger on table "public"."bookmark_accesses" to "authenticated";

grant truncate on table "public"."bookmark_accesses" to "authenticated";

grant update on table "public"."bookmark_accesses" to "authenticated";

grant delete on table "public"."bookmark_accesses" to "service_role";

grant insert on table "public"."bookmark_accesses" to "service_role";

grant references on table "public"."bookmark_accesses" to "service_role";

grant select on table "public"."bookmark_accesses" to "service_role";

grant trigger on table "public"."bookmark_accesses" to "service_role";

grant truncate on table "public"."bookmark_accesses" to "service_role";

grant update on table "public"."bookmark_accesses" to "service_role";


