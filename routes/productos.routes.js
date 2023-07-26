import { Router } from "express";
import * as controllers from "../controllers/productos.controller.js";

const router = Router();

router.post("/", controllers.create);

export default router;
