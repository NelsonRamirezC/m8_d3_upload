import { Router } from "express";
import * as controllers from "../controllers/usuarios.controller.js";
import * as auth from "../middlewares/auth.middleware.js";
import * as admin from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/", controllers.create);
router.post("/login", auth.emitToken, controllers.login);
router.get("/", auth.verifyToken, admin.verificar, controllers.findUsers);


export default router;
