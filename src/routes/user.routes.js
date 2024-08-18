import { authJwt } from "../middleware/index.js";
import { allAccess, userContent, moderatorContent, adminContent } from "../controllers/user.controllers.js";
import { Router } from "express";

const router = Router();

// Middleware para configurar los encabezados CORS
router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Rutas públicas
router.get("/api/test/all", allAccess);

// Rutas protegidas
router.get("/api/test/user", authJwt.verifyToken, userContent);

router.get(
  "/api/test/mod",
  authJwt.verifyToken,
  authJwt.isModerator,
  moderatorContent
);

router.get(
  "/api/test/admin",
  authJwt.verifyToken,
  authJwt.isAdmin,
  adminContent
);

export default (app) => {
  app.use(router);
};