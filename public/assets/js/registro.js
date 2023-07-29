let formRegistro = document.getElementById("formRegistro");

formRegistro.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        let data = new FormData(formRegistro);
        if (data.get("password") != data.get("replyPassword")) {
            document.getElementById("labelReplyPassword").innerText =
                "Password no coincide.";
            return;
        }

        let response = await fetch("/api/usuarios", {
            method: "post",
            body: data,
        });

        let result = await response.json();

        if (result.code == 201) {
            alert(result.message);
            location.href = "/login";
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Error al realizar el registro de usuario.");
    }
});
