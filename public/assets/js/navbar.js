let token = localStorage.getItem("token");
let linkCrudProductos = document.getElementById("linkCrudProductos");
let linkLogin = document.getElementById("linkLogin");
let linkRegistro = document.getElementById("linkRegistro");
let linkLogout = document.getElementById("linkLogout");
let linkPerfil = document.getElementById("linkPerfil");
let linkMonitorUsuarios = document.getElementById("linkMonitorUsuarios");
let navbarBrand = document.getElementById("navbarBrand");

if (token) {
    linkLogin.style.display = "none";
    linkRegistro.style.display = "none";
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    navbarBrand.innerText = usuario.email;
    if (usuario.admin) {
        linkCrudProductos.style.display = "block";
        linkMonitorUsuarios.style.display = "block";
    }
} else {
    linkLogout.style.display = "none";
    linkPerfil.style.display = "none";
}

//  lógica logout

linkLogout.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.clear();
    location.href = "/";
});

const manejadorSendToken = (ruta) => {
    try {
        if (token) {
            location.href = `${ruta}?token=${token}`
        } else {
            alert("no existe un token para continuar a la ruta.")
        }
        
    } catch (error) {
        alert("Error al intentar entrar a una ruta protegida, debe existir un token.");
    }

}
linkCrudProductos.addEventListener("click", (event) => {
    event.preventDefault();
    manejadorSendToken(linkCrudProductos.dataset.ruta);

});
linkPerfil.addEventListener("click", (event) => {
    event.preventDefault();
    manejadorSendToken(linkPerfil.dataset.ruta);
});

linkMonitorUsuarios.addEventListener("click", (event) => {
    event.preventDefault();
    manejadorSendToken(linkMonitorUsuarios.dataset.ruta);
});
