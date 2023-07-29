import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Producto = sequelize.define(
    "Productos",
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
        descripcion: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Campo descripción no permite guardar valores vacíos.",
                },
            },
        },
        precio: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "producto.jpg",
            validate: {
                notEmpty: true,
            },
        },
        rutaImagen: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "/public/uploads/producto.jpg",
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        tableName: "Productos",
        timestamps: true,
    }
);

export default Producto;
