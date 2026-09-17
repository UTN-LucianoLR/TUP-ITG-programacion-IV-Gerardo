import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({

    razonSocial: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },

    cuit: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{11}$/
    },

    contacto: {
        email: {
            type: String,
            required: true,
            lowercase: true
        },

        telefono: {
            type: String
        }
    },

    direccion: {
        calle: {
            type: String
        },

        ciudad: {
            type: String
        },

        pais: {
            type: String,
            default: "Argentina"
        }
    },

    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 3
    },

    estadoActivo: {
        type: Boolean,
        default: true
    }

});

export const Proveedor = mongoose.model("Proveedor", proveedorSchema);