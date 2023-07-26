import Producto from "../models/Producto.model.js";

export const home = (req, res) => {
    res.render("home");
};

export const crudProductos = async (req, res) => {

    let productos = await Producto.findAll();
    productos = productos.map(producto => producto.toJSON());
    res.render("crudProductos", {
        productos
    });
};
