import { Router } from "express";
import * as controllers from "../controllers/productos.controller.js";
import * as middlewares from "../middlewares/uplodadImage.middleware.js";


const router = Router();

router.post("/", middlewares.uploadImage, controllers.create);

export default router;
