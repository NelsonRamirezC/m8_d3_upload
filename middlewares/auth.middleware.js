import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.model.js";

export const emitToken = async (req, res, next) => {

    try {
        let { email, password, } = req.body;
        
        let usuario = await Usuario.findOne({
            where: {
                email, password
            },
            attributes: ["nombre", "email", "admin"]
        });

        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message: "Email y/o password incorrecto.",
            });
        }

        let token = jwt.sign(
            {
                data: usuario,
            },
            process.env.SECRETO,
            { expiresIn: "1h" }
        );

        req.token = token;
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error en proceso de autenticación."
        })
    }

}

export const verifyToken = () => {
    //...
};