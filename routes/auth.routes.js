import { Router } from "express";
import { 
    registrarUsuario,
    login,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/", registrarUsuario);
router.post("/login", login);

export default router;