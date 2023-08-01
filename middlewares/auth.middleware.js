import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.model.js";

export const emitToken = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        let usuario = await Usuario.findOne({
            where: {
                email,
                password,
            },
            attributes: ["id", "nombre", "email", "admin"],
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
            message: "Error en proceso de autenticación.",
        });
    }
};

/* const verificarToken = () => {
    
} */

const verificacionToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRETO, (error, decoded) => {
            if (error) {
                console.log("error decoded token: ", error);
                reject({
                    code: 401,
                    errorMessage:
                        "el token proporcionado no fue emitido por el servidor, fue alterado o se encuentra caducado.",
                });
            }
            resolve(decoded);
        });
    });
};

export const verifyToken = async (req, res, next) => {
    //...
    let { authorization } = req.headers;
    let { token } = req.query;
    let dataToken;

    try {
        if (authorization) {
            let token = authorization.split(" ")[1];
            dataToken = await verificacionToken(token);
        } else if (token) {
            dataToken = await verificacionToken(token);
        } else {
            return res.status(401).json({
                code: 401,
                message: "debe estar autenticado para ingresar a la vista.",
            });
        }
        let usuario = await Usuario.findByPk(dataToken.data.id, {
            attributes: ["id", "nombre", "email", "admin"],
        });

        usuario = usuario.toJSON();
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        let code = 500;
        let errorMessage = "Error en proceso de autenticación";

        if (error.code) {
            code = error.code;
            errorMessage = error.errorMessage;
        }
        res.status(code).json({
            code,
            message: errorMessage,
        });
    }
};
