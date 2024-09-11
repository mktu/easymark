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



