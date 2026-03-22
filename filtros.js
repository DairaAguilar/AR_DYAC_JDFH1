const video = document.getElementById('videoInput');
const canvas = document.getElementById('videoCanvas');
const ctx = canvas.getContext('2d');

const blurInput = document.getElementById('blur');
const contrastInput = document.getElementById('contrast');
const brightnessInput = document.getElementById('brightness');
const resetBtn = document.getElementById('resetFilters');

// Función para resetear
function resetFilters() {
    blurInput.value = 0;
    contrastInput.value = 100;
    brightnessInput.value = 100;
}

function renderFrame() {
    if (video.readyState >= 2) {
        if (canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }

        ctx.filter = `
            blur(${blurInput.value}px) 
            contrast(${contrastInput.value}%) 
            brightness(${brightnessInput.value}%)
        `;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(renderFrame);
}

function changeVideo(newSrc, element) {
    // RESETEAR FILTROS AL CAMBIAR VIDEO
    resetFilters();

    console.log("Cambiando a:", newSrc);
    video.src = newSrc;
    video.load();
    
    video.play().catch(e => console.log("Error al reproducir video: ", e));

    document.querySelectorAll('.btn-equipo').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    renderFrame();
});

resetBtn.addEventListener('click', resetFilters);

// Autoplay inicial 
window.addEventListener('click', () => {
    if (video.paused) video.play();
}, { once: true });