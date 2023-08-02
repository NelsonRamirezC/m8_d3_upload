import Usuario from "../models/Usuario.model.js";
import bcrypt from"bcrypt";

export const create = async (req, res) => {
    try {
        let { nombre, run, email, password, replyPassword, fechaNacimiento } = req.body;

        if (password != replyPassword) {
            return res.status(400).json({
                code: 400,
                message: "Passwords no coinciden.",
            });
        }

        const hash = bcrypt.hashSync(password, 10);

        await Usuario.create({
            nombre,
            run,
            email,
            password: hash,
            fechaNacimiento,
        });

        return res.status(201).json({
            code: 201,
            message: "Usuario creado con éxito.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Usuario no pudo ser creado",
        });
    }
};


export const login = async (req, res) => {
    try {
        res.status(200).json({
            code: 200,
            message: "Login correcto.",
            token: req.token,
            usuario: req.usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "No se pudo procesar la solicitud de login",
        });
    }
};
