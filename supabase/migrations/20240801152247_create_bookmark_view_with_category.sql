set check_function_bodies = off;

create or replace view "public"."bookmarks_with_ogp" as  SELECT b.id AS bookmark_id,
    b.user_id,
    b.url,
    b.category_id,
    b.note,
    o.title AS ogp_title,
    o.description AS ogp_description,
    o.image_url AS ogp_image,
    b.created_at,
    b.updated_at
   FROM (bookmarks b
     LEFT JOIN ogp_data o ON ((b.url = o.url)));


CREATE OR REPLACE FUNCTION public.get_frequently_used_categories(user_id uuid)
 RETURNS TABLE(category_id uuid, category_name text, bookmark_count integer)
 LANGUAGE plpgsql
 STABLE
AS $function$
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
$function$
;


