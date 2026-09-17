import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    productos: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            },
            precioUnitario: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: 0
    }
});

export const Venta = mongoose.model("Venta", ventaSchema);
