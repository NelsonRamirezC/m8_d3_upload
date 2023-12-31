import Usuario from "../models/Usuario.model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

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

export const findUsers = async (req, res) => {
    let { email, run, fechaInicio, fechaTermino } = req.query;
    console.log(req.query)
    try {

        let filtros = {};

         //filtro por email
         if (email) {
             filtros.email = {
                 [Op.substring]: email
             };
         }

         //filtro por run
         if (run) {
             filtros.run = {
                 [Op.substring]: run
             };
         }

         //filtro por cuando sólo existe fecha de inicio
         if (fechaInicio && !fechaTermino) {
             filtros.fechaNacimiento = {
                 [Op.gte]: fechaInicio,
             };
             //filtro cuando sólo existe fecha de termino
         } else if (!fechaInicio && fechaTermino) {
             filtros.fechaNacimiento = {
                 [Op.lte]: fechaTermino,
             };
             //filtro cuando existe fecha de inicio y termino
         } else if (fechaInicio && fechaTermino) {
             filtros.fechaNacimiento = {
                 [Op.between]: [fechaInicio, fechaTermino],
             };
         }


        let { count, rows: usuarios } = await Usuario.findAndCountAll({
            order: [["id", "ASC"]],
            attributes: {
                exclude: ["password"],
            },
            where: filtros,
        });

        res.json({code: 200, usuarios, registros: count})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 500,
            message: "No fue posible obtener la información de usuarios.",
        });
    }
}


//sequelize-auto

