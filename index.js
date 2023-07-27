import app from "./server.js";
import sequelize from "./database/database.js";

import "./models/Producto.model.js";

const main = async () => {
    await sequelize.authenticate();
    await sequelize.sync({force: false, alter: true});
    app.listen(3000, () => {
        console.log("Servidor escucha en puerto 3000.")
    })
}

main();