document.addEventListener("DOMContentLoaded", () => {
    var logoutBtn = document.querySelector(".logout");
    var downloadBtn = document.querySelector(".report-download");
    var menuLinks = document.querySelectorAll(".menu a");

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            var confirmar = confirm("¿Estás segura de que deseas cerrar sesión?");
            if (confirmar) {
                console.log("Sesión finalizada");
            }
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            console.log("Descargando reporte Excel de Coffee+visión");
        });
    }

    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                menuLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
});