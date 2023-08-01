let btnsDelete = document.querySelectorAll(".tableCrud .btnDelete");

let btnsUpdate = document.querySelectorAll(".tableCrud .btnUpdate");

//LÓGICA PARA ELIMINAR PRODUCTOS
btnsDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener("click", async (event) => {
        let id = buttonDelete.dataset.id;
        console.log(id);

        try {
            let confirmacion = confirm(
                `Desea eliminar el producto con id: ${id}?`
            );
            if (!confirmacion) return;
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            let response = await fetch(`/api/productos/${id}`, {
                method: "delete",
                headers: myHeaders
            });
            let result = await response.json();

            if (result.code == 200) {
                alert(result.message);
                location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("Error al intentar eliminar el producto con id: " + id);
        }
    });
});

//LÓGICA PARA ACTUALIZAR PRODUCTOS

btnsUpdate.forEach((buttonUpdate) => {
    buttonUpdate.addEventListener("click", async (event) => {
        let { id, nombre, descripcion, precio, stock } = buttonUpdate.dataset;
        updateModalLabel.innerText = `Actulizar producto con ID (${id})`;
        updateId.value = id;
        updateNombre.value = nombre;
        updateDescripcion.value = descripcion;
        updatePrecio.value = precio;
        updateStock.value = stock;
    });
});

//LÓGICA PARA ENVIAR DATOS DE PRODUCTOS PARA SU ACTUALIZACIÓN
let formUpdateProducto = document.getElementById("formUpdateProducto");

formUpdateProducto.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        let data = new FormData(formUpdateProducto);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        let response = await fetch("/api/productos", {
            method: "put",
            body: data,
            headers: myHeaders
        })

        let result = await response.json();

        if (result.code == 201) {
            alert(result.message);
            location.reload();
        } else {
            alert(result.message);
        }

    } catch (error) {
        alert("Error al intentar actualizar el producto.");
    }
});
