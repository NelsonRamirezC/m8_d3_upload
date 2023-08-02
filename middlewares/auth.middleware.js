import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.model.js";
import bcrypt from "bcrypt";

export const emitToken = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        let usuario = await Usuario.findOne({
            where: {
                email,
            },
            attributes: ["id", "nombre", "run", "email", "admin", "password", "fechaNacimiento"],
        });

        if (!usuario) {
            return res.status(400).json({
                code: 400,
                message: "Email y/o password incorrecto.",
            });
        }

        let validacionPassword = bcrypt.compareSync(password, usuario.password); 

        if (!validacionPassword) {
            return res.status(400).json({
                code: 400,
                message: "Email y/o password incorrecto.",
            });
        } else {
            delete usuario.password;
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
            //incluir lógica para vista
            let path = req.route.path;

            if (path.includes("api")) {
                return res.status(401).json({
                    code: 401,
                    message: "debe estar autenticado para acceder al recurso.",
                });
            } else {
                req.error = "debe estar autenticado para acceder al recurso.";
                return next();
            }
        }
        let usuario = await Usuario.findByPk(dataToken.data.id, {
            attributes: ["id", "nombre", "run", "email", "admin", "fechaNacimiento"],
        });

        usuario = usuario.toJSON();
        req.usuario = usuario;
        return next();
    } catch (error) {
        console.log(error);
        let code = 500;
        let errorMessage = "Error en proceso de autenticación";

        if (error.code) {
            code = error.code;
            errorMessage = error.errorMessage;
        }
        //incluir lógica para vista
        let path = req.route.path;
        if (path.includes("api")) {
            return res.status(code).json({
                code,
                message: errorMessage,
            });
        } else {
            req.error = errorMessage;
            return next();
        }
    }
};
