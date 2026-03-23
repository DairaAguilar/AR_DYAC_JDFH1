
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        const scoreEl = document.getElementById('scoreVal');
        const modal = document.getElementById('gameModal');

        const imgPortero = new Image(); imgPortero.src = 'img/portero.png';
        const imgBalon = new Image(); imgBalon.src = 'img/balon.png';

        let ready = false, score = 0, isShooting = false;
        let ballX = 200, ballY = 440, ballVX = 0, ballVY = -12;
        let goalieX = 150, goalieY = 60, goalieWidth = 90, goalieHeight = 80, goalieDir = 3.5;

        imgPortero.onload = imgBalon.onload = () => ready = true;

        function handleAtajada() {
            isShooting = "paused";
            score = 0; scoreEl.innerText = "0";
            modal.classList.add('active');
            setTimeout(() => { modal.classList.remove('active'); resetBall(); }, 1200);
        }

        function resetBall() { ballX = 200; ballY = 440; ballVX = 0; isShooting = false; }

        function update() {
            if(!ready) return;
            goalieX += goalieDir;
            if(goalieX > 375 - goalieWidth || goalieX < 25) goalieDir *= -1;

            if(isShooting === true) {
                ballY += ballVY; ballX += ballVX;
                if(ballY < (goalieY + goalieHeight) && ballY > goalieY) {
                    if(ballX > goalieX && ballX < (goalieX + goalieWidth)) handleAtajada();
                }
                if(ballY < 40) {
                    if(ballX > 50 && ballX < 350) { score++; scoreEl.innerText = score; }
                    resetBall();
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 5;
            ctx.strokeRect(15, 15, 370, 470); // Borde interno
            ctx.strokeRect(100, 15, 200, 80); // Portería
            
            if(ready) {
                ctx.drawImage(imgPortero, goalieX, goalieY, goalieWidth, goalieHeight);
                ctx.drawImage(imgBalon, ballX - 35/2, ballY - 35/2, 35, 35);
            }
            update();
            requestAnimationFrame(draw);
        }

        canvas.onmousedown = (e) => {
            if(isShooting) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
            const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
            if(mouseY < ballY) {
                isShooting = true;
                ballVX = ((mouseX - ballX) / (ballY - mouseY)) * 8;
            }
        };

        draw();
   