create or replace view "public"."bookmarks_with_tags" as  SELECT b.id,
    b.user_id,
    json_agg(DISTINCT jsonb_build_object('id', t.id, 'name', t.name)) AS tags
   FROM ((bookmarks b
     LEFT JOIN tag_mappings tm ON ((b.id = tm.bookmark_id)))
     LEFT JOIN tags t ON ((tm.tag_id = t.id)))
  GROUP BY b.id, b.user_id;



