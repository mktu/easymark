set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_last_updated_time(user_id uuid)
 RETURNS timestamp without time zone
 LANGUAGE plpgsql
AS $function$
DECLARE
    last_update_time TIMESTAMP;
BEGIN
    SELECT MAX(last_update) INTO last_update_time
    FROM (
        SELECT MAX(updated_at) AS last_update
        FROM bookmarks
        WHERE user_id = user_id

        UNION ALL

        SELECT MAX(t.created_at) AS last_update
        FROM tag_mappings t
        JOIN bookmarks b ON t.bookmark_id = b.id
        WHERE b.user_id = user_id

        UNION ALL

        SELECT MAX(o.last_fetched) AS last_update
        FROM ogp_data o
        JOIN bookmarks b ON o.url = b.url
        WHERE b.user_id = user_id
    ) AS combined_updates;

    RETURN last_update_time;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.bookmarks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


