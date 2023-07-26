import Producto from "../models/Producto.model.js";
import { v4 as uuid } from "uuid";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const create = async (req, res) => {
    try {
        let { nombre, descripcion, precio, stock } = req.body;

        let imagen = req.files?.imagen;
        if (imagen) {
            let formatos = ["jpeg", "gif", "webp", "svg"];

            let extension = imagen.mimetype.split("/")[1];

            if (!formatos.includes(extension)) {
                return res.status(400).json({ code: 400 , message: `Formato no permitido, los formatos permitidos son: [${formatos.join(" - ")}]`})
            }
            let nombreImagen = `IMG-${uuid().slice(0, 6)}.${extension}`;
            let pathDestino = path.resolve(
                __dirname,
                "../public/uploads/",
                nombreImagen
            );

            imagen.mv(pathDestino, async (error) => {
                if (error) {
                    return res.status(500).json({
                        code: 500,
                        message:
                            "Se produjo un error al crear el producto (no se pudo procesar la imagen.).",
                    });
                }

                let nuevoProducto = await Producto.create({
                    nombre,
                    descripcion,
                    precio,
                    stock,
                    imagen: nombreImagen,
                });

                return res.status(201).json({
                    code: 201,
                    message: "Producto creado con éxito.",
                    producto: nuevoProducto,
                });
            });
        } else {
            let nuevoProducto = await Producto.create({
                nombre,
                descripcion,
                precio,
                stock,
            });

            return res.status(201).json({
                code: 201,
                message: "Producto creado con éxito.",
                producto: nuevoProducto,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Producto no pudo ser creado.",
        });
    }
};
