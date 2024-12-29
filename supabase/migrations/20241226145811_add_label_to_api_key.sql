alter table "public"."api_keys" add column "label" character varying(255) not null default 'Unnamed'::character varying;


