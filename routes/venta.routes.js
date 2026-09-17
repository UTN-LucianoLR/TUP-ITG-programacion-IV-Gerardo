import { Router } from "express";
import { getVentas, getVentaById, crearVenta } from "../controllers/venta.controller.js";

const router = Router();

router.get("/", getVentas);
router.get("/:id", getVentaById);
router.post("/", crearVenta);

export default router;
