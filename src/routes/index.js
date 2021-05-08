import express from "express";

const api = express();

const users = require("../controllers/cliente");

const { checkAuth } = require("../middleware");

api.get("/users", users.getAll);
api.get("/users/:id", users.getOne);
api.post("/users", users.save);
api.put("/users/:id", users.update);
api.delete("/users/:id", users.destroy);

/**
 * Routes of Api
 */

export { api };

export { general } from "./general";

export { auth } from "./auth";

export { query } from "./query";

export { files } from "./files";

export { uploads } from "../controllers/upload";
