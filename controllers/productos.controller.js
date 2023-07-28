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

export const deleteById = async (req, res) => {
    let id = req.params.id;
    try {
        let producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                code: 404,
                message: `No fue posible encontrar un producto con el id: ${id}`,
            });
        }

        //SI PRODUCTO EXISTE...
        uploadsMiddleware
            .deleteImage(producto.imagen)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log("Error eliminar imagen servicio cloud", error);
            })
        
        await producto.destroy();
        res.status(200).json({
            code: 200,
            message: `Producto con ID:${id}, eliminado con éxito.`,
        });

    } catch (error) {
        console.log("Error elimiar producto", error)
        res.status(500).json({
            code: 500,
            message: `Producto no pudo ser eliminado con id: ${id}`,
        });
    }

}


export const update = (req, res) => {
    let {id, nombre, descripcion, precio, stock } = req.body
    try {
        res.status(201).json({
            code: 201,
            message: "Producto actualizado con éxito.",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Producto con id: ${id}, no pudo ser actualizado `,
        });
    }
};
