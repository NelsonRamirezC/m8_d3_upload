import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env") });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadImage = (req, res, next) => {

    //capturar file de imagen subida en formulario.
    let imagen = req.files?.imagen;

    if (imagen) {
        
        let limiteMb = 1;
        let mbs = limiteMb * 1024 * 1024

        if (imagen.size > mbs) {
            return res.status(400).json({
                code: 400,
                message: `Imagen ha sobrepasado el limite de ${limiteMb} mbs permitido.`,
            });
        }

        let formatos = ["jpeg", "gif", "webp", "svg"];
        let extension = imagen.mimetype.split("/")[1];

         if (!formatos.includes(extension)) {
             return res.status(400).json({
                 code: 400,
                 message: `Formato no permitido, los formatos permitidos son: [${formatos.join(
                     " - "
                 )}]`,
             });
        }
        
        cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
                return res
                    .status(500)
                    .json({
                        code: 500,
                        message: "Error al subir la imagen al servidor.",
                    });
            }

            console.log(result);

            req.imagen = result.public_id;
            req.rutaImagen = result.secure_url;

            next();
        }).end(imagen.data);


    } else {
        next();
    }

};


export const deleteImage = (imagenId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(imagenId, (error, result) => {
            if (error) {
                    reject("error al eliminar la imagen del servidor de cloudinary.")
            }
            return console.log(
                resolve("Imagen eliminada correctamente del servicio de cloudinary.")
            );
        });
    })
}

