import { Proveedor } from "../models/proveedor.js";

// 1. Crear proveedor
export const crearProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        const proveedorGuardado = await nuevoProveedor.save();

        res.status(201).json(proveedorGuardado);

    } catch (error) {

        // Error por CUIT duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El CUIT ya está registrado"
            });
        }

        res.status(400).json({
            mensaje: "Error al crear el proveedor",
            detalle: error.message
        });
    }
};


// 2. Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
    try {

        const proveedores = await Proveedor.find();

        res.status(200).json(proveedores);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error del servidor",
            detalle: error.message
        });
    }
};


// 3. Obtener proveedor por ID
export const obtenerProveedorPorId = async (req, res) => {
    try {

        const { id } = req.params;

        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({
                mensaje: "Proveedor no encontrado"
            });
        }

        res.status(200).json(proveedor);

    } catch (error) {

        res.status(400).json({
            mensaje: "ID inválido",
            detalle: error.message
        });
    }
};


// 4. Actualizar proveedor
export const actualizarProveedor = async (req, res) => {
    try {

        const { id } = req.params;

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!proveedorActualizado) {
            return res.status(404).json({
                mensaje: "Proveedor no encontrado"
            });
        }

        res.status(200).json(proveedorActualizado);

    } catch (error) {

        // Error por CUIT duplicado
        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: "El CUIT ya está registrado"
            });
        }

        res.status(400).json({
            mensaje: "Error al actualizar el proveedor",
            detalle: error.message
        });
    }
};


// 5. Borrado lógico
export const borradoLogicoProveedor = async (req, res) => {
    try {

        const { id } = req.params;

        const proveedor = await Proveedor.findByIdAndUpdate(
            id,
            { estadoActivo: false },
            {
                new: true,
                runValidators: true
            }
        );

        if (!proveedor) {
            return res.status(404).json({
                mensaje: "Proveedor no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Proveedor desactivado correctamente",
            proveedor: proveedor
        });

    } catch (error) {

        res.status(400).json({
            mensaje: "Error al desactivar el proveedor",
            detalle: error.message
        });
    }
};