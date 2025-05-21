--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-20 23:33:20

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 230 (class 1259 OID 24688)
-- Name: citas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citas (
    id integer NOT NULL,
    fecha_cita timestamp without time zone,
    motivo text,
    mascota_id integer,
    usuario_id integer,
    activo boolean,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    asistio boolean DEFAULT false
);


ALTER TABLE public.citas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24687)
-- Name: citas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.citas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.citas_id_seq OWNER TO postgres;

--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 229
-- Name: citas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.citas_id_seq OWNED BY public.citas.id;


--
-- TOC entry 228 (class 1259 OID 24673)
-- Name: mascotas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mascotas (
    id integer NOT NULL,
    nombre character varying,
    tipo character varying,
    edad integer,
    usuario_id integer,
    activo boolean,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mascotas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24672)
-- Name: mascotas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mascotas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mascotas_id_seq OWNER TO postgres;

--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 227
-- Name: mascotas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mascotas_id_seq OWNED BY public.mascotas.id;


--
-- TOC entry 222 (class 1259 OID 24627)
-- Name: permisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permisos (
    id integer NOT NULL,
    nombre character varying
);


ALTER TABLE public.permisos OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24626)
-- Name: permisos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permisos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permisos_id_seq OWNER TO postgres;

--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 221
-- Name: permisos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permisos_id_seq OWNED BY public.permisos.id;


--
-- TOC entry 231 (class 1259 OID 24708)
-- Name: rol_permiso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_permiso (
    rol_id integer NOT NULL,
    permiso_id integer NOT NULL,
    id integer
);


ALTER TABLE public.rol_permiso OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24616)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    nombre character varying
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24615)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 226 (class 1259 OID 24655)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    usuario_id integer,
    token character varying,
    expiracion timestamp without time zone DEFAULT '9999-12-31 00:00:00'::timestamp without time zone,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24654)
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tokens_id_seq OWNER TO postgres;

--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 225
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- TOC entry 218 (class 1259 OID 16389)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16388)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 224 (class 1259 OID 24638)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying,
    email character varying,
    password character varying,
    rol_id integer,
    activo boolean,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24637)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4685 (class 2604 OID 24691)
-- Name: citas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas ALTER COLUMN id SET DEFAULT nextval('public.citas_id_seq'::regclass);


--
-- TOC entry 4683 (class 2604 OID 24676)
-- Name: mascotas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mascotas ALTER COLUMN id SET DEFAULT nextval('public.mascotas_id_seq'::regclass);


--
-- TOC entry 4677 (class 2604 OID 24630)
-- Name: permisos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos ALTER COLUMN id SET DEFAULT nextval('public.permisos_id_seq'::regclass);


--
-- TOC entry 4676 (class 2604 OID 24619)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4680 (class 2604 OID 24658)
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- TOC entry 4675 (class 2604 OID 16392)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4678 (class 2604 OID 24641)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4877 (class 0 OID 24688)
-- Dependencies: 230
-- Data for Name: citas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.citas (id, fecha_cita, motivo, mascota_id, usuario_id, activo, fecha_creacion, asistio) FROM stdin;
2	2025-05-20 10:00:00	Vacunación anual	1	7	f	2025-05-15 07:13:29.173681	f
6	2025-06-01 10:30:00	Consulta veterinaria general	5	9	f	2025-05-15 08:20:34.558343	f
5	2025-06-01 10:30:00	Consulta veterinaria general	6	9	f	2025-05-15 08:16:24.653566	f
3	2025-06-01 10:00:00	Revisión general	3	7	f	2025-05-15 07:13:40.690179	t
4	2025-06-01 10:30:00	Consulta veterinaria general	3	9	f	2025-05-15 08:16:13.804748	f
1	2025-05-20 14:30:00	Consulta general	3	6	f	2025-05-15 07:12:19.23037	f
7	2025-05-21 10:41:00	veterinaria general	23	23	t	2025-05-20 22:50:53.697098	f
8	2025-05-21 08:51:00	veterinaria general	23	23	f	2025-05-20 22:51:33.603269	f
9	2025-05-20 20:52:00	veterinaria general	24	23	f	2025-05-20 22:52:37.950893	f
10	2025-05-20 11:02:00	veterinaria general	24	23	f	2025-05-20 23:03:07.283676	f
11	2025-05-21 15:12:00	veterinaria general	23	23	f	2025-05-20 23:12:57.607618	f
12	2025-05-30 11:18:00	vacunacion	24	23	f	2025-05-20 23:16:48.029527	f
13	2025-05-29 11:20:00	vacunacion	24	23	f	2025-05-20 23:20:08.004382	f
14	2025-05-23 13:24:00	vacunacion	23	23	f	2025-05-20 23:24:29.171959	f
15	2025-05-30 11:25:00	vacunacion	24	23	t	2025-05-20 23:25:31.020581	f
16	2025-05-28 14:03:00	vacunacion	23	23	f	2025-05-20 23:27:49.249921	f
17	2025-05-28 11:30:00	vacunacion	23	23	t	2025-05-20 23:30:04.808643	f
\.


