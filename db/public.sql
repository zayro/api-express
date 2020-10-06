/*
 Navicat Premium Data Transfer

 Source Server         : pg_localhost
 Source Server Type    : PostgreSQL
 Source Server Version : 120003
 Source Host           : localhost:5432
 Source Catalog        : imaginamos
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120003
 File Encoding         : 65001

 Date: 22/06/2020 19:49:01
*/


-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS "public"."cliente";
CREATE TABLE "public"."cliente" (
  "id_cliente" int2 NOT NULL,
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "identificacion" int4 NOT NULL
)
;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO "public"."cliente" VALUES (2, 'marlon', 102030);
INSERT INTO "public"."cliente" VALUES (3, 'pepito', 10200343);
INSERT INTO "public"."cliente" VALUES (1, 'zayro', 102003);
INSERT INTO "public"."cliente" VALUES (4, 'pepito', 1020034);
INSERT INTO "public"."cliente" VALUES (5, 'prueba', 99);

-- ----------------------------
-- Table structure for servicio_calificacion
-- ----------------------------
DROP TABLE IF EXISTS "public"."servicio_calificacion";
CREATE TABLE "public"."servicio_calificacion" (
  "id_servicio_calificacion" int2 NOT NULL,
  "calificacion" int2,
  "id_servicio_solicitud" int2
)
;

-- ----------------------------
-- Records of servicio_calificacion
-- ----------------------------
INSERT INTO "public"."servicio_calificacion" VALUES (3, NULL, 6);
INSERT INTO "public"."servicio_calificacion" VALUES (4, NULL, 8);
INSERT INTO "public"."servicio_calificacion" VALUES (5, NULL, 10);
INSERT INTO "public"."servicio_calificacion" VALUES (6, NULL, 12);
INSERT INTO "public"."servicio_calificacion" VALUES (7, NULL, 14);
INSERT INTO "public"."servicio_calificacion" VALUES (8, NULL, 16);
INSERT INTO "public"."servicio_calificacion" VALUES (2, 20, 4);
INSERT INTO "public"."servicio_calificacion" VALUES (9, NULL, 18);
INSERT INTO "public"."servicio_calificacion" VALUES (10, NULL, 20);
INSERT INTO "public"."servicio_calificacion" VALUES (11, NULL, 22);
INSERT INTO "public"."servicio_calificacion" VALUES (12, NULL, 24);
INSERT INTO "public"."servicio_calificacion" VALUES (13, NULL, 26);
INSERT INTO "public"."servicio_calificacion" VALUES (14, NULL, 28);
INSERT INTO "public"."servicio_calificacion" VALUES (15, NULL, 30);
INSERT INTO "public"."servicio_calificacion" VALUES (16, NULL, 32);
INSERT INTO "public"."servicio_calificacion" VALUES (17, NULL, 34);
INSERT INTO "public"."servicio_calificacion" VALUES (18, NULL, 36);
INSERT INTO "public"."servicio_calificacion" VALUES (1, 10, 2);

-- ----------------------------
-- Table structure for servicio_seguimiento
-- ----------------------------
DROP TABLE IF EXISTS "public"."servicio_seguimiento";
CREATE TABLE "public"."servicio_seguimiento" (
  "id_servicio_seguimiento" int2 NOT NULL,
  "estado" varchar COLLATE "pg_catalog"."default",
  "id_servicio_solicitud" int2
)
;

-- ----------------------------
-- Records of servicio_seguimiento
-- ----------------------------
INSERT INTO "public"."servicio_seguimiento" VALUES (1, 'inicial', 2);
INSERT INTO "public"."servicio_seguimiento" VALUES (2, 'inicial', 4);
INSERT INTO "public"."servicio_seguimiento" VALUES (3, 'inicial', 6);
INSERT INTO "public"."servicio_seguimiento" VALUES (4, 'inicial', 8);
INSERT INTO "public"."servicio_seguimiento" VALUES (5, 'inicial', 10);
INSERT INTO "public"."servicio_seguimiento" VALUES (6, 'inicial', 12);
INSERT INTO "public"."servicio_seguimiento" VALUES (7, 'inicial', 14);
INSERT INTO "public"."servicio_seguimiento" VALUES (8, 'inicial', 16);
INSERT INTO "public"."servicio_seguimiento" VALUES (9, 'inicial', 18);
INSERT INTO "public"."servicio_seguimiento" VALUES (10, 'inicial', 20);
INSERT INTO "public"."servicio_seguimiento" VALUES (11, 'inicial', 22);
INSERT INTO "public"."servicio_seguimiento" VALUES (12, 'inicial', 24);
INSERT INTO "public"."servicio_seguimiento" VALUES (13, 'inicial', 26);
INSERT INTO "public"."servicio_seguimiento" VALUES (14, 'inicial', 28);
INSERT INTO "public"."servicio_seguimiento" VALUES (15, 'inicial', 30);
INSERT INTO "public"."servicio_seguimiento" VALUES (16, 'inicial', 32);
INSERT INTO "public"."servicio_seguimiento" VALUES (17, 'inicial', 34);
INSERT INTO "public"."servicio_seguimiento" VALUES (18, 'inicial', 36);

