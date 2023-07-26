export const create = async (req, res) => {
    try {
        console.log("Body: ", req.body);
        console.log("Files: ", req.files);
        res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
        });
        
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Producto no pudo ser creado.",
        });
    }
};
