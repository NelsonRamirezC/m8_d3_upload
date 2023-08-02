import { Router } from 'express';
import * as controllers from "../controllers/views.controller.js";
import * as auth from "../middlewares/auth.middleware.js";
import * as admin from "../middlewares/admin.middleware.js";
const router = Router();

//rutas públicas
router.get('/', controllers.home);
router.get("/login", controllers.login);
router.get("/registro", controllers.registro);
router.get("/perfil", auth.verifyToken, controllers.perfil);
router.get("/mispublicaciones", auth.verifyToken, controllers.misPublicaciones);
router.get(
    "/monitor/usuarios",
    auth.verifyToken,
    admin.verificar,
    controllers.monitorUsuarios
);

//rutas protegidas
router.get("/crud_productos", auth.verifyToken, admin.verificar, controllers.crudProductos);



export default router;