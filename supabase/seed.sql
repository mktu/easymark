SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '3ad6d8ce-cc6f-43e8-81d3-07285aaf6f18', '{"action":"user_confirmation_requested","actor_id":"f6600289-3c83-453b-a8d2-e4a6e7afe37e","actor_username":"example@test.gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-08-18 00:07:19.223284+00', ''),
	('00000000-0000-0000-0000-000000000000', '72b911b7-964c-409f-b669-844bcc9fb01d', '{"action":"user_signedup","actor_id":"f6600289-3c83-453b-a8d2-e4a6e7afe37e","actor_username":"example@test.gmail.com","actor_via_sso":false,"log_type":"team"}', '2024-08-18 00:07:30.630725+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc43cbb9-d76f-4960-a04d-2fd16d0e9662', '{"action":"login","actor_id":"f6600289-3c83-453b-a8d2-e4a6e7afe37e","actor_username":"example@test.gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-08-18 00:07:43.772614+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('04e93acf-3357-46f3-9e61-6ec7a3bf0013', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', 'cb62be62-84a1-4660-af94-c1d42a2efa80', 's256', 'ccR9dEUHKTwXztnqqW5R0gZttrdmKXKGv0etbAXw7lA', 'email', '', '', '2024-08-18 00:07:19.225806+00', '2024-08-18 00:07:19.225806+00', 'email/signup', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', 'authenticated', 'authenticated', 'example@test.gmail.com', '$2a$10$ZSRjuvcSOAutj8bLfT09H.iwTWujxKvvdeZ/mHpmnaxtnVeozObqS', '2024-08-18 00:07:30.634118+00', NULL, '', '2024-08-18 00:07:19.227729+00', '', NULL, '', '', NULL, '2024-08-18 00:07:43.774301+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f6600289-3c83-453b-a8d2-e4a6e7afe37e", "email": "example@test.gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2024-08-18 00:07:19.208625+00', '2024-08-18 00:07:43.777603+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('f6600289-3c83-453b-a8d2-e4a6e7afe37e', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', '{"sub": "f6600289-3c83-453b-a8d2-e4a6e7afe37e", "email": "example@test.gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-08-18 00:07:19.216672+00', '2024-08-18 00:07:19.216723+00', '2024-08-18 00:07:19.216723+00', '58295d78-958d-4714-be03-539c53828fc0');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('0e767dc9-8df1-447e-a7db-47bd1e4c2d9f', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', '2024-08-18 00:07:30.645329+00', '2024-08-18 00:07:30.645329+00', NULL, 'aal1', NULL, NULL, 'node', '172.28.0.1', NULL),
	('5fa33694-0252-4653-a9f4-3c0ee9b3554c', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', '2024-08-18 00:07:43.774399+00', '2024-08-18 00:07:43.774399+00', NULL, 'aal1', NULL, NULL, 'node', '172.28.0.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('0e767dc9-8df1-447e-a7db-47bd1e4c2d9f', '2024-08-18 00:07:30.657409+00', '2024-08-18 00:07:30.657409+00', 'otp', '1f7f2a92-6ce5-42c6-bc49-8d2feb4428a6'),
	('5fa33694-0252-4653-a9f4-3c0ee9b3554c', '2024-08-18 00:07:43.777956+00', '2024-08-18 00:07:43.777956+00', 'password', '04043957-9cba-4f5c-bac2-78d4c624fbda');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'G9EvgqMjGt9tUr7plXMYUA', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', false, '2024-08-18 00:07:30.650874+00', '2024-08-18 00:07:30.650874+00', NULL, '0e767dc9-8df1-447e-a7db-47bd1e4c2d9f'),
	('00000000-0000-0000-0000-000000000000', 2, 'zW2sJR2PV4Z4NUDtOCgQvQ', 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', false, '2024-08-18 00:07:43.775783+00', '2024-08-18 00:07:43.775783+00', NULL, '5fa33694-0252-4653-a9f4-3c0ee9b3554c');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "username", "profile_image_url", "created_at") VALUES
	('f6600289-3c83-453b-a8d2-e4a6e7afe37e', 'Test Users', NULL, '2024-08-18 00:07:47.518709');


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."bookmarks" ("id", "user_id", "url", "category_id", "note", "is_valid", "created_at", "updated_at") VALUES
	(1, 'f6600289-3c83-453b-a8d2-e4a6e7afe37e', 'https://github.com/fkhadra/react-toastify', NULL, '', true, '2024-08-18 00:07:52.951261', '2024-08-18 00:07:52.951261');


--
-- Data for Name: bookmark_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ogp_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."ogp_data" ("url", "title", "description", "image_url", "last_fetched") VALUES
	('https://github.com/fkhadra/react-toastify', 'GitHub - fkhadra/react-toastify: React notification made easy 🚀 !', 'React notification made easy 🚀 ! Contribute to fkhadra/react-toastify development by creating an account on GitHub.', 'https://opengraph.githubassets.com/b4d3223f28c1eb78bca80b129ad004e1aa4e3476e10523b0c0390de77b42e930/fkhadra/react-toastify', '2024-08-18 00:07:52.966518');


--
-- Data for Name: reminders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: search_queries; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tag_mappings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 2, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: bookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."bookmarks_id_seq"', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."categories_id_seq"', 1, false);


--
-- Name: reminders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."reminders_id_seq"', 1, false);


--
-- Name: search_queries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."search_queries_id_seq"', 1, false);


--
-- Name: tag_mappings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tag_mappings_id_seq"', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tags_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

-- SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
