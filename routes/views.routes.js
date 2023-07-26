import { Router } from 'express';
import * as controllers from "../controllers/views.controller.js";

const router = Router();

router.get('/', controllers.home);


export default router;