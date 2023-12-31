import { v4 as uuid } from "uuid";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

        let nombreImagen = `IMG-${uuid().slice(0, 6)}.${extension}`;
        let pathDestino = path.resolve(
            __dirname,
            "../public/uploads/",
            nombreImagen
        );

        imagen.mv(pathDestino, (error) => {
            if (error) {
                return res.status(500).json({
                    code: 500,
                    message:
                        "Se produjo un error al intentar guardar la imagen en el servidor.",
                });
            }

            req.imagen = nombreImagen;
            req.pathDetinoImagen = pathDestino;
            next();

        });

    } else {
        next();
    }

};
