// Selección de elementos del DOM
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreVal');
const modal = document.getElementById('gameModal');

// Carga de imágenes
const imgPortero = new Image(); 
imgPortero.src = 'img/portero.png';
const imgBalon = new Image(); 
imgBalon.src = 'img/balon.png';

// Variables de estado del juego
let ready = false, score = 0, isShooting = false;
let ballX = 200, ballY = 440, ballVX = 0, ballVY = -12;

// Variables del Portero (MODIFICADAS PARA DINAMISMO)
let goalieX = 150, goalieY = 60, goalieWidth = 90, goalieHeight = 80;
let goalieSpeed = 5;      // Velocidad actual (cambiará aleatoriamente)
let goalieDir = 1;        // 1 para derecha, -1 para izquierda
let lastDecisionTime = 0; // Para controlar los cambios de comportamiento

imgPortero.onload = imgBalon.onload = () => ready = true;

function handleAtajada() {
    isShooting = "paused";
    score = 0; 
    scoreEl.innerText = "0";
    modal.classList.add('active');
    setTimeout(() => { 
        modal.classList.remove('active'); 
        resetBall(); 
    }, 1200);
}

function resetBall() { 
    ballX = 200; 
    ballY = 440; 
    ballVX = 0; 
    isShooting = false; 
}

function update() {
    if(!ready) return;

    const currentTime = Date.now();

    // --- LÓGICA DE MOVIMIENTO DINÁMICO DEL PORTERO ---
    // Cada 800 milisegundos, el portero "piensa" un nuevo movimiento
    if (currentTime - lastDecisionTime > 800) {
        // 30% de probabilidad de cambiar de dirección espontáneamente
        if (Math.random() < 0.3) {
            goalieDir *= -1;
        }
        // Velocidad aleatoria entre 4 y 9 para variar el ritmo
        goalieSpeed = 4 + Math.random() * 5;
        
        lastDecisionTime = currentTime;
    }

    // Aplicar movimiento
    goalieX += (goalieSpeed * goalieDir);

    // Rebote en los postes (bordes del canvas)
    if(goalieX + goalieWidth > 385) {
        goalieX = 385 - goalieWidth;
        goalieDir = -1;
    } else if(goalieX < 15) {
        goalieX = 15;
        goalieDir = 1;
    }

    // --- LÓGICA DEL TIRO ---
    if(isShooting === true) {
        ballY += ballVY; 
        ballX += ballVX;

        // Detección de atajada (colisión con el portero)
        if(ballY < (goalieY + goalieHeight) && ballY > goalieY) {
            if(ballX > goalieX && ballX < (goalieX + goalieWidth)) {
                handleAtajada();
            }
        }

        // Detección de Gol o fuera
        if(ballY < 40) {
            // Si entra en el área de la portería (entre x:50 y x:350)
            if(ballX > 50 && ballX < 350) { 
                score++; 
                scoreEl.innerText = score; 
            }
            resetBall();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar campo y portería
    ctx.strokeStyle = "rgba(255,255,255,0.8)"; 
    ctx.lineWidth = 5;
    ctx.strokeRect(15, 15, 370, 470); // Borde interno campo
    ctx.strokeRect(100, 15, 200, 80); // Marco de la portería
    
    if(ready) {
        // Dibujar Portero
        ctx.drawImage(imgPortero, goalieX, goalieY, goalieWidth, goalieHeight);
        // Dibujar Balón
        ctx.drawImage(imgBalon, ballX - 35/2, ballY - 35/2, 35, 35);
    }

    update();
    requestAnimationFrame(draw);
}

// Control del disparo
canvas.onmousedown = (e) => {
    if(isShooting) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Solo dispara si el clic es por delante del balón
    if(mouseY < ballY) {
        isShooting = true;
        // Cálculo de trayectoria
        ballVX = ((mouseX - ballX) / (ballY - mouseY)) * 8;
    }
};

// Iniciar el bucle del juego
draw();