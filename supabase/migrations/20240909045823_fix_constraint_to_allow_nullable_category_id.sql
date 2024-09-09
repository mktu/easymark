alter table "public"."bookmarks" drop constraint "bookmarks_category_id_fkey";

alter table "public"."bookmarks" add constraint "bookmarks_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_category_id_fkey";


