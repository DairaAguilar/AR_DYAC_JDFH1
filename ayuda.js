const tutoriales = {
    'video-escanner': {
        title: 'Escáner AR',
        src: 'tutorial/MANUAL_AR.mp4',
        pasos: [
            { txt: "Enfoca la camara de tu dispositivo a una distancia congruente para enfocar cualquiera de las siguientes banderas.", img: "tutorial/BANDERAS.png" },
            { txt: "Escanea la bandera de tu elección.", img: "tutorial/AR.png" },
            { txt: "Posteriormente, si el escaneo fue correcto, aparecerá un modelo representando a un jugador del correspondiente país que representa la bandera.", img: "tutorial/AR7.png" }, //Agregar nueva imagen de modelo
            { txt: "En caso de que desees que el personaje baile, presiona el botón de texto Animar.", img: "tutorial/AR2.png" },
            { txt: "De caso contrario si quieres ver confetti en señal de celebración, presiona el botón de texto Celebrar.", img: "tutorial/AR3.png" },
            { txt: "Para ver una breve descripción del país escaneado, presiona el botón de texto Info.", img: "tutorial/AR4.png" },
            { txt: "Por ultimo, tambien es posible contestar la trivia del país escaneado presionando el botón de trivia.", img: "tutorial/AR5.png" },
            { txt: "Si deseas escanear otra imagen, presiona el botón de Actualizar.", img: "tutorial/AR6.png" } 
        ]
    },
    'video-trivias': {
        title: 'Manual de Trivias',
        src: 'tutorial/TRIVIA_TUTO.mp4',
        pasos: [
            { txt: "Selecciona la trivia, presionando la bandera del respectivo país del que quieras responder.", img: "tutorial/trivia.png" },
            { txt: "Cada trivia cuenta con diez preguntas, al responderlas poco a poco se hirá llenando una barra de progreso hasta terminar la trivia.", img: "tutorial/trivia2.png" },
            { txt: "Al final de la trivia se mostrarán las respuestas correctas e incorrectas, asi como un mensaje de felicitación o de animos dependiendo la calificación optenida.", img: "tutorial/trivia3.png" },
        ]
    },
    'video-filtros': {
        title: 'Manual de Filtros',
        src: 'tutorial/MANUAL_FILTROS.mp4',
        pasos: [
            { txt: "Al entrar a la sección de filtros se verá un video predeterminado, mismo que el usuario puede cambiar seleccionando cualquier país presente en la lista de banderas, cada video mostrado será de alguna jugada o gol importante de su respectiva selección.", img: "tutorial/filtro.png" },
            { txt: "Sobre el video hay una consola con tres filtros distintos, cada filtro tendra efecto dependiendo que tanto se llene su barra", img: "tutorial/filtro2.png" },
            { txt: "En la esquina inferior derecha del video puede presionar el boton de texto pausa para detener la reproducción del video, y volverlo a presionar para retomarlo.", img: "tutorial/FiltroPausa.png" }
        ]
    },
    'video-partidos': {
        title: 'Manual de Partidos',
        src: 'tutorial/MANUAL_MAPA.mp4',
        pasos: [
            { txt: "El usuario puede observar un mapa con todas las sedes resalatadas del proximo mundial, para ver mejor los detalles se debe presionar la sede de su elección.", img: "tutorial/mapa.png" },
            { txt: "Dentro del apartado de cada país hay un listado de horarios con los proximos partidos que se llevaran a cabo en la respectiva sede.", img: "tutorial/Mapa2.png" },
            { txt: "Al final de cada página hay una fotografia del estadio sede.", img: "tutorial/Estadio.png" }
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

    container.innerHTML = data.pasos.map(p => `
        <div class="paso-item">
            <img src="${p.img}" onerror="this.src='https://via.placeholder.com/600x400/252550/FFD65C?text=Paso+Imagen'">
            <p>${p.txt}</p>
        </div>
    `).join('');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
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

