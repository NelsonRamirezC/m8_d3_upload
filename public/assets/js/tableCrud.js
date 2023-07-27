let btnsDelete = document.querySelectorAll(".tableCrud .btnDelete");

btnsDelete.forEach(buttonDelete => {
    buttonDelete.addEventListener("click", async (event) => {
        let id = buttonDelete.dataset.id;
        console.log(id);

        try {
            let confirmacion = confirm(`Desea eliminar el producto con id: ${id}?`)
            if (!confirmacion) return
            
            let response = await fetch(`/api/productos/${id}`, {
                method: "delete"
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
    })
})