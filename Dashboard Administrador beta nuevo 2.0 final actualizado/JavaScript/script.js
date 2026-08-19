// Inicialización del script ejecutable una vez cargado el DOM
document.addEventListener("DOMContentLoaded", () => {
  
  // Renderizado dinámico de los iconos SVG de Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Lógica básica para simulación del formulario (Prevención del envio por defecto)
  const form = document.querySelector(".user-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Demostración: Usuario procesado correctamente en el sistema.");
      form.reset();
    });
  }
});