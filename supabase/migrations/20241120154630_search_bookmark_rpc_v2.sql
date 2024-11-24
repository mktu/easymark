drop function if exists "public"."search_bookmarks"(input_user_id uuid, input_tags text[], input_categories text[], input_title_keywords text[], input_sort_option text, input_ascending boolean, input_offset integer, input_limit integer);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.search_bookmarks(input_user_id uuid, input_tags text[], input_categories text[], input_title_keywords text[], input_sort_option text, input_ascending boolean, input_offset integer, input_limit integer)
 RETURNS TABLE(bookmark_id integer, user_id uuid, url text, category_id integer, note text, ogp_title text, ogp_description text, ogp_image text, created_at timestamp without time zone, updated_at timestamp without time zone, is_valid boolean, access_count integer, last_accessed_at timestamp with time zone, tag_list text)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY EXECUTE
    'SELECT
        b.id as bookmark_id,
        b.user_id,
        b.url,
        b.category_id,
        b.note,
        o.title as ogp_title,
        o.description as ogp_description,
        o.image_url as ogp_image,
        b.created_at,
        b.updated_at,
        b.is_valid,
        COALESCE(ba.access_count, 0) as access_count,
        ba.last_accessed_at,
        string_agg(t.name, '','') as tag_list
    FROM
        bookmarks b
    LEFT JOIN
        ogp_data o ON b.url = o.url
    LEFT JOIN
        tag_mappings tm ON b.id = tm.bookmark_id
    LEFT JOIN
        tags t ON tm.tag_id = t.id
    LEFT JOIN
        categories c ON b.category_id = c.id
    LEFT JOIN
        bookmark_accesses ba ON b.id = ba.bookmark_id
    WHERE
        b.user_id = $1
    AND
        (t.name = ANY($2) OR $2 IS NULL)
    AND
        (c.name = ANY($3) OR $3 IS NULL)
    AND
        (o.title ILIKE ANY($4) OR $4 IS NULL)
    GROUP BY b.id, b.user_id, b.url, b.category_id, b.note, o.title, o.description, o.image_url, b.created_at, b.updated_at, b.is_valid, ba.access_count, ba.last_accessed_at
    ORDER BY ' || (CASE WHEN input_sort_option = 'created_at' THEN 'b.created_at' 
                        WHEN input_sort_option = 'ogp_title' THEN 'o.title'
                        WHEN input_sort_option = 'access_count' THEN 'ba.access_count'
                        ELSE 'b.created_at' END) ||
        (CASE WHEN input_ascending THEN ' ASC' ELSE ' DESC' END) ||
    ' LIMIT $5 OFFSET $6'
    USING input_user_id, input_tags, input_categories, input_title_keywords, input_limit, input_offset;
END;
$function$
;


