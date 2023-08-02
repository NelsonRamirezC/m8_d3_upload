let formAddProducto = document.getElementById("formAddProducto");
let btnCrear = document.getElementById("btnCrear");
let btnCrearLoading = document.getElementById("btnCrearLoading");
let messageCrearProducto = document.querySelector(".messageCrearProducto");

formAddProducto.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        btnCrear.classList.toggle("d-none");
        btnCrearLoading.classList.toggle("d-none");

        let data = new FormData(formAddProducto);

        const myHeaders = new Headers();
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

            btnCrear.classList.toggle("d-none");
            btnCrearLoading.classList.toggle("d-none");
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            messageCrearProducto.classList.remove("text-success");
            messageCrearProducto.classList.add("text-danger");
            messageCrearProducto.innerText = result.message;
        }

    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un error al crear el producto.");
    }
});
