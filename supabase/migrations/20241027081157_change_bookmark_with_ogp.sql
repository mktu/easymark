drop function if exists "public"."update_bookmark_access"(bookmark_id integer);

drop view if exists "public"."bookmarks_with_ogp";

drop view if exists "public"."bookmarks_with_tags";

drop view if exists "public"."categories_with_bookmark_count";

alter table "public"."bookmarks" drop column "last_checked";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_bookmark_access(input_bookmark_id integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO bookmark_accesses (bookmark_id, last_accessed_at, access_count)
    VALUES (input_bookmark_id, CURRENT_TIMESTAMP, 1)
    ON CONFLICT (bookmark_id)
    DO UPDATE SET
        last_accessed_at = EXCLUDED.last_accessed_at,
        access_count = bookmark_accesses.access_count + 1;
END;
$function$
;

create or replace view "public"."bookmarks_with_ogp" as  SELECT b.id AS bookmark_id,
    b.user_id,
    b.url,
    b.category_id,
    b.note,
    o.title AS ogp_title,
    o.description AS ogp_description,
    o.image_url AS ogp_image,
    b.created_at,
    b.updated_at,
    b.is_valid,
    a.last_accessed_at,
    a.access_count
   FROM ((bookmarks b
     LEFT JOIN ogp_data o ON ((b.url = o.url)))
     LEFT JOIN ( SELECT bookmark_accesses.bookmark_id,
            bookmark_accesses.last_accessed_at,
            bookmark_accesses.access_count
           FROM bookmark_accesses) a ON ((a.bookmark_id = b.id)));


create or replace view "public"."bookmarks_with_tags" as  SELECT b.id,
    b.user_id,
    json_agg(DISTINCT jsonb_build_object('id', t.id, 'name', t.name)) AS tags
   FROM ((bookmarks b
     LEFT JOIN tag_mappings tm ON ((b.id = tm.bookmark_id)))
     LEFT JOIN tags t ON ((tm.tag_id = t.id)))
  GROUP BY b.id, b.user_id;


create or replace view "public"."categories_with_bookmark_count" as  SELECT c.id,
    c.user_id,
    c.name,
    c.parent_id,
    c.created_at,
    c.color,
    COALESCE(b.bookmark_count, (0)::bigint) AS bookmark_count
   FROM (categories c
     LEFT JOIN ( SELECT bookmarks.category_id,
            count(bookmarks.id) AS bookmark_count
           FROM bookmarks
          GROUP BY bookmarks.category_id) b ON ((c.id = b.category_id)));



