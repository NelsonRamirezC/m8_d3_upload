import Producto from "../models/Producto.model.js";
import Usuario from "../models/Usuario.model.js";

export const home = (req, res) => {
    res.render("home");
};

export const crudProductos = async (req, res) => {
    if (req.error) {
        res.render("crudProductos", {
            error: req.error,
        });
    } else {
        let productos = await Producto.findAll();
        productos = productos.map((producto) => producto.toJSON());
        res.render("crudProductos", {
            productos,
        });
    }
};

export const login = (req, res) => {
    res.render("login");
};

export const registro = (req, res) => {
    res.render("registro");
};

export const perfil = async (req, res) => {

    if (req.error) {
        res.render("perfil", {
            error: req.error
        });
    } else {
        if (req.usuario) {
            res.render("perfil", {
                usuario: req.usuario,
            });
        } else {
            res.render("perfil", {
                error: "Usuario no se encuentra en el sistema, verifique si aún tiene cuenta.",
            });
        }
    }
};

export const misPublicaciones = async (req, res) => {

    if (req.error) {
        res.render("misPublicaciones", {
            error: req.error,
        });
    } else {
        if (req.usuario) {
            res.render("misPublicaciones", {
                usuario: req.usuario,
            });
        } else {
            res.render("misPublicaciones", {
                error: "Usuario no se encuentra en el sistema, verifique si aún tiene cuenta.",
            });
        }
    }

};
