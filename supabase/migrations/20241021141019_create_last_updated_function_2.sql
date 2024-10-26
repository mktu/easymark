drop function if exists "public"."get_last_updated_time"(user_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_last_updated_time(input_user_id uuid)
 RETURNS timestamp without time zone
 LANGUAGE plpgsql
AS $function$
DECLARE
    last_update_time TIMESTAMP;
BEGIN
    SELECT MAX(last_update) INTO last_update_time
    FROM (
        SELECT MAX(b.updated_at) AS last_update
        FROM bookmarks b
        WHERE b.user_id = input_user_id

        UNION ALL

        SELECT MAX(t.created_at) AS last_update
        FROM tag_mappings t
        JOIN bookmarks b ON t.bookmark_id = b.id
        WHERE b.user_id = input_user_id

        UNION ALL

        SELECT MAX(o.last_fetched) AS last_update
        FROM ogp_data o
        JOIN bookmarks b ON o.url = b.url
        WHERE b.user_id = input_user_id
    ) AS combined_updates;

    RETURN last_update_time;
END;
$function$
;


