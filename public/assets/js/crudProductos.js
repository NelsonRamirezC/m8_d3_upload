let formAddProducto = document.getElementById("formAddProducto");

formAddProducto.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        let data = new FormData(formAddProducto);

        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            `Bearer ${token}`
        );

        let response = await fetch("/api/productos", {
            method: "POST",
            body: data,
            headers: myHeaders
        });
        
        let result = await response.json();

        if (result.code == 201) {
            alert(result.message);
            location.reload();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Ha ocurrido un error al crear el producto.");
    }
});
