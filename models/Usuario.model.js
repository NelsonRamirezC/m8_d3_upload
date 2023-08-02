import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Usuario = sequelize.define(
    "Usuarios",
    {
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo nombre no permite guardar valores vacíos.",
                },
            },
        },
        run: {
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Campo run no permite guardar valores vacíos.",
                },
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo nombre no permite guardar valores vacíos.",
                },
                isEmail: {
                    msg: "Campo debe cumplir con formato email, ejemplo [email@example.com]",
                },
            },
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo nombre no permite guardar valores vacíos.",
                },
            },
        },
        fechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: {
                    msg: "Campo admin no permite guardar valores vacíos.",
                },
            },
        },
    },
    {
        tableName: "Usuarios",
        timestamps: false,
    }
);

export default Usuario;
