--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Postgres.app)

-- Started on 2025-07-06 13:57:50 CEST

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
-- TOC entry 3392 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 3392
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24577)
-- Name: application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application (
    id integer NOT NULL,
    "appliedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "candidateId" integer,
    "jobOfferId" integer
);


ALTER TABLE public.application OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24576)
-- Name: application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.application_id_seq OWNER TO postgres;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 217
-- Name: application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.application_id_seq OWNED BY public.application.id;


--
-- TOC entry 220 (class 1259 OID 24585)
-- Name: job_offer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_offer (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "recruiterId" integer,
    location character varying NOT NULL
);


ALTER TABLE public.job_offer OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24584)
-- Name: job_offer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.job_offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.job_offer_id_seq OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 219
-- Name: job_offer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.job_offer_id_seq OWNED BY public.job_offer.id;


--
-- TOC entry 222 (class 1259 OID 24594)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'candidate'::character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24593)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 3220 (class 2604 OID 24580)
-- Name: application id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application ALTER COLUMN id SET DEFAULT nextval('public.application_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 24588)
-- Name: job_offer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_offer ALTER COLUMN id SET DEFAULT nextval('public.job_offer_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 24597)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3382 (class 0 OID 24577)
-- Dependencies: 218
-- Data for Name: application; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.application VALUES (1, '2025-07-06 09:34:35.963829', 3, 1);


--
-- TOC entry 3384 (class 0 OID 24585)
-- Dependencies: 220
-- Data for Name: job_offer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.job_offer VALUES (1, 'Frontend Developer', 'We are looking for a React developer with 3+ years of experience.', 2, 'Remote');
INSERT INTO public.job_offer VALUES (2, 'Backend Developer', 'We are looking for a backend developer', 2, 'Milan');
INSERT INTO public.job_offer VALUES (3, 'Fullstack Developer', 'We are looking for a fullstack developer', 2, 'Naples');


--
-- TOC entry 3386 (class 0 OID 24594)
-- Dependencies: 222
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (1, 'test@test.com', '$2b$10$VwBpnEcZeYbdyhLvFoTLj./T4oorrrlklshxpHKESpwBFdhs7rKKq', 'recruiter');
INSERT INTO public."user" VALUES (2, 'recruiter@test.com', '$2b$10$uUbXfa/QAX/zdR1h9LVPIefwh1sKIKbfT7BbqZ2jvWHIbzie31y1m', 'recruiter');
INSERT INTO public."user" VALUES (3, 'candidate@test.com', '$2b$10$5SpLbf.6WJditw9Z/uCfgujuV8CPonMp.4taVkkPkfnMqxElFHlQW', 'candidate');
INSERT INTO public."user" VALUES (4, 'recruiter2@test.com', '$2b$10$df6QMeuF4B6VIPIcBlg.uO.Pknv1hEPUu1VzECXm/JsKavRF3Sswi', 'recruiter');


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 217
-- Name: application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.application_id_seq', 1, true);


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 219
-- Name: job_offer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.job_offer_id_seq', 3, true);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- TOC entry 3228 (class 2606 OID 24592)
-- Name: job_offer PK_5286026037ab5fb5acfcb7e1829; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_offer
    ADD CONSTRAINT "PK_5286026037ab5fb5acfcb7e1829" PRIMARY KEY (id);


--
-- TOC entry 3226 (class 2606 OID 24583)
-- Name: application PK_569e0c3e863ebdf5f2408ee1670; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY (id);


--
-- TOC entry 3230 (class 2606 OID 24602)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 24619)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 3233 (class 2606 OID 24608)
-- Name: application FK_10648d47c727ce2a56cca5e0c12; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "FK_10648d47c727ce2a56cca5e0c12" FOREIGN KEY ("jobOfferId") REFERENCES public.job_offer(id);


--
-- TOC entry 3235 (class 2606 OID 24613)
-- Name: job_offer FK_45bc03d77bdbe34ef96005252ab; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_offer
    ADD CONSTRAINT "FK_45bc03d77bdbe34ef96005252ab" FOREIGN KEY ("recruiterId") REFERENCES public."user"(id);


--
-- TOC entry 3234 (class 2606 OID 24603)
-- Name: application FK_56bd5315980a6bcd995a54df8fe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application
    ADD CONSTRAINT "FK_56bd5315980a6bcd995a54df8fe" FOREIGN KEY ("candidateId") REFERENCES public."user"(id);


-- Completed on 2025-07-06 13:57:50 CEST

--
-- PostgreSQL database dump complete
--

