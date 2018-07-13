--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.13
-- Dumped by pg_dump version 9.5.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: characters; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.characters (
    character_id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    image character varying
);


ALTER TABLE public.characters OWNER TO ubuntu;

--
-- Name: characters_collection; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.characters_collection (
    user_id integer,
    collectors_email character varying(50),
    character_id integer,
    character_name character varying,
    character_image character varying
);


ALTER TABLE public.characters_collection OWNER TO ubuntu;

--
-- Name: characters_comics; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.characters_comics (
    url character varying(100) NOT NULL,
    json character varying
);


ALTER TABLE public.characters_comics OWNER TO ubuntu;

--
-- Name: comics; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.comics (
    comic_id integer NOT NULL,
    title character varying(150) NOT NULL,
    description character varying,
    image character varying,
    characters character varying
);


ALTER TABLE public.comics OWNER TO ubuntu;

--
-- Name: comics_collection; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.comics_collection (
    user_id integer,
    collectors_email character varying(50),
    comic_id integer,
    title character varying(150),
    collectors_image character varying
);


ALTER TABLE public.comics_collection OWNER TO ubuntu;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: ubuntu
--

CREATE TABLE public.customer (
    name character varying(25) NOT NULL,
    image character varying(100),
    email character varying(50),
    display_name character varying(50),
    user_id integer NOT NULL
);


ALTER TABLE public.customer OWNER TO ubuntu;

--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.characters (character_id, name, description, image) FROM stdin;
\.


--
-- Data for Name: characters_collection; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.characters_collection (user_id, collectors_email, character_id, character_name, character_image) FROM stdin;
\.


--
-- Data for Name: characters_comics; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.characters_comics (url, json) FROM stdin;
\.


--
-- Data for Name: comics; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.comics (comic_id, title, description, image, characters) FROM stdin;
\.


--
-- Data for Name: comics_collection; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.comics_collection (user_id, collectors_email, comic_id, title, collectors_image) FROM stdin;
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: ubuntu
--

COPY public.customer (name, image, email, display_name, user_id) FROM stdin;
\.


--
-- Name: characters_collection_collectors_email_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters_collection
    ADD CONSTRAINT characters_collection_collectors_email_key UNIQUE (collectors_email);


--
-- Name: characters_comics_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters_comics
    ADD CONSTRAINT characters_comics_pkey PRIMARY KEY (url);


--
-- Name: characters_name_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_name_key UNIQUE (name);


--
-- Name: characters_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (character_id);


--
-- Name: comics_collection_collectors_email_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics_collection
    ADD CONSTRAINT comics_collection_collectors_email_key UNIQUE (collectors_email);


--
-- Name: comics_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics
    ADD CONSTRAINT comics_pkey PRIMARY KEY (comic_id);


--
-- Name: comics_title_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics
    ADD CONSTRAINT comics_title_key UNIQUE (title);


--
-- Name: customer_email_key; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_email_key UNIQUE (email);


--
-- Name: customer_pkey; Type: CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (user_id);


--
-- Name: characters_collection_character_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters_collection
    ADD CONSTRAINT characters_collection_character_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(character_id);


--
-- Name: characters_collection_character_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters_collection
    ADD CONSTRAINT characters_collection_character_name_fkey FOREIGN KEY (character_name) REFERENCES public.characters(name);


--
-- Name: characters_collection_collectors_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters_collection
    ADD CONSTRAINT characters_collection_collectors_email_fkey FOREIGN KEY (collectors_email) REFERENCES public.customer(email);


--
-- Name: characters_collection_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.characters_collection
    ADD CONSTRAINT characters_collection_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customer(user_id);


--
-- Name: comics_collection_collectors_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics_collection
    ADD CONSTRAINT comics_collection_collectors_email_fkey FOREIGN KEY (collectors_email) REFERENCES public.customer(email);


--
-- Name: comics_collection_comic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics_collection
    ADD CONSTRAINT comics_collection_comic_id_fkey FOREIGN KEY (comic_id) REFERENCES public.comics(comic_id);


--
-- Name: comics_collection_title_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics_collection
    ADD CONSTRAINT comics_collection_title_fkey FOREIGN KEY (title) REFERENCES public.comics(title);


--
-- Name: comics_collection_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ubuntu
--

ALTER TABLE ONLY public.comics_collection
    ADD CONSTRAINT comics_collection_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customer(user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

