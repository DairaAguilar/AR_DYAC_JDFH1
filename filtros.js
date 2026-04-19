const video = document.getElementById('videoInput');
const canvas = document.getElementById('videoCanvas');
const ctx = canvas.getContext('2d');

const blurInput = document.getElementById('blur');
const pixelInput = document.getElementById('pixelation'); 
const saturateInput = document.getElementById('saturate'); 
const resetBtn = document.getElementById('resetFilters');
const playPauseBtn = document.getElementById('playPauseBtn');

let isPlaying = true;

function resetFilters() {
    blurInput.value = 0;
    pixelInput.value = 1;    
    saturateInput.value = 100;  
}


function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = 'Pausa';
        isPlaying = true;
    } else {
        video.pause();
        playPauseBtn.innerHTML = 'Play';
        isPlaying = false;
    }
}

function updatePlayPauseButton() {
    if (video.paused) {
        playPauseBtn.innerHTML = 'Play';
        isPlaying = false;
    } else {
        playPauseBtn.innerHTML = 'Pausa';
        isPlaying = true;
    }
}

function renderFrame() {
    if (video.readyState >= 2) {

        if (canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.filter = `
            blur(${blurInput.value}px) 
            saturate(${saturateInput.value}%)
        `;

        const p = parseFloat(pixelInput.value);

        if (p > 1) {
            const sw = canvas.width / p;
            const sh = canvas.height / p;
            
            ctx.drawImage(video, 0, 0, sw, sh);
            
            ctx.imageSmoothingEnabled = false;
            
            ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, canvas.width, canvas.height);
            
            ctx.imageSmoothingEnabled = true;
        } else {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
    }
    
    requestAnimationFrame(renderFrame);
}

function changeVideo(newSrc, element) {
    resetFilters();

    console.log("Cambiando video de equipo a:", newSrc);
    
    const wasPlaying = !video.paused;
    
    video.src = newSrc;
    video.load();
    
    if (wasPlaying) {
        video.play().catch(e => console.log("Error al reproducir video: ", e));
        playPauseBtn.innerHTML = 'Pausa';
        isPlaying = true;
    } else {
        playPauseBtn.innerHTML = 'Play';
        isPlaying = false;
    }

    document.querySelectorAll('.btn-equipo').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
}

video.addEventListener('loadedmetadata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    renderFrame();
});

video.addEventListener('play', updatePlayPauseButton);
video.addEventListener('pause', updatePlayPauseButton);

resetBtn.addEventListener('click', resetFilters);
playPauseBtn.addEventListener('click', togglePlayPause);

video.play().catch(e => console.log("Auto-play bloqueado: ", e));