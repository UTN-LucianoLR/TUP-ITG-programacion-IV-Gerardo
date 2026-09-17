import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    codigoSKU: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        match: /^[A-Z]{3}-\d{3}$/
    },

    nombre: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: "El stock debe ser un número entero"
        }
    },

    categoria: {
        type: String,
        enum: [
            "PERIFERICOS",
            "MONITORES",
            "COMPONENTES",
            "ACCESORIOS"
        ]
    },

    estadoActivo: {
        type: Boolean,
        default: true
    },

    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proveedor",
        required: [
            true,
            "El producto debe pertenecer o estar asociado a un proveedor"
        ]
    }
});

export const Producto = mongoose.model("Producto", productoSchema);