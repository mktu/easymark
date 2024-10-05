drop view if exists "public"."tag_usage";

create or replace view "public"."tag_usage" as  SELECT t.id AS tag_id,
    t.user_id,
    t.name AS tag_name,
    count(tm.bookmark_id) AS bookmark_count
   FROM (tags t
     JOIN tag_mappings tm ON ((t.id = tm.tag_id)))
  GROUP BY t.id, t.name
  ORDER BY (count(tm.bookmark_id)) DESC;