-- ----------------------------
-- Table structure for servicio_solicitud
-- ----------------------------
DROP TABLE IF EXISTS "public"."servicio_solicitud";
CREATE TABLE "public"."servicio_solicitud" (
  "id_servicio_solicitud" int2 NOT NULL,
  "identificacion_cliente" int4 NOT NULL,
  "descripcion" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of servicio_solicitud
-- ----------------------------
INSERT INTO "public"."servicio_solicitud" VALUES (2, 102030, NULL);
INSERT INTO "public"."servicio_solicitud" VALUES (4, 102030, NULL);
INSERT INTO "public"."servicio_solicitud" VALUES (6, 102030, NULL);
INSERT INTO "public"."servicio_solicitud" VALUES (8, 102030, NULL);
INSERT INTO "public"."servicio_solicitud" VALUES (10, 102030, NULL);
INSERT INTO "public"."servicio_solicitud" VALUES (12, 102030, NULL);
INSERT INTO "public"."servicio_solicitud" VALUES (14, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (16, 102030, 'nuevo tc');
INSERT INTO "public"."servicio_solicitud" VALUES (18, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (20, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (22, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (24, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (26, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (28, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (30, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (32, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (34, 102030, 'arrego del tv');
INSERT INTO "public"."servicio_solicitud" VALUES (36, 102030, 'arrego del tv');

-- ----------------------------
-- Table structure for servicio_ticket
-- ----------------------------
DROP TABLE IF EXISTS "public"."servicio_ticket";
CREATE TABLE "public"."servicio_ticket" (
  "id_servicio_ticket" int2 NOT NULL,
  "id_servicio_solicitud" int2,
  "id_tecnico" int2,
  "token" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of servicio_ticket
-- ----------------------------
INSERT INTO "public"."servicio_ticket" VALUES (1, 2, 1, NULL);
INSERT INTO "public"."servicio_ticket" VALUES (2, 4, 2, NULL);
INSERT INTO "public"."servicio_ticket" VALUES (3, 6, 1, NULL);
INSERT INTO "public"."servicio_ticket" VALUES (4, 8, 2, '');
INSERT INTO "public"."servicio_ticket" VALUES (5, 10, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI3ODMyMzcsImV4cCI6MzE4NTY1Mjg3NH0.EXytglLyRxpZuXESkJfOw2mOJYgQyaK5NToXRCllwM0');
INSERT INTO "public"."servicio_ticket" VALUES (6, 12, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI3OTQ4MDcsImV4cCI6MzE4NTY3NjAxNH0.24UnbmQjc8Nma1_LAIVSd3AHFxC8AecG_F7KByylN7A');
INSERT INTO "public"."servicio_ticket" VALUES (7, 14, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI3OTUwMDEsImV4cCI6MzE4NTY3NjQwMn0.so5A7C0q8K5eewj0ThHIXG1z2Xl4QsT4rkPKnfwcqCw');
INSERT INTO "public"."servicio_ticket" VALUES (8, 16, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI3OTUyMjgsImV4cCI6MzE4NTY3Njg1Nn0.U6Bjp-Y2wZlRgm9haOGKQ2vj9jJRljqj4knVN9ZvMtM');
INSERT INTO "public"."servicio_ticket" VALUES (9, 18, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTMxNDMsImV4cCI6MzE4NTc5MjY4Nn0.P-azr2Y0TAjRFgUJyhr3ATTHHRr3hzq91NdmdEO_Yfo');
INSERT INTO "public"."servicio_ticket" VALUES (10, 20, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTMxODYsImV4cCI6MzE4NTc5Mjc3Mn0.UWbaNQI6DC08JjSZQB-CJJ0GhmS2YPqePEQEHWHmJx0');
INSERT INTO "public"."servicio_ticket" VALUES (11, 22, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTMzMzUsImV4cCI6MzE4NTc5MzA3MH0.jH_7UIsuz-jacVrLXGb_7SzWJ0IfzRB_ycZRESkBSSw');
INSERT INTO "public"."servicio_ticket" VALUES (12, 24, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTMzNDQsImV4cCI6MzE4NTc5MzA4OH0.iUvntsZG-CZkWbIGGmy89UTxJ0DOb-lZ9blkeX-r2Vs');
INSERT INTO "public"."servicio_ticket" VALUES (13, 26, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTU4NzgsImV4cCI6MzE4NTc5ODE1Nn0.q0yws3uhyGrPCOBZk7pVGz0aEe5bmkIqq4PlFOgHPXY');
INSERT INTO "public"."servicio_ticket" VALUES (14, 28, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTU5MjAsImV4cCI6MzE4NTc5ODI0MH0.Z5iquqdm-v8eMDok2MeGG1XtL0e9_cUkWhCJXAevsCQ');
INSERT INTO "public"."servicio_ticket" VALUES (15, 30, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTc5NDYsImV4cCI6MzE4NTgwMjI5Mn0.ReTrDC8qf6Mfqm-8ESRiDa6eBJIBeDforTJCiYyc8HQ');
INSERT INTO "public"."servicio_ticket" VALUES (16, 32, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTkyMzAsImV4cCI6MzE4NTgwNDg2MH0.5hAsbaHYPaRGY42wKMWg1YvF35EhBmpJu6wue9eG62w');
INSERT INTO "public"."servicio_ticket" VALUES (17, 34, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NTkyMzgsImV4cCI6MzE4NTgwNDg3Nn0.7jcYwWIcgWhBEKiNIQznQWcjW4DROULGoESJJYQPbxo');
INSERT INTO "public"."servicio_ticket" VALUES (18, 36, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTI4NjEzOTAsImV4cCI6MzE4NTgwOTE4MH0.le2IuOkp5utMzAreg81vcAhPwBkEAgHtGAuDIgF6lIk');

-- ----------------------------
-- Table structure for tecnico
-- ----------------------------
DROP TABLE IF EXISTS "public"."tecnico";
CREATE TABLE "public"."tecnico" (
  "id_tecnico" int2 NOT NULL,
  "nombre" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of tecnico
-- ----------------------------
INSERT INTO "public"."tecnico" VALUES (1, 'tec1');
INSERT INTO "public"."tecnico" VALUES (2, 'tec2');
INSERT INTO "public"."tecnico" VALUES (3, 'tec3');

-- ----------------------------
-- View structure for ticket_soporte
-- ----------------------------
DROP VIEW IF EXISTS "public"."ticket_soporte";
CREATE VIEW "public"."ticket_soporte" AS  SELECT cliente.id_cliente,
    cliente.nombre AS cliente,
    tecnico.id_tecnico,
    tecnico.nombre AS tecnico,
    servicio_seguimiento.estado,
    servicio_calificacion.calificacion,
    servicio_solicitud.id_servicio_solicitud,
    concat('http://api-imaginamos.herokuapp.com/api/v1/calificacion/', servicio_solicitud.id_servicio_solicitud) AS calificar_servicio,
    concat('http://api-imaginamos.herokuapp.com/api/v1/seguimiento/', servicio_solicitud.id_servicio_solicitud) AS seguimiento_servicio
   FROM (((((servicio_solicitud
     JOIN cliente ON ((servicio_solicitud.identificacion_cliente = cliente.identificacion)))
     JOIN servicio_calificacion ON ((servicio_solicitud.id_servicio_solicitud = servicio_calificacion.id_servicio_solicitud)))
     JOIN servicio_seguimiento ON ((servicio_solicitud.id_servicio_solicitud = servicio_seguimiento.id_servicio_solicitud)))
     JOIN servicio_ticket ON ((servicio_solicitud.id_servicio_solicitud = servicio_ticket.id_servicio_solicitud)))
     JOIN tecnico ON ((servicio_ticket.id_tecnico = tecnico.id_tecnico)));

-- ----------------------------
-- Indexes structure for table cliente
-- ----------------------------
CREATE INDEX "cliente_id_cliente_idx" ON "public"."cliente" USING btree (
  "id_cliente" "pg_catalog"."int2_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table cliente
-- ----------------------------
ALTER TABLE "public"."cliente" ADD CONSTRAINT "campo_unico" UNIQUE ("identificacion");

-- ----------------------------
-- Primary Key structure for table cliente
-- ----------------------------
ALTER TABLE "public"."cliente" ADD CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente");

-- ----------------------------
-- Primary Key structure for table servicio_calificacion
-- ----------------------------
ALTER TABLE "public"."servicio_calificacion" ADD CONSTRAINT "servicio_calificacion_pkey" PRIMARY KEY ("id_servicio_calificacion");

-- ----------------------------
-- Primary Key structure for table servicio_seguimiento
-- ----------------------------
ALTER TABLE "public"."servicio_seguimiento" ADD CONSTRAINT "servicio_seguimiento_pk" PRIMARY KEY ("id_servicio_seguimiento");

-- ----------------------------
-- Indexes structure for table servicio_solicitud
-- ----------------------------
CREATE INDEX "servicio_solicitud_id_servicio_solicitud_idx" ON "public"."servicio_solicitud" USING btree (
  "id_servicio_solicitud" "pg_catalog"."int2_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table servicio_solicitud
-- ----------------------------
ALTER TABLE "public"."servicio_solicitud" ADD CONSTRAINT "servicio_solicitud_un" UNIQUE ("id_servicio_solicitud");

-- ----------------------------
-- Primary Key structure for table servicio_solicitud
-- ----------------------------
ALTER TABLE "public"."servicio_solicitud" ADD CONSTRAINT "servicio_solicitud_pk" PRIMARY KEY ("id_servicio_solicitud");

-- ----------------------------
-- Indexes structure for table servicio_ticket
-- ----------------------------
CREATE INDEX "servicio_ticket_id_servicio_ticket_idx" ON "public"."servicio_ticket" USING btree (
  "id_servicio_ticket" "pg_catalog"."int2_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table servicio_ticket
-- ----------------------------
ALTER TABLE "public"."servicio_ticket" ADD CONSTRAINT "servicio_ticket_pkey" PRIMARY KEY ("id_servicio_ticket");

-- ----------------------------
-- Primary Key structure for table tecnico
-- ----------------------------
ALTER TABLE "public"."tecnico" ADD CONSTRAINT "tecnico_pkey" PRIMARY KEY ("id_tecnico");

-- ----------------------------
-- Foreign Keys structure for table servicio_calificacion
-- ----------------------------
ALTER TABLE "public"."servicio_calificacion" ADD CONSTRAINT "servicio_calificacion_id_servicio_solicitud_fkey" FOREIGN KEY ("id_servicio_solicitud") REFERENCES "public"."servicio_solicitud" ("id_servicio_solicitud") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table servicio_seguimiento
-- ----------------------------
ALTER TABLE "public"."servicio_seguimiento" ADD CONSTRAINT "servicio_seguimiento_id_servicio_solicitud_fkey" FOREIGN KEY ("id_servicio_solicitud") REFERENCES "public"."servicio_solicitud" ("id_servicio_solicitud") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- ----------------------------
-- Foreign Keys structure for table servicio_solicitud
-- ----------------------------
ALTER TABLE "public"."servicio_solicitud" ADD CONSTRAINT "servicio_solicitud_identificacion_cliente_fkey" FOREIGN KEY ("identificacion_cliente") REFERENCES "public"."cliente" ("identificacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table servicio_ticket
-- ----------------------------
ALTER TABLE "public"."servicio_ticket" ADD CONSTRAINT "servicio_ticket_id_servicio_solicitud_fkey" FOREIGN KEY ("id_servicio_solicitud") REFERENCES "public"."servicio_solicitud" ("id_servicio_solicitud") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "public"."servicio_ticket" ADD CONSTRAINT "servicio_ticket_id_tecnico_fkey" FOREIGN KEY ("id_tecnico") REFERENCES "public"."tecnico" ("id_tecnico") ON DELETE RESTRICT ON UPDATE RESTRICT;
