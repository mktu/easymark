CREATE UNIQUE INDEX unique_user_url ON public.bookmarks USING btree (user_id, url);

alter table "public"."bookmarks" add constraint "unique_user_url" UNIQUE using index "unique_user_url";


