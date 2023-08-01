import { Router } from "express";
import * as controllers from "../controllers/productos.controller.js";
import * as middlewares from "../middlewares/uplodadImage.middleware.js";
import * as admin from "../middlewares/admin.middleware.js";
import * as auth from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/", auth.verifyToken, admin.verificar, middlewares.uploadImage, controllers.create);
router.delete("/:id", auth.verifyToken, admin.verificar, controllers.deleteById);
router.put("/", auth.verifyToken, admin.verificar, middlewares.uploadImage, controllers.update);

export default router;
