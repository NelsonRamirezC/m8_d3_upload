import { Router } from "express";
import * as controllers from "../controllers/productos.controller.js";
import * as middlewares from "../middlewares/uplodadImage.middleware.js";


const router = Router();

router.post("/", middlewares.uploadImage, controllers.create);
router.delete("/:id", controllers.deleteById);
router.put("/", middlewares.uploadImage, controllers.update);

export default router;
