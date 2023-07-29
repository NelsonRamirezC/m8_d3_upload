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


export const login = async (req, res) => {
    try {
        let { email, password, } = req.body;
        
        let usuario = await Usuario.findOne({
            email,
            password,
        });

        console.log(usuario);

        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message: "Email y/o password incorrecto.",
            });
        }

        return res.status(200).json({
            code: 200,
            message: "Login correcto.",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "No se pudo procesar la solicitud de login",
        });
    }
};
