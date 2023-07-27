import express from "express";
import cors from "cors";
import { create } from "express-handlebars";
import upload from "express-fileupload";
import helmet from "helmet";

//importación de rutas
import viewsRoutes from "./routes/views.routes.js";
import productosRoutes from "./routes/productos.routes.js";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//middlewares generales
/* app.use(
    helmet.contentSecurityPolicy({
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"], 
            "style-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        },
    })
); */
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //req.body
app.use(cors()); // next
app.use(upload()); //req.files

//ruta publica
app.use("/public", express.static(path.resolve(__dirname, "./public")));


//configuración de handlebars

const hbs = create({
	partialsDir: [
		path.resolve(__dirname, "./views/partials/"),
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//rutas de vista
app.use("/", viewsRoutes);

//endpoints
app.use("/api/productos", productosRoutes);

app.all("*", (req, res) => {
    res.status(404).send("Ruta desconocida.");
})

export default app;