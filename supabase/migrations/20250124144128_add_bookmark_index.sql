CREATE INDEX idx_bookmarks_category_id ON public.bookmarks USING btree (category_id);

CREATE INDEX idx_bookmarks_user_id ON public.bookmarks USING btree (user_id);

CREATE UNIQUE INDEX idx_bookmarks_user_url ON public.bookmarks USING btree (user_id, url);


