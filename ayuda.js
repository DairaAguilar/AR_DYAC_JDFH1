const tutoriales = {
    'video-escanner': {
        title: 'Escáner AR',
        src: 'tutorial/MANUAL_AR.mp4',
        pasos: [
            { txt: "Paso 1: Selecciona una bandera, solo acepta las que se muestran en esta imagen.", img: "tutorial/BANDERAS.png" },
            { txt: "Paso 2: Escanea una imagen con la camara.", img: "tutorial/AR.png" },
            { txt: "Paso 3: Si quieres que baile o deje de bailar, presiona el botón de ANIMAR.", img: "tutorial/AR2.png" },
            { txt: "Paso 4: Si quieres ver confetti, da click al botón celebrar.", img: "tutorial/AR3.png" },
            { txt: "Paso 5: Presiona el botón de INFO, para ver información del PAIS.", img: "tutorial/AR4.png" }
        ]
    },
     'video-trivias': {
        title: 'Manual de Trivias',
        src: 'tutorial/MANUAL_TRIIVIA.mp4',
        pasos: [
            { txt: "Slecciona la trivia.", img: "tutorial/trivia.png" },
            { txt: "Haz click en las respuestas.", img: "tutorial/trivia2.png" },
            { txt: "Observa el resultado.", img: "tutorial/trivia3.png" },
            { txt: "Selecciona volver, para poder contestar otra trivia.", img: "tutorial/trivia3.png" }
        ]
    },
    'video-filtros': {
        title: 'Manual de Filtros',
        src: 'tutorial/MANUAL_FILTROS.mp4',
        pasos: [
            { txt: "Slecciona el video.", img: "tutorial/filtro.png" },
            { txt: "Modifica los filtro.", img: "tutorial/filtro2.png" },
            { txt: "Disfruta de los videos.", img: "tutorial/filtro3.png" }
        ]
    },
    'video-partidos': {
        title: 'Manual de Partidos',
        src: 'tutorial/MANUAL_MAPA.mp4',
        pasos: [
            { txt: "Selecciona un sede.", img: "tutorial/mapa.png" },
            { txt: "Observa los partidos que se llevaran a cabo en los diferentes estadios.", img: "tutorial/mapa2.png" }
        ]
    }
};

function openModal(tipo) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('tutorialVideo');
    const title = document.getElementById('modalTitle');
    const container = document.getElementById('instruccionesEscritas');
    
    const data = tutoriales[tipo];
    title.innerText = data.title;
    video.src = data.src;

    // Generar las tarjetas de pasos
    container.innerHTML = data.pasos.map(p => `
        <div class="paso-item">
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/600x400/252550/FFD65C?text=Paso+Imagen'">
            <p>${p.txt}</p>
        </div>
    `).join('');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Evita que el fondo se mueva
    video.play();
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('tutorialVideo');
    video.pause();
    video.src = "";
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Devuelve el scroll
}

// Cerrar si tocan fuera del contenido
window.onclick = (e) => {
    if (e.target.id === 'videoModal') closeModal();
};

