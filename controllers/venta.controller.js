import { Venta } from "../models/venta.js";

// Obtener todas las ventas
export const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('productos.producto');
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las ventas", error: error.message });
    }
};

// Obtener una venta por ID
export const getVentaById = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id).populate('productos.producto');
        if (!venta) {
            return res.status(404).json({ mensaje: "Venta no encontrada" });
        }
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la venta", error: error.message });
    }
};

// Crear una nueva venta
export const crearVenta = async (req, res) => {
    try {
        const { productos, total } = req.body;
        const nuevaVenta = new Venta({ productos, total });
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear la venta", error: error.message });
    }
};
