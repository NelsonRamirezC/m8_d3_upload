let token = localStorage.getItem("token");
let linkCrudProductos = document.getElementById("linkCrudProductos");
let linkLogin = document.getElementById("linkLogin");
let linkRegistro = document.getElementById("linkRegistro");
let linkLogout = document.getElementById("linkLogout");
let linkPerfil = document.getElementById("linkPerfil");
let navbarBrand = document.getElementById("navbarBrand");

if (token) {
    linkLogin.style.display = "none";
    linkRegistro.style.display = "none";
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    navbarBrand.innerText = usuario.email;
    if (usuario.admin) {
        linkCrudProductos.style.display = "block";
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
