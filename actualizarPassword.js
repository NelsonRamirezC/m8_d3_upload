//import sequelize from "./database/database.js";
/* import Usuario from "./models/Usuario.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

const main = async () => {
    let usuarios = await Usuario.findAll({
        where: {
            id: {
                [Op.ne]: 3,
            },
        },
    });

   usuarios = usuarios.map((usuario) => usuario.toJSON());

    for (const usuario of usuarios) {
        let usuarioDB = await Usuario.findByPk(usuario.id);
        usuarioDB.password = bcrypt.hashSync(usuarioDB.password, 10);
        usuarioDB.save();
    }
};

main(); */

//segunda opción

import Usuario from "./models/Usuario.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

const main = async () => {
    let usuarios = await Usuario.findAll({
        where: {
            password: {
                [Op.notLike]: "$2b$10$%",
            },
        },
        raw: true,
    });

    for (const usuario of usuarios) {
        await Usuario.update(
            {
                password: bcrypt.hashSync(usuario.password, 10),
            },
            {
                where: {
                    id: usuario.id,
                },
            }
        );
    }
};

main();