--
-- TOC entry 4875 (class 0 OID 24673)
-- Dependencies: 228
-- Data for Name: mascotas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mascotas (id, nombre, tipo, edad, usuario_id, activo, fecha_creacion) FROM stdin;
1	Firulais	Perro	3	7	f	2025-05-15 06:40:03.291604
4	Fido	Perro	3	9	f	2025-05-15 08:12:55.132209
5	Michi	Gato	2	9	f	2025-05-15 08:13:03.690843
6	Loro	Ave	1	9	f	2025-05-15 08:13:13.717904
7	Sasa	\N	12	17	t	2025-05-15 12:04:24.695
8	miguelito	perro	4	17	t	2025-05-15 12:09:58.09859
2	Luna	\N	1	8	f	2025-05-15 06:42:14.212204
3	Michi	\N	2	8	f	2025-05-15 06:42:31.76213
13	Dafne 	gato 	7	18	f	2025-05-15 22:00:56.500091
14	Azura	loro	4	18	f	2025-05-15 22:06:18.010037
9	Sasa	perro	12	6	f	2025-05-15 21:22:31.913064
10	Sasa	perro	12	6	f	2025-05-15 21:36:59.589778
11	miguelito	gato 	1	6	f	2025-05-15 21:37:11.995932
12	petsi	gato 	4	6	f	2025-05-15 21:54:26.869294
15	nemo	pez	4	20	f	2025-05-19 14:10:34.669573
16	jose luis el mago de la eterna juventud 	perro	12	18	t	2025-05-19 23:41:11.477795
17	mani	perro 	15	22	f	2025-05-19 23:42:22.295835
19	pepita	loro	6	22	f	2025-05-19 23:42:47.117385
18	juan	hamster	2	22	f	2025-05-19 23:42:34.636315
20	Sasa	gato 	5	22	f	2025-05-19 23:43:08.12631
21	firulais	perro	4	18	t	2025-05-20 00:02:18.022897
22	nemo	pez	1	18	t	2025-05-20 00:02:30.369622
23	josefito	perro caniche	12	23	t	2025-05-20 13:47:18.171468
24	manchas	gato	4	23	t	2025-05-20 13:47:27.994686
26	juanito	pez	2	23	t	2025-05-20 14:01:21.366675
25	Joe rivera  	can	13	23	f	2025-05-20 13:47:53.744118
27	coco	perro poodle	6	23	t	2025-05-20 22:15:22.234295
28	firulais	gato 	12	23	t	2025-05-20 23:30:23.911833
\.


--
-- TOC entry 4869 (class 0 OID 24627)
-- Dependencies: 222
-- Data for Name: permisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permisos (id, nombre) FROM stdin;
1	crear
2	leer
3	actualizar
4	eliminar
17	ver_usuarios
18	crear_usuarios
19	editar_usuarios
20	borrar_usuarios
21	ver_mascotas
22	crear_mascotas
23	editar_mascotas
24	borrar_mascotas
25	ver_citas
27	editar_citas
28	borrar_citas
30	desactivar_cuenta
31	ver_citas_admin
32	desactivar_cita
26	crear_cita
\.


