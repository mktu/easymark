set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_filtered_bookmarks_with_tags(input_user_id uuid, input_bookmark_ids integer[])
 RETURNS TABLE(bookmark_id integer, user_id uuid, url text, category_id integer, note text, ogp_title text, ogp_description text, ogp_image text, created_at timestamp without time zone, updated_at timestamp without time zone, is_valid boolean, last_accessed_at timestamp with time zone, access_count integer, tag_names text)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        b.bookmark_id,
        b.user_id,
        b.url,
        b.category_id,
        b.note,
        b.ogp_title,
        b.ogp_description,
        b.ogp_image,
        b.created_at,
        b.updated_at,
        b.is_valid,
        b.last_accessed_at,
        b.access_count,
        string_agg(t.name, ', ') AS tag_names
    FROM
        public.bookmarks_with_ogp b
    LEFT JOIN
        public.tag_mappings tm ON tm.bookmark_id = b.bookmark_id
    LEFT JOIN
        public.tags t ON t.id = tm.tag_id
    WHERE
        b.user_id = input_user_id
        AND b.bookmark_id = ANY(input_bookmark_ids)
    GROUP BY
        b.bookmark_id, b.user_id, b.url, b.category_id, b.note, b.ogp_title, 
        b.ogp_description, b.ogp_image, b.created_at, b.updated_at, 
        b.is_valid, b.last_accessed_at, b.access_count;
END;
$function$
;


