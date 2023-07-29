let formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        let data = new FormData(formLogin);

        let response = await fetch("/api/usuarios/login", {
            method: "post",
            body: data,
        });

        let result = await response.json();

        if (result.code == 200) {
            alert(result.message);
            localStorage.setItem("token", result.token);
            localStorage.setItem("usuario", JSON.stringify(result.usuario));
            location.href = "/";
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Error en proceso de login.");
    }
});
