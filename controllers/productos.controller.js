import Producto from "../models/Producto.model.js";
import * as uploadsMiddleware from "../middlewares/uplodadImage.middleware.js";

export const create = async (req, res) => {
    try {
        let { nombre, descripcion, precio, stock } = req.body;


        /* req.imagen = result.public_id;
        req.rutaImagen = result.secure_url; */

        let nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock,
            imagen: req.imagen, // req.imagen corresponde al nombre public - public id de la imagen
            rutaImagen: req.rutaImagen // corresponde a la ruta cloud donde se almacena la imagen
        });

        return res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
            producto: nuevoProducto,
        });

    } catch (error) {
        console.log(error);
        //si no se crea el producto, lo eliminamos del servicio cloud

        uploadsMiddleware.deleteImage(req.imagen).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            res.status(500).json({
                code: 500,
                message: "Producto no pudo ser creado.",
            });
        })
    }
};
