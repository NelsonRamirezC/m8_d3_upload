import Producto from "../models/Producto.model.js";
import Usuario from "../models/Usuario.model.js";
import sequelize from "../database/database.js";

export const home = async (req, res) => {
    try {
        let [results, metadata] = await sequelize.query(`
            select count(*) as cantidad from "Usuarios"
            where admin = false
            group by admin;
        `);
        let cantidadUsuarios = results[0].cantidad;

        res.render("home", {
            viewHome: true,
            cantidadUsuarios,
        });
    } catch (error) {
        res.render("home", {
            viewHome: true,
            error: "Problemas el contenido de la web, intente más tarde / esto ha sido reportado.",
        });
    }
};

export const crudProductos = async (req, res) => {
    if (req.error) {
        res.render("crudProductos", {
            error: req.error,
            viewCrudProductos: true,
        });
    } else {
        let productos = await Producto.findAll();
        productos = productos.map((producto) => producto.toJSON());
        res.render("crudProductos", {
            productos,
            viewCrudProductos: true,
        });
    }
};

export const login = (req, res) => {
    res.render("login", {
        viewLogin: true,
    });
};

export const registro = (req, res) => {
    res.render("registro", {
        viewRegistro: true,
    });
};

export const perfil = async (req, res) => {
    if (req.error) {
        res.render("perfil", {
            error: req.error,
            viewPerfil: true,
        });
    } else {
        if (req.usuario) {
            res.render("perfil", {
                usuario: req.usuario,
                viewPerfil: true,
            });
        } else {
            res.render("perfil", {
                error: "Usuario no se encuentra en el sistema, verifique si aún tiene cuenta.",
                viewPerfil: true,
            });
        }
    }
};

export const misPublicaciones = async (req, res) => {
    if (req.error) {
        res.render("misPublicaciones", {
            error: req.error,
            viewMisPublicaciones: true,
        });
    } else {
        if (req.usuario) {
            res.render("misPublicaciones", {
                usuario: req.usuario,
                viewMisPublicaciones: true,
            });
        } else {
            res.render("misPublicaciones", {
                error: "Usuario no se encuentra en el sistema, verifique si aún tiene cuenta.",
                viewMisPublicaciones: true,
            });
        }
    }
};

export const monitorUsuarios = async (req, res) => {
    if (req.error) {
        res.render("monitorUsuarios", {
            error: req.error,
            viewMonitorUsuarios: true,
        });
    } else {
        res.render("monitorUsuarios", {
            viewMonitorUsuarios: true,
        });
    }
};
