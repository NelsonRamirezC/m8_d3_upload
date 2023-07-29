import Usuario from "../models/Usuario.model.js";

export const create = async (req, res) => {
    try {
        let { nombre, email, password, replyPassword } = req.body;

        if (password != replyPassword) {
            return res.status(400).json({
                code: 400,
                message: "Passwords no coinciden.",
            });
        }

        await Usuario.create({
            nombre,
            email,
            password,
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
