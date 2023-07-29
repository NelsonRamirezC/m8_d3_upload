import { Router } from "express";
import * as controllers from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/", controllers.create);


export default router;
