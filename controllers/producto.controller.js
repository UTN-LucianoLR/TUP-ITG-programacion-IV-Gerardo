import { Producto } from "../models/producto.js";

// 1. Crear producto
export const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();

        res.status(201).json(productoGuardado);

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el producto",
            detalle: error.message
        });
    }
};


// 2. Obtener productos con filtro opcional por categoría
export const obtenerProductos = async (req, res) => {
    try {
        const { categoria } = req.query;

        let productos;

        if (categoria) {
            productos = await Producto.find({ categoria: categoria });
        } else {
            productos = await Producto.find();
        }

        res.status(200).json(productos);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error del servidor",
            detalle: error.message
        });
    }
};


// 3. Obtener producto por ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json(producto);

    } catch (error) {
        res.status(400).json({
            mensaje: "ID inválido",
            detalle: error.message
        });
    }
};


// 4. Actualizar producto
export const actualizarPrecioStock = async (req, res) => {
    try {
        const { id } = req.params;
        const datosNuevos = req.body;

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            datosNuevos,
            {
                new: true,
                runValidators: true
            }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json(productoActualizado);

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el producto",
            detalle: error.message
        });
    }
};


// 5. Borrado lógico
export const borradoLogico = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByIdAndUpdate(
            id,
            { estadoActivo: false },
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Producto desactivado correctamente",
            producto: producto
        });

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al desactivar el producto",
            detalle: error.message
        });
    }
};