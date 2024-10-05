drop view if exists "public"."tag_usage";

create or replace view "public"."tag_usage" as  SELECT t.id AS tag_id,
    t.name AS tag_name,
    t.user_id,
    COALESCE(count(tm.bookmark_id), (0)::bigint) AS bookmark_count
   FROM (tags t
     LEFT JOIN tag_mappings tm ON ((t.id = tm.tag_id)))
  GROUP BY t.id, t.name
  ORDER BY COALESCE(count(tm.bookmark_id), (0)::bigint) DESC;



