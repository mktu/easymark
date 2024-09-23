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
    b.last_checked
   FROM (bookmarks b
     LEFT JOIN ogp_data o ON ((b.url = o.url)));



