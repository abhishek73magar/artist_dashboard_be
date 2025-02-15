--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public._gender AS ENUM (
    'm',
    'f',
    'o'
);


ALTER TYPE public._gender OWNER TO postgres;

--
-- Name: _genre; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public._genre AS ENUM (
    'rnb',
    'country',
    'classic',
    'rock',
    'jazz'
);


ALTER TYPE public._genre OWNER TO postgres;

--
-- Name: _role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public._role AS ENUM (
    'super_admin',
    'artist_manager',
    'artist'
);


ALTER TYPE public._role OWNER TO postgres;

--
-- Name: gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender AS ENUM (
    'm',
    'f',
    'o'
);


ALTER TYPE public.gender OWNER TO postgres;

--
-- Name: update_album_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_album_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      UPDATE artist
      SET no_of_albums_released = (
        SELECT COUNT(DISTINCT album_name)
        FROM music
        WHERE artist_id = NEW.artist_id
      )
      WHERE id = NEW.artist_id;
      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.update_album_count() OWNER TO postgres;

--
-- Name: update_album_count_on_delete(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_album_count_on_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      UPDATE artist
      SET no_of_albums_released = (
        SELECT COUNT(DISTINCT album_name)
        FROM music
        WHERE artist_id = OLD.artist_id
      )
      WHERE id = OLD.artist_id;

      RETURN OLD;
    END;
    $$;


ALTER FUNCTION public.update_album_count_on_delete() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: artist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.artist (
    id bigint NOT NULL,
    name character varying(255),
    dob date,
    gender public._gender,
    address character varying(255),
    no_of_albums_released integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone
);


ALTER TABLE public.artist OWNER TO postgres;

--
-- Name: COLUMN artist.gender; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.artist.gender IS '_gender enum type must be created 
 [m,f,o] 
 m = male 
 f = female 
 o = others';


--
-- Name: COLUMN artist.no_of_albums_released; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.artist.no_of_albums_released IS 'may be required trigger function';


--
-- Name: artist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.artist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.artist_id_seq OWNER TO postgres;

--
-- Name: artist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.artist_id_seq OWNED BY public.artist.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: music; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.music (
    id bigint NOT NULL,
    artist_id integer,
    title character varying(255),
    album_name character varying(255),
    genre public._genre,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone
);


ALTER TABLE public.music OWNER TO postgres;

--
-- Name: COLUMN music.genre; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.music.genre IS '_genre enum type must be created 
 [rnb, country, classic, rock, jazz]';


--
-- Name: music_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.music_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.music_id_seq OWNER TO postgres;

--
-- Name: music_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.music_id_seq OWNED BY public.music.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    password character varying(255),
    phone character varying(255),
    dob date,
    address character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone,
    gender public._gender,
    role public._role DEFAULT 'artist'::public._role
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: COLUMN users.created_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.created_at IS 'created time in UTC';


--
-- Name: COLUMN users.gender; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.gender IS '_gender enum type must be created 
 [m,f,o] 
 m = male 
 f = female 
 o = others';


--
-- Name: COLUMN users.role; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.role IS '_role enum type must be created 
 [super_admin, artist_manager, artist]';


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: artist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artist ALTER COLUMN id SET DEFAULT nextval('public.artist_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: music id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.music ALTER COLUMN id SET DEFAULT nextval('public.music_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: artist artist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.artist
    ADD CONSTRAINT artist_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: music music_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: music trigger_update_album_count; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_album_count AFTER INSERT OR UPDATE ON public.music FOR EACH ROW EXECUTE FUNCTION public.update_album_count();


--
-- Name: music trigger_update_album_count_on_delete; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_update_album_count_on_delete AFTER DELETE ON public.music FOR EACH ROW EXECUTE FUNCTION public.update_album_count_on_delete();


--
-- Name: music music_artist_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_artist_id_foreign FOREIGN KEY (artist_id) REFERENCES public.artist(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

