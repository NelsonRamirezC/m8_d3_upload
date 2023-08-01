let formAddProducto = document.getElementById("formAddProducto");
let btnCrear = document.getElementById("btnCrear");
let spinner = document.querySelector("#btnCrear .spinner-border");
let statusButtonCrear = document.querySelector("#btnCrear .statusButton");
let messageCrearProducto = document.querySelector(".messageCrearProducto");

console.log(btnCrear, spinner);
formAddProducto.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        btnCrear.setAttribute("disabled", "");
        spinner.classList.remove("d-none");
        statusButtonCrear.innerText = "Creando producto.";
        messageCrearProducto.innerText = "";

        let data = new FormData(formAddProducto);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        let response = await fetch("/api/productos", {
            method: "POST",
            body: data,
            headers: myHeaders,
        });

        let result = await response.json();

        if (result.code == 201) {
            messageCrearProducto.classList.remove("text-danger");
            messageCrearProducto.classList.add("text-success");
            messageCrearProducto.innerText = result.message;

            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            messageCrearProducto.classList.remove("text-success");
            messageCrearProducto.classList.add("text-danger");
            messageCrearProducto.innerText = result.message;
        }

        btnCrear.removeAttribute("disabled");
        spinner.classList.add("d-none");
        statusButtonCrear.innerText = "Crear";
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un error al crear el producto.");
    }
});
