document.addEventListener('DOMContentLoaded', () => {

            // Navegación Activa
            const navLinks = document.querySelectorAll('#main-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('activo'));
                    link.classList.add('activo');
                });
            });

            // Modales Dinámicos
            const modal = document.getElementById('modal-dinamico');
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            const closeModalBtn = document.getElementById('close-modal-btn');

            const abrirModal = (titulo, contenido) => {
                modalTitle.textContent = titulo;
                modalBody.innerHTML = contenido;
                modal.style.display = 'flex';
            };

            closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
            window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

            // Eventos de Mapa
            document.querySelectorAll('.btn-mapa').forEach(btn => {
                btn.addEventListener('click', () => {
                    abrirModal('Ubicación Georreferenciada — Lote Principal', `
                        <p><strong>Coordenadas:</strong> 2°27'48" N, 76°36'06" W</p>
                        <p>Popayán, Cauca. Altitud óptima calculada a 1,738 m s.n.m.</p>
                        <section class="map-simulation-box">
                            <i class="fa-solid fa-map-location-dot"></i>
                            <span>[Simulación del Mapa Satelital de Caficultura]</span>
                        </section>
                    `);
                });
            });

            // Eventos de Gestión/Edición
            document.querySelectorAll('.btn-editar, .btn-gestionar').forEach(btn => {
                btn.addEventListener('click', () => {
                    abrirModal('Configuración del Lote Principal', `
                        <form id="edit-form" onsubmit="event.preventDefault(); alert('Cambios guardados localmente.');">
                            <label class="form-label"><strong>Variedad de Café:</strong></label>
                            <input type="text" value="Caturra / Castillo" class="form-input">
                            <label class="form-label"><strong>Área del lote (Hectáreas):</strong></label>
                            <input type="number" step="0.1" value="4.5" class="form-input">
                            <label class="form-label"><strong>Tipo de suelo:</strong></label>
                            <input type="text" value="Franco-arcilloso" class="form-input">
                            <button type="submit" class="form-submit-btn">Actualizar Datos del Lote</button>
                        </form>
                    `);
                });
            });

            // Eventos de Recomendaciones Técnicas
            let pendingCount = 4;
            const counterElement = document.getElementById('pending-counter');

            document.querySelectorAll('.btn-rec, .btn-rec-full').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const card = e.target.closest('li');
                    const tituloRec = card.querySelector('h4').textContent;

                    abrirModal(`Detalle Técnico: ${tituloRec}`, `
                        <p>${card.querySelector('p').textContent}</p>
                        <button id="btn-marcar-leido" class="action-success-btn">
                            <i class="fa-solid fa-check"></i> Marcar como atendida
                        </button>
                    `);

                    document.getElementById('btn-marcar-leido').addEventListener('click', () => {
                        card.classList.add('rec-atendida');
                        btn.disabled = true;
                        btn.textContent = "Atendida";
                        if (pendingCount > 0) {
                            pendingCount--;
                            counterElement.textContent = `${pendingCount} ${pendingCount === 1 ? 'pendiente' : 'pendientes'}`;
                            if(pendingCount === 0) counterElement.classList.add('counter-resolved');
                        }
                        modal.style.display = 'none';
                    });
                });
            });

            // Clic en Ciclo Fenológico
            const faseDescripcion = document.getElementById('fase-descripcion');
            document.querySelectorAll('#timeline-list li').forEach(fase => {
                fase.addEventListener('click', () => {
                    document.querySelectorAll('#timeline-list li').forEach(f => f.classList.remove('fase-seleccionada'));
                    fase.classList.add('fase-seleccionada');
                    faseDescripcion.textContent = fase.dataset.desc || 'Sin información adicional para esta fase.';
                });
            });

            // Filtros de Actividad
            const filtroBtns = document.querySelectorAll('.filtro-btn');
            const activityItems = document.querySelectorAll('#activity-list li');
            filtroBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filtroBtns.forEach(b => b.classList.remove('activo'));
                    btn.classList.add('activo');
                    const filtro = btn.dataset.filtro;
                    activityItems.forEach(item => {
                        const coincide = filtro === 'todas' || item.dataset.categoria === filtro;
                        item.style.display = coincide ? '' : 'none';
                    });
                });
            });

            // Historial Incremental
            const btnHistorial = document.getElementById('btn-historial');
            btnHistorial.addEventListener('click', () => {
                const nuevosItems = `
                    <li data-categoria="suelo">
                        <time datetime="2026-05-02">2 May 2026</time>
                        <strong>Muestreo de Suelos</strong>
                        <p>Análisis de pH en laboratorio: 5.4 (Óptimo para café)</p>
                    </li>
                    <li data-categoria="riego">
                        <time datetime="2026-04-18">18 Abr 2026</time>
                        <strong>Limpieza de Canales de Drenaje</strong>
                        <p>Preparación preventiva ante aumento de lluvias regionales</p>
                    </li>`;
                document.getElementById('activity-list').insertAdjacentHTML('beforeend', nuevosItems);
                btnHistorial.disabled = true;
                btnHistorial.textContent = "Todo el historial cargado";
            });

            // Efecto GPS
            const gpsBadge = document.getElementById('gps-badge');
            gpsBadge.addEventListener('click', () => {
                const coordBox = document.getElementById('coordinates-text');
                gpsBadge.textContent = "Actualizando...";
                setTimeout(() => {
                    gpsBadge.textContent = "GPS Activo";
                    coordBox.classList.add('highlight-text');
                    setTimeout(() => coordBox.classList.remove('highlight-text'), 1000);
                }, 800);
            });
        });