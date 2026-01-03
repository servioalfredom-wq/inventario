--
-- PostgreSQL database dump
--

\restrict 9WhLPUwllSnRQfjRopWnYYf2U45mUGgJvvdpt3MqGeqrE9c3kBTrA7fpB7Je4WZ

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-01-03 14:36:11

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
-- TOC entry 222 (class 1259 OID 16596)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(100)
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16595)
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_categoria_seq OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 221
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;


--
-- TOC entry 226 (class 1259 OID 16617)
-- Name: historial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial (
    id_historial integer NOT NULL,
    id_producto integer,
    tipo_movimiento character varying(20),
    cantidad integer,
    fecha timestamp without time zone DEFAULT now(),
    usuario_responsable character varying(100)
);


ALTER TABLE public.historial OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16616)
-- Name: historial_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_id_historial_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 225
-- Name: historial_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_id_historial_seq OWNED BY public.historial.id_historial;


--
-- TOC entry 224 (class 1259 OID 16604)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre character varying(100),
    stock integer,
    precio numeric(10,2),
    id_categoria integer,
    activo boolean DEFAULT true
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16603)
-- Name: productos_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_producto_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 223
-- Name: productos_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;


--
-- TOC entry 220 (class 1259 OID 16586)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100),
    email character varying(100),
    password character varying(255),
    rol character varying(20)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16585)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4872 (class 2604 OID 16599)
-- Name: categorias id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);


--
-- TOC entry 4875 (class 2604 OID 16620)
-- Name: historial id_historial; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_id_historial_seq'::regclass);


--
-- TOC entry 4873 (class 2604 OID 16607)
-- Name: productos id_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);


--
-- TOC entry 4871 (class 2604 OID 16589)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 5039 (class 0 OID 16596)
-- Dependencies: 222
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id_categoria, nombre) FROM stdin;
\.


--
-- TOC entry 5043 (class 0 OID 16617)
-- Dependencies: 226
-- Data for Name: historial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.historial (id_historial, id_producto, tipo_movimiento, cantidad, fecha, usuario_responsable) FROM stdin;
1	1	edicion	52	2026-01-02 17:12:10.10655	servioalfredom@gmail.com
2	1	edicion	54	2026-01-02 17:14:06.963768	servioalfredom@gmail.com
3	2	creacion	60	2026-01-02 18:03:48.666109	servioalfredom@gmail.com
4	2	edicion	59	2026-01-02 18:26:20.826604	servioalfredom@gmail.com
5	2	edicion	59	2026-01-02 18:26:45.493656	servioalfredom@gmail.com
6	2	edicion	59	2026-01-02 18:28:48.15552	servioalfredom@gmail.com
7	2	edicion	59	2026-01-02 18:28:59.226349	servioalfredom@gmail.com
8	1	edicion	54	2026-01-02 18:30:07.073006	servioalfredom@gmail.com
9	3	creacion	10	2026-01-02 18:38:23.756277	servioalfredom@gmail.com
10	2	edicion_stock	60	2026-01-02 21:36:46.128731	1
11	2	cambio_precio	660	2026-01-02 21:36:46.1379	1
\.


--
-- TOC entry 5041 (class 0 OID 16604)
-- Dependencies: 224
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id_producto, nombre, stock, precio, id_categoria, activo) FROM stdin;
1	Auriculares 	54	40.00	\N	f
3	Control Remoto	10	10.00	\N	t
2	Laptop ASUS	60	660.00	\N	t
\.


--
-- TOC entry 5037 (class 0 OID 16586)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre, email, password, rol) FROM stdin;
1	Servio	servioalfredom@gmail.com	$2b$10$SDsQnm1d9IlApqA4vlK.M.92woaWj9STZ1R45bXlo4oQCANF2YBQK	admin
\.


--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 221
-- Name: categorias_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 1, false);


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 225
-- Name: historial_id_historial_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historial_id_historial_seq', 11, true);


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 223
-- Name: productos_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_producto_seq', 3, true);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, true);


--
-- TOC entry 4882 (class 2606 OID 16602)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);


--
-- TOC entry 4886 (class 2606 OID 16624)
-- Name: historial historial_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 4884 (class 2606 OID 16610)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);


--
-- TOC entry 4878 (class 2606 OID 16594)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4880 (class 2606 OID 16592)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4888 (class 2606 OID 16625)
-- Name: historial historial_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- TOC entry 4887 (class 2606 OID 16611)
-- Name: productos productos_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);


-- Completed on 2026-01-03 14:36:12

--
-- PostgreSQL database dump complete
--

\unrestrict 9WhLPUwllSnRQfjRopWnYYf2U45mUGgJvvdpt3MqGeqrE9c3kBTrA7fpB7Je4WZ

