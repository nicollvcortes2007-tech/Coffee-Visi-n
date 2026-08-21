document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GUARDAR Y VALIDAR CAMPOS OBLIGATORIOS ---
    const botonGuardar = document.querySelector('.btn-save');
    const formularioPerfil = document.querySelector('.profile-form');

    if (botonGuardar && formularioPerfil) {
        botonGuardar.addEventListener('click', (evento) => {
            evento.preventDefault(); // Evita que la página se recargue

            // Seleccionar únicamente la pestaña activa para validar sus campos
            const seccionActiva = formularioPerfil.querySelector('.tab-pane.active-pane');
            const campos = seccionActiva ? seccionActiva.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]') : [];
            
            let hayCamposVacios = false;
            let primerCampoVacio = null;

            // Revisar cada campo de la pestaña visible
            campos.forEach(campo => {
                if (campo.value.trim() === '') {
                    campo.style.borderColor = '#e53e3e'; // Marca el borde en rojo
                    hayCamposVacios = true;
                    if (!primerCampoVacio) primerCampoVacio = campo;
                } else {
                    campo.style.borderColor = '#2e7d32'; // Marca el borde en verde si está correcto
                }
            });

            // Bloquear el guardado si falta información
            if (hayCamposVacios) {
                alert('¡Todos los campos de esta sección son obligatorios!');
                if (primerCampoVacio) primerCampoVacio.focus();
                return; // Se detiene aquí y NO guarda
            }

            // Si los datos son válidos, actualizar los textos estáticos
            const campoNombres = document.querySelector('#nombres');
            const campoApellidos = document.querySelector('#apellidos');
            
            if (campoNombres && campoApellidos) {
                const nombreCompleto = `${campoNombres.value.trim()} ${campoApellidos.value.trim()}`;
                
                // Actualizar en la tarjeta lateral
                const tituloResumen = document.querySelector('.profile-summary h3');
                if (tituloResumen) tituloResumen.textContent = nombreCompleto;

                // Actualizar en el menú superior
                const textoMenuEncabezado = document.querySelector('.user-info-text strong');
                if (textoMenuEncabezado) textoMenuEncabezado.textContent = nombreCompleto;
            }

            alert('¡Información actualizada con éxito!');
        });
    }

    // --- 2. CAMBIO DE PESTAÑAS PERFIL (INFORMACIÓN, SEGURIDAD, NOTIFICACIONES, ACTIVIDAD) ---
    const enlacesPestanasPerfil = document.querySelectorAll('.profile-form .form-tabs a');
    const seccionesPestanas = document.querySelectorAll('.tab-pane');

    if (enlacesPestanasPerfil.length > 0) {
        enlacesPestanasPerfil.forEach(enlace => {
            enlace.addEventListener('click', (evento) => {
                evento.preventDefault();

                // Desactivar todas las pestañas y ocultar las secciones
                enlacesPestanasPerfil.forEach(p => p.classList.remove('active-tab'));
                seccionesPestanas.forEach(s => s.classList.remove('active-pane'));

                // Activar la pestaña seleccionada
                enlace.classList.add('active-tab');

                // Mostrar la sección correspondiente según el atributo data-tab
                const identificadorSeccion = enlace.getAttribute('data-tab');
                const seccionDestino = document.getElementById(identificadorSeccion);
                if (seccionDestino) {
                    seccionDestino.classList.add('active-pane');
                }
            });
        });
    }

    // --- 3. CAMBIAR Y ELIMINAR FOTO DE PERFIL ---
    const botonEliminarFoto = document.querySelector('.btn-delete');
    const entradaFoto = document.querySelector('.btn-upload input[type="file"]');
    const imagenPerfil = document.querySelector('.avatar-large img');
    const imagenMenuEncabezado = document.querySelector('.user-menu-btn img');

    // Subir nueva foto
    if (entradaFoto) {
        entradaFoto.addEventListener('change', (evento) => {
            const archivo = evento.target.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = (e) => {
                    if (imagenPerfil) imagenPerfil.src = e.target.result;
                    if (imagenMenuEncabezado) imagenMenuEncabezado.src = e.target.result;
                };
                lector.readAsDataURL(archivo);
            }
        });
    }

    // Eliminar foto actual
    if (botonEliminarFoto) {
        botonEliminarFoto.addEventListener('click', () => {
            const fotoPorDefecto = 'Imagenes/persona.jpg';
            if (imagenPerfil) imagenPerfil.src = fotoPorDefecto;
            if (imagenMenuEncabezado) imagenMenuEncabezado.src = fotoPorDefecto;
        });
    }

    // --- 4. BOTÓN CANCELAR ---
    const botonCancelar = document.querySelector('.btn-cancel');
    if (botonCancelar && formularioPerfil) {
        botonCancelar.addEventListener('click', () => {
            formularioPerfil.reset();
            const campos = formularioPerfil.querySelectorAll('input');
            campos.forEach(campo => campo.style.borderColor = '');
        });
    }

    // --- 5. MENÚ LATERAL (SIDEBAR) ---
    const opcionesMenuLateral = document.querySelectorAll('.sidebar-nav a');
    opcionesMenuLateral.forEach(opcion => {
        opcion.addEventListener('click', function() {
            opcionesMenuLateral.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 6. CAMBIO DE COLOR EN LOS BORDES AL ESCRIBIR ---
    const todosLosCampos = document.querySelectorAll('.profile-form input');
    todosLosCampos.forEach(campo => {
        campo.addEventListener('keyup', () => {
            if (campo.value.trim() !== '') {
                campo.style.borderColor = '#2e7d32'; // Verde al escribir
            } else {
                campo.style.borderColor = '#e53e3e'; // Rojo si borra todo
            }
        });
    });

    // --- 7. FILTRO PARA MANTENER SOLO NÚMEROS EN TELÉFONO ---
    const campoTelefono = document.querySelector('#telefono');
    if (campoTelefono) {
        campoTelefono.addEventListener('keyup', () => {
            campoTelefono.value = campoTelefono.value.replace(/[^0-9+ ]/g, '');
        });
    }

    // --- 8. MÓDULO DE NOTIFICACIONES ---
    const listaNotificaciones = document.querySelector('.notifications-list');
    const itemsNotificacion = document.querySelectorAll('.notification-item');
    const botonesMarcarLeida = document.querySelectorAll('.btn-action-notif');
    const insigniasContador = document.querySelectorAll('.badge, .badge-top');
    const pestanasNotificaciones = document.querySelectorAll('.notifications-container .form-tabs a');

    // Recalcular contadores dinámicos
    function actualizarContadores() {
        const totalNoLeidas = document.querySelectorAll('.notification-item.unread').length;
        const totalTodas = document.querySelectorAll('.notification-item').length;

        // Actualizar número en insignias (Sidebar y Encabezado)
        insigniasContador.forEach(badge => {
            badge.textContent = totalNoLeidas;
            badge.style.display = totalNoLeidas > 0 ? 'inline-block' : 'none';
        });

        // Actualizar texto de las pestañas de notificaciones
        pestanasNotificaciones.forEach(p => {
            const texto = p.textContent.toLowerCase();
            if (texto.includes('todas')) p.textContent = `Todas (${totalTodas})`;
            if (texto.includes('no leídas')) p.textContent = `No leídas (${totalNoLeidas})`;
        });
    }

    // Acción marcar como leída (✓)
    botonesMarcarLeida.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = boton.closest('.notification-item');
            
            if (item && item.classList.contains('unread')) {
                item.classList.remove('unread');
                
                // Ocultar el botón suavemente
                boton.style.transition = 'opacity 0.2s ease';
                boton.style.opacity = '0';
                setTimeout(() => boton.remove(), 200);

                actualizarContadores();

                // Si está en la pestaña "No leídas", ocultar el elemento marcado
                const pestañaActiva = document.querySelector('.notifications-container .form-tabs a.active-tab');
                if (pestañaActiva && pestañaActiva.textContent.toLowerCase().includes('no leídas')) {
                    item.style.display = 'none';
                    verificarEstadoVacio();
                }
            }
        });
    });

    // Interactividad y filtrado de pestañas
    pestanasNotificaciones.forEach(pestaña => {
        pestaña.addEventListener('click', (e) => {
            e.preventDefault();

            // Cambiar pestaña activa
            pestanasNotificaciones.forEach(tab => tab.classList.remove('active-tab'));
            pestaña.classList.add('active-tab');

            const filtro = pestaña.textContent.trim().toLowerCase();

            itemsNotificacion.forEach(item => {
                const esNoLeida = item.classList.contains('unread');
                const esCritica = item.classList.contains('critical');
                const textoHtml = item.innerHTML.toLowerCase();

                // Lógica de filtrado por categoría
                if (filtro.includes('todas')) {
                    item.style.display = 'flex';
                } 
                else if (filtro.includes('no leídas')) {
                    item.style.display = esNoLeida ? 'flex' : 'none';
                } 
                else if (filtro.includes('críticas')) {
                    item.style.display = esCritica ? 'flex' : 'none';
                } 
                else if (filtro.includes('alertas de cultivo')) {
                    const esAlertaCultivo = textoHtml.includes('plaga') || 
                                           textoHtml.includes('roya') || 
                                           textoHtml.includes('lluvias') || 
                                           textoHtml.includes('fertilización');
                    item.style.display = esAlertaCultivo ? 'flex' : 'none';
                }
            });

            verificarEstadoVacio();
        });
    });

    // Mostrar mensaje si no hay notificaciones en el filtro
    function verificarEstadoVacio() {
        if (!listaNotificaciones) return;

        let mensajeVacio = document.getElementById('mensaje-vacio');
        const visibles = Array.from(itemsNotificacion).filter(item => item.style.display !== 'none');

        if (visibles.length === 0) {
            if (!mensajeVacio) {
                mensajeVacio = document.createElement('li');
                mensajeVacio.id = 'mensaje-vacio';
                mensajeVacio.style.cssText = 'text-align: center; padding: 2rem; color: #666; font-style: italic; list-style: none;';
                mensajeVacio.textContent = 'No hay notificaciones disponibles en esta categoría.';
                listaNotificaciones.appendChild(mensajeVacio);
            }
        } else if (mensajeVacio) {
            mensajeVacio.remove();
        }
    }

    // Inicializar contadores al cargar la página
    actualizarContadores();
});