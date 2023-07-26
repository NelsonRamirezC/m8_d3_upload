import express from "express";
import cors from "cors";
import { create } from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//configuración de handlebars

const hbs = create({
	partialsDir: [
		path.resolve(__dirname, "./views/partials/"),
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/", viewsRoutes);

app.all("*", (req, res) => {
    res.status(404).send("Ruta desconocida.");
})

export default app;