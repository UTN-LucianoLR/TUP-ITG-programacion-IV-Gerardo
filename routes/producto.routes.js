import { Router } from "express";

import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarPrecioStock,
    borradoLogico
} from "../controllers/producto.controller.js";

const router = Router();

router.post("/", crearProducto);

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

router.put("/:id", actualizarPrecioStock);

router.delete("/:id", borradoLogico);

export default router;