--
-- TOC entry 4878 (class 0 OID 24708)
-- Dependencies: 231
-- Data for Name: rol_permiso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol_permiso (rol_id, permiso_id, id) FROM stdin;
1	1	\N
1	2	\N
1	3	\N
1	4	\N
1	17	\N
1	18	\N
1	19	\N
1	20	\N
1	21	\N
1	22	\N
1	23	\N
1	24	\N
1	25	\N
1	26	\N
1	27	\N
1	28	\N
2	21	\N
2	22	\N
2	23	\N
2	24	\N
2	25	\N
2	26	\N
2	27	\N
2	28	\N
2	30	\N
1	30	\N
1	31	\N
1	32	\N
2	32	\N
\.


--
-- TOC entry 4867 (class 0 OID 24616)
-- Dependencies: 220
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, nombre) FROM stdin;
1	admim
2	usuario
3	veterinario
\.


--
-- TOC entry 4873 (class 0 OID 24655)
-- Dependencies: 226
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, usuario_id, token, expiracion, creado_en, activo) FROM stdin;
\.


--
-- TOC entry 4865 (class 0 OID 16389)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
1	nuevo_usuario	contraseña123
2	nuevo_usuario	contraseña123
3	nuevo_usuario	$2b$10$okIdYJWhMIxVpOEFk8epZ.BWNxmmEephDjBwIhFh8yN8lOzJc/3gS
4	nuevo_usuario	$2b$10$MNDb.af/YBAVesPa5/lk.ubvOfJK3DpijP9oUY0jXyubUu5cTBBnG
5	nuevo_usuario	$2b$10$bwU03LjMzH47ddRCB/qY1OcXmP3jXh6rTa/XOTZxbB1FpykcnnG9a
6	Admin	$2b$10$qqCIBNfP1yo0gLW35eR2E.oHAyIdwMLmDUn/zMcZIfySVXN7gyy0W
7	miguel	$2b$10$5K0/mSP4RwLXGplK4A04guUuK6GE3XHomYLwgpbYAYTVLv.ZdXj2a
8	oscar	$2b$10$O9oDeiduFHis6qVRtBXhDOPVAJf9YOTw0ylO1dTN4aZPvmCFU6yXG
\.


--
-- TOC entry 4871 (class 0 OID 24638)
-- Dependencies: 224
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, rol_id, activo, fecha_creacion) FROM stdin;
1	Juan Pérez	juan@example.com	$2b$10$vlELDxZZZV2CDa7TVW65hOPCCYo1aynoBRUQeP0zE9aq4GUIeD4SS	1	t	2025-05-14 19:16:39.447475
2	\N	\N	$2b$10$V/AvyUsWrmosbsRe2OQQVeiqcFL/LKfq9K6R3318sSiNyUsrXyM8.	\N	t	2025-05-14 22:41:50.650355
5	\N	\N	$2b$10$k05scDEZFmUcxJGqVZfuj.exbCkhPv.Omcm4uhAID3QG/IA2h/2Bi	\N	t	2025-05-14 22:43:57.671196
8	Jose diaz	jose@mail.com	$2b$10$w/LlJ25hflNGL68sILdw8O0iM3JnMSG1EOiFEp0oXqy/ExmI9igS2	1	t	2025-05-15 06:26:51.630766
7	Miguel Gomes	miguel@mail.com	$2b$10$uwt0VjjulHWu8m8/IKVmDuRaPvQtanhwIka99hYO3S6NKZXUyiEve	2	f	2025-05-15 02:41:50.268521
9	Jota mario	jueje@example.com	$2b$10$EKDa2gNaIYMRpRCMpPeasuqoAGZ/p/YP4KLqB8FuUaGLpSzaiB7GC	2	f	2025-05-15 08:09:53.816998
10	Santiago	san@mail.com	$2b$10$tY1Z3csl9MXHsJM4Fo/Al.8VzHG3ygnMcTTw8OiMMIMQrIrBFBaBq	2	t	2025-05-15 11:39:26.373673
17	jose jose	josefin@mail.com	$2b$10$G1uP1HljOv9r0oSSydxpCeEJyG8eX5rTEs9j6m8EYTb3JHjNg7VLG	2	t	2025-05-15 11:43:24.660639
18	manuel antonio	manu@mail.com	$2b$10$vQ5abtf1qG.JiDDnz2iME.m/Yaw.k7doIAB6ohl6ltLCZRftJOCcW	2	t	2025-05-15 21:55:21.765703
19	Ana Pérez	ana@example.com	$2b$10$ejUkjGiBKUxgTp15ztr1wuzLGvcnjEzf4vKXzHAmvzWZb2XzaqckW	1	t	2025-05-15 23:27:50.838415
6	Juan Perez	juan@mail.com	$2b$10$IzpWhmsHmSzoyJC/UPbGAO4g/2VdCubBT5ubcfe1GQ/V/Xy1ukIYq	1	f	2025-05-14 22:48:48.712921
20	Miguel Angel	mapuentesd@mail.com	$2b$10$4dnLM3NQQ3sXNNvCrymiyehkZCRg.nxnsDJBGFGLNqbyBZPxb5OK6	2	f	2025-05-19 14:09:40.838961
22	felipe diaz	felipe@mail.com	$2b$10$MDeO/STx0mn54i3eR5pEce9iiW/isieEzRn6PZV6OUrQNSxMAQsk2	2	f	2025-05-19 23:41:50.201815
23	Oscar Mahecha	maecha@mail.com	$2b$10$a6pB1pWlxkwWMInx44gaFOBrBy9Sp3jX8rS8IDgUE/yPyzTp542ri	2	t	2025-05-20 13:46:39.525077
\.


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 229
-- Name: citas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.citas_id_seq', 17, true);


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 227
-- Name: mascotas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mascotas_id_seq', 28, true);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 221
-- Name: permisos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permisos_id_seq', 32, true);


--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 225
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 1, false);


--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 223
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 23, true);


--
-- TOC entry 4709 (class 2606 OID 24697)
-- Name: citas citas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id);


--
-- TOC entry 4707 (class 2606 OID 24681)
-- Name: mascotas mascotas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_pkey PRIMARY KEY (id);


--
-- TOC entry 4695 (class 2606 OID 24636)
-- Name: permisos permisos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_nombre_key UNIQUE (nombre);


--
-- TOC entry 4697 (class 2606 OID 24634)
-- Name: permisos permisos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 24712)
-- Name: rol_permiso rol_permiso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT rol_permiso_pkey PRIMARY KEY (rol_id, permiso_id);


--
-- TOC entry 4691 (class 2606 OID 24625)
-- Name: roles roles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_key UNIQUE (nombre);


--
-- TOC entry 4693 (class 2606 OID 24623)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4703 (class 2606 OID 24664)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 24666)
-- Name: tokens tokens_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_token_key UNIQUE (token);


--
-- TOC entry 4689 (class 2606 OID 16394)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4699 (class 2606 OID 24648)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4701 (class 2606 OID 24646)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 24698)
-- Name: citas citas_mascota_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_mascota_id_fkey FOREIGN KEY (mascota_id) REFERENCES public.mascotas(id) ON DELETE CASCADE;


--
-- TOC entry 4716 (class 2606 OID 24703)
-- Name: citas citas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4714 (class 2606 OID 24682)
-- Name: mascotas mascotas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mascotas
    ADD CONSTRAINT mascotas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4717 (class 2606 OID 24718)
-- Name: rol_permiso rol_permiso_permiso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT rol_permiso_permiso_id_fkey FOREIGN KEY (permiso_id) REFERENCES public.permisos(id) ON DELETE CASCADE;


--
-- TOC entry 4718 (class 2606 OID 24713)
-- Name: rol_permiso rol_permiso_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT rol_permiso_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4713 (class 2606 OID 24667)
-- Name: tokens tokens_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 4712 (class 2606 OID 24649)
-- Name: usuarios usuarios_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id);


-- Completed on 2025-05-20 23:33:26

--
-- PostgreSQL database dump complete
--

