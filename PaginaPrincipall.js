document.addEventListener('DOMContentLoaded', () => {
    const btnEncuentrame = document.getElementById('btnEncuentrame');

    if (btnEncuentrame) {
        btnEncuentrame.addEventListener('click', () => {
            window.location.href = "lector.html";
        });
    }

    console.log("Página de Tigresin lista. El menú se carga desde menu.js");
});

document.addEventListener('DOMContentLoaded', () => {
    const btnNariz = document.getElementById('btn-nariz');

    if (btnNariz) {
        btnNariz.addEventListener('click', () => {
            window.location.href = "ayuda.html";
        });
    }
});