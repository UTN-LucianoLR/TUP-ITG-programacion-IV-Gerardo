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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const passwordCorrecto = await usuario.compararPassword(password);
        if (!passwordCorrecto) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const payload = {
            id: usuario._id,
            rol: usuario.rol
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.status(200).json({ 
            mensaje: "Login exitoso",
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};