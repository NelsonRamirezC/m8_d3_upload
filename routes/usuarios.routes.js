import { Router } from "express";
import * as controllers from "../controllers/usuarios.controller.js";
import * as auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", controllers.create);
router.post("/login", auth.emitToken, controllers.login);


export default router;
