import { Usuario } from "../models/usuario.js";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

