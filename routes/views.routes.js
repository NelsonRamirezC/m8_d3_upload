import { Router } from 'express';
import * as controllers from "../controllers/views.controller.js";

const router = Router();

//rutas públicas
router.get('/', controllers.home);
router.get("/login", controllers.login);
router.get("/registro", controllers.registro);

//rutas protegidas
router.get("/crud_productos", controllers.crudProductos);



export default router;