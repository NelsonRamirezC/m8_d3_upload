import Producto from "../models/Producto.model.js";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs";

export const create = async (req, res) => {
    try {
        let { nombre, descripcion, precio, stock } = req.body;

        let nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock,
            imagen: req.imagen
        });

        return res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
            producto: nuevoProducto,
        });

    } catch (error) {
        console.log(error);
        fs.unlink(req.pathDetinoImagen, (error) => {
            if(error){
                console.log("No se pudo eliminar la imagen");
            } else {
                console.log("imagen eliminada con éxito.");
            }
        });
        res.status(500).json({
            code: 500,
            message: "Producto no pudo ser creado.",
        });
    }
};