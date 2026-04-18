document.addEventListener('DOMContentLoaded', () => {

  const sceneEl = document.querySelector('#ar-scene');
  const textureLoader = new THREE.TextureLoader();
  const loadingOverlay = document.getElementById('loading-overlay');
  
  let botonActual = null;
  let botonInfo = null;
  let panelInfo = null;
  let botonConfetti = null;
  let botonActualizar = null;
  
  let modeloPantalla = null;
  let modeloPantallaEntity = null;
  let animado = false;
  let equipoActual = null;
  let contenidoHolderGlobal = null;

  sceneEl.addEventListener("arReady", (event) => {
    console.log("MindAR está listo");
    loadingOverlay.style.opacity = "0";
    setTimeout(() => {
      loadingOverlay.style.display = "none";
    }, 500);
  });

  sceneEl.addEventListener("arError", (event) => {
    console.error("Error en AR", event);
    const p = loadingOverlay.querySelector('p');
    if(p) p.innerText = "Error al acceder a la cámara.";
  });

  const mostrarCargando = (ver) => {
    let loader = document.getElementById('loading-screen');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'loading-screen';
      loader.innerHTML = '<p>Cargando modelo...</p>';
      loader.setAttribute('style', 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(26,26,58,0.9); color:#FFD65C; padding:15px 25px; border-radius:10px; font-family:sans-serif; z-index:9999; border: 2px solid #FFD65C;');
      document.body.appendChild(loader);
    }
    loader.style.display = ver ? 'block' : 'none';
  };

function limpiarElementosResiduales() {
    const nombreJugador = document.getElementById('nombre-jugador');
    if (nombreJugador) nombreJugador.remove();
    
    const contenedorModelo = document.getElementById('modelo-pantalla-contenedor');
    if (contenedorModelo) contenedorModelo.remove();
    
    setCustomScannerVisible(true);
}

limpiarElementosResiduales();

function setCustomScannerVisible(visible) {
    const overlay = document.getElementById('custom-scanner-overlay');
    if (overlay) {
        if (visible) {
            overlay.classList.remove('hidden');
            overlay.style.display = 'flex';
        } else {
            overlay.classList.add('hidden');
            overlay.style.display = 'none';
        }
    }
}

setCustomScannerVisible(true);

 function crearModeloEnPantalla(equipo, esAnimado = false) {
  return new Promise((resolve) => {
    mostrarCargando(true);
    
    const contenedorPantalla = document.createElement('div');
    contenedorPantalla.id = 'modelo-pantalla-contenedor';
    contenedorPantalla.style.position = 'fixed';
    contenedorPantalla.style.bottom = '30%';
    contenedorPantalla.style.left = '50%';
    contenedorPantalla.style.transform = 'translateX(-50%)';
    contenedorPantalla.style.width = '700px';  
    contenedorPantalla.style.height = '700px';   
    contenedorPantalla.style.zIndex = '1002';
    contenedorPantalla.style.pointerEvents = 'none';
    document.body.appendChild(contenedorPantalla);
    

  const nombreJugador = document.createElement('div');
  nombreJugador.id = 'nombre-jugador';
  nombreJugador.innerText = equipo.player;
  nombreJugador.style.position = 'fixed';
  nombreJugador.style.bottom = '20%';    
  nombreJugador.style.left = '50%';
  nombreJugador.style.transform = 'translateX(-50%)';
  nombreJugador.style.color = '#FFD65C';
  nombreJugador.style.fontSize = '24px';   
  nombreJugador.style.fontWeight = 'bold';
  nombreJugador.style.fontFamily = 'Arial, sans-serif';
  nombreJugador.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
  nombreJugador.style.backgroundColor = 'rgba(26,26,58,0.85)';
  nombreJugador.style.padding = '6px 20px';  
  nombreJugador.style.borderRadius = '40px';
  nombreJugador.style.border = '2px solid #FFD65C';
  nombreJugador.style.zIndex = '1003';
  nombreJugador.style.whiteSpace = 'nowrap';
  nombreJugador.style.textAlign = 'center';
  document.body.appendChild(nombreJugador);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(700, 700);  
    renderer.setClearColor(0x000000, 0);
    contenedorPantalla.appendChild(renderer.domElement);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 1.5, 3.5); 
    camera.lookAt(0, 1, 0);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 2, 1);
    scene.add(directionalLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 1, -1);
    scene.add(backLight);
    
    // Cargar modelo GLB
    const loader = new THREE.GLTFLoader();
    const modeloUrl = esAnimado ? './modelos/jugador_animado2.glb' : './modelos/jugador_base2.glb';
    
    loader.load(modeloUrl, async (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);  // ← TU ESCALA
      model.position.set(0, -0.5, 0);   // ← AJUSTADO para que no se corte abajo
      
      // Aplicar texturas
      await aplicarTexturasTHREE(model, equipo.bodyTex, equipo.headTex);
      
      scene.add(model);
      
      // Animación si es necesario
      let mixer = null;
      if (esAnimado && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
      
      // Función de animación
      let lastTime = 0;
      function animate() {
        requestAnimationFrame(animate);
        const now = performance.now();
        const delta = Math.min(1/30, (now - lastTime) / 1000);
        lastTime = now;
        
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
      }
      animate();
      
      mostrarCargando(false);
      resolve({ model, mixer, renderer, contenedor: contenedorPantalla });
    }, undefined, (error) => {
      console.error('Error cargando modelo:', error);
      mostrarCargando(false);
      resolve(null);
    });
  });
}

  // Función para aplicar texturas a un modelo THREE.js
  async function aplicarTexturasTHREE(model, bodyTex, headTex) {
    const bodyTexture = await cargarTextura(bodyTex);
    const headTexture = await cargarTextura(headTex);
    
    model.traverse(node => {
      if (node.isMesh) {
        if (node.material && node.material.name === "SHD_Body") {
          node.material.map = bodyTexture;
          node.material.needsUpdate = true;
        }
        if (node.material && node.material.name === "SHD_Head") {
          node.material.map = headTexture;
          node.material.needsUpdate = true;
        }
      }
    });
  }
  
  function cargarTextura(src) {
    return new Promise((resolve) => {
      textureLoader.load(src, tex => {
        tex.flipY = false;
        resolve(tex);
      });
    });
  }
  
  // Función para eliminar modelo de pantalla
  function eliminarModeloPantalla() {
    if (modeloPantallaEntity) {
      if (modeloPantallaEntity.contenedor) {
        modeloPantallaEntity.contenedor.remove();
      }
      if (modeloPantallaEntity.renderer) {
        modeloPantallaEntity.renderer.dispose();
      }
      modeloPantallaEntity = null;
    }
    modeloPantalla = null;
  }
  
  // Función para cambiar a modo animado en el modelo de pantalla
  async function cambiarAModoAnimado() {
    if (!equipoActual) return;
    
    eliminarModeloPantalla();
    
    const resultado = await crearModeloEnPantalla(equipoActual, true);
    if (resultado) {
      modeloPantallaEntity = resultado;
      animado = true;
      if (botonActual) botonActual.innerText = "Detener animación";
    }
  }

  async function cambiarAModoBase() {
    if (!equipoActual) return;
    
    eliminarModeloPantalla();
    
    const resultado = await crearModeloEnPantalla(equipoActual, false);
    if (resultado) {
      modeloPantallaEntity = resultado;
      animado = false;
      if (botonActual) botonActual.innerText = "Animar";
    }
  }
  
 function refrescarEscena() {
    eliminarModeloPantalla();
    equipoActual = null;
    animado = false;
    
    // MOSTRAR nuestro scanner personalizado nuevamente
    setCustomScannerVisible(true);
    
    // Eliminar nombre del jugador
    const nombreJugador = document.getElementById('nombre-jugador');
    if (nombreJugador) nombreJugador.remove();
    
    // Eliminar contenedor del modelo
    const contenedorModelo = document.getElementById('modelo-pantalla-contenedor');
    if (contenedorModelo) contenedorModelo.remove();
    
    // Limpiar botones
    if (botonActual) { botonActual.remove(); botonActual = null; }
    if (botonInfo) { botonInfo.remove(); botonInfo = null; }
    if (panelInfo) { panelInfo.remove(); panelInfo = null; }
    if (botonConfetti) { botonConfetti.remove(); botonConfetti = null; }
    if (botonTrivia) { botonTrivia.remove(); botonTrivia = null; }
    
    // Mostrar mensaje
    const mensaje = document.createElement('div');
    mensaje.id = 'mensaje-actualizacion';
    mensaje.innerText = '✅ Listo para escanear otra bandera';
    mensaje.style.position = 'fixed';
    mensaje.style.bottom = '20px';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)';
    mensaje.style.backgroundColor = '#FFD65C';
    mensaje.style.color = '#1A1A3A';
    mensaje.style.padding = '10px 20px';
    mensaje.style.borderRadius = '10px';
    mensaje.style.fontWeight = 'bold';
    mensaje.style.zIndex = '1003';
    document.body.appendChild(mensaje);
    
    setTimeout(() => mensaje.remove(), 2000);
}
  
  let botonTrivia = null;

  const equipos = [
    { 
      name: "ARGELIA", 
      player: "MAHREZ", 
      bodyTex: "./modelos/texturas/ARGELIA.png", 
      bodyTexAnim: "./modelos/texturas/ARGELIA.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Argelia ganó la Copa Africana de Naciones en 1990 y 2019. Su capital es Argel."
    },
    { 
      name: "ARABIA", 
      player: "AL-DAWSARI", 
      bodyTex: "./modelos/texturas/ARABIA.png", 
      bodyTexAnim: "./modelos/texturas/ARABIA.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Arabia Saudita ha ganado la Copa Asiática en 3 ocasiones. Su capital es Riad."
    },
    { 
      name: "ARGENTINA", 
      player: "LIONEL MESSI", 
      bodyTex: "./modelos/texturas/ARGENTINA.png", 
      bodyTexAnim: "./modelos/texturas/ARGENTINA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Argentina ganó el Mundial en 1978, 1986 y 2022. Su capital es Buenos Aires."
    },
    { 
      name: "AUSTRALIA", 
      player: "KOUL", 
      bodyTex: "./modelos/texturas/AUSTRALIA.png", 
      bodyTexAnim: "./modelos/texturas/AUSTRALIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Australia ganó la Copa Asiática en 2015 y 4 Copas de Oceanía. Su capital es Canberra."
    },
    { 
      name: "AUSTRIA", 
      player: "ALMAUTOVIK", 
      bodyTex: "./modelos/texturas/AUSTRIA.png", 
      bodyTexAnim: "./modelos/texturas/AUSTRIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Austria logró el tercer lugar en el Mundial de 1954. Su capital es Viena."
    },
    { 
      name: "BELGICA", 
      player: "DE BRUYNE", 
      bodyTex: "./modelos/texturas/BELGICA.png", 
      bodyTexAnim: "./modelos/texturas/BELGICA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Bélgica obtuvo el tercer lugar en el Mundial de Rusia 2018. Su capital es Bruselas."
    },
    { 
      name: "BRASIL", 
      player: "NEYMAR JR", 
      bodyTex: "./modelos/texturas/BRASIL.png", 
      bodyTexAnim: "./modelos/texturas/BRASIL.png", 
      headTex: "./modelos/texturas/Cara_IV.png",
      info: "Brasil es el único pentacampeón del mundo (1958, 1962, 1970, 1994, 2002). Su capital es Brasilia."
    },
    { 
      name: "CANADA", 
      player: "DAVIES", 
      bodyTex: "./modelos/texturas/CANADA.png", 
      bodyTexAnim: "./modelos/texturas/CANADA.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Canadá ganó la Copa de Oro de la Concacaf en 1985 y 2000. Su capital es Ottawa."
    },
    { 
      name: "COLOMBIA", 
      player: "JAMES RODRIGUEZ", 
      bodyTex: "./modelos/texturas/COLOMBIA.png", 
      bodyTexAnim: "./modelos/texturas/COLOMBIA.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Colombia fue campeona de la Copa América en el año 2001. Su capital es Bogotá."
    },
    { 
      name: "COSTA DE MARFIL", 
      player: "HALLER", 
      bodyTex: "./modelos/texturas/COSTADEMARFIL.png", 
      bodyTexAnim: "./modelos/texturas/COSTADEMARFIL.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Costa de Marfil ha ganado la Copa Africana en 1992, 2015 y 2023. Su capital es Yamusukro."
    },
    { 
      name: "CROACIA", 
      player: "JAMES", 
      bodyTex: "./modelos/texturas/CROACIA.png", 
      bodyTexAnim: "./modelos/texturas/CROACIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Croacia fue subcampeona del mundo en 2018 y tercera en 1998 y 2022. Su capital es Zagreb."
    },
    { 
      name: "CURAZAO", 
      player: "MARTIN", 
      bodyTex: "./modelos/texturas/CURAZAO.png", 
      bodyTexAnim: "./modelos/texturas/CURAZAO.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Curazao ganó la Copa del Caribe en 2017. Su capital es Willemstad."
    },
    { 
      name: "ECUADOR", 
      player: "ENNER VALENCIA", 
      bodyTex: "./modelos/texturas/ECUADOR.png", 
      bodyTexAnim: "./modelos/texturas/ECUADOR.png", 
      headTex: "./modelos/texturas/Cara_IV.png",
      info: "Ecuador ha clasificado a 4 mundiales, destacando Alemania 2006. Su capital es Quito."
    },
    { 
      name: "EGIPTO", 
      player: "SALAH", 
      bodyTex: "./modelos/texturas/EGIPTO.png", 
      bodyTexAnim: "./modelos/texturas/EGIPTO.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Egipto es el máximo ganador de la Copa Africana con 7 títulos. Su capital es El Cairo."
    },
    { 
      name: "ESCOCIA", 
      player: "ROBERTSON", 
      bodyTex: "./modelos/texturas/ESCOCIA.png", 
      bodyTexAnim: "./modelos/texturas/ESCOCIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Escocia disputó el primer partido internacional de la historia en 1872. Su capital es Edimburgo."
    },
    { 
      name: "ESPAÑA", 
      player: "RODRII", 
      bodyTex: "./modelos/texturas/ESPAÑA.png", 
      bodyTexAnim: "./modelos/texturas/ESPAÑA.png", 
      headTex: "./modelos/texturas/Cara_II.jpg",
      info: "España ganó el Mundial en 2010 y las Eurocopas de 1964, 2008, 2012 y 2024. Su capital es Madrid."
    },
    { 
      name: "EUA", 
      player: "PULISIC", 
      bodyTex: "./modelos/texturas/EUA.png", 
      bodyTexAnim: "./modelos/texturas/EUA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "EUA ha ganado 7 veces la Copa de Oro de la Concacaf. Su capital es Washington D.C."
    },
    { 
      name: "FRANCIA", 
      player: "MBAPPÉ", 
      bodyTex: "./modelos/texturas/FRANCIA.png", 
      bodyTexAnim: "./modelos/texturas/FRANCIA.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Francia ganó el Mundial en 1998 y 2018. Su capital es París."
    },
     { 
      name: "GHANA", 
      player: "AYEW", 
      bodyTex: "./modelos/texturas/GHANA.png", 
      bodyTexAnim: "./modelos/texturas/GHANA.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Ghana ha ganado 4 veces la Copa Africana de Naciones. Su capital es Acra."
    },
    
    { 
      name: "GERMANIA", 
      player: "MÜLLER", 
      bodyTex: "./modelos/texturas/ALEMANIA.png", 
      bodyTexAnim: "./modelos/texturas/ALEMANIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Alemania ganó el Mundial en 1954, 1974, 1990 y 2014. Su capital es Berlín."
    },
   
    { 
      name: "HAITI", 
      player: "NAZON", 
      bodyTex: "./modelos/texturas/HAITI.png", 
      bodyTexAnim: "./modelos/texturas/HAITI.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Haití ganó el Campeonato de la Concacaf en 1973. Su capital es Puerto Príncipe."
    },
    { 
      name: "INGLATERRA", 
      player: "KANE", 
      bodyTex: "./modelos/texturas/INGLATERRA.png", 
      bodyTexAnim: "./modelos/texturas/INGLATERRA.png",
      headTex: "./modelos/texturas/Cara_IV.png",
      info: "Inglaterra ganó el Mundial en 1966 organizado en su propio país. Su capital es Londres."
    },
    { 
      name: "ISLAS DEL CABOVERDE", 
      player: "RODRIGUES", 
      bodyTex: "./modelos/texturas/CABOVERDE.png", 
      bodyTexAnim: "./modelos/texturas/CABOVERDE.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Cabo Verde alcanzó los cuartos de final de la Copa Africana en 2013 y 2023. Su capital es Praia."
    },
    { 
      name: "JAPON", 
      player: "MINAMINO", 
      bodyTex: "./modelos/texturas/JAPAN.png", 
      bodyTexAnim: "./modelos/texturas/JAPAN.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Japón es el máximo ganador de la Copa Asiática con 4 títulos. Su capital es Tokio."
    },
    { 
      name: "JORDANIA", 
      player: "AL-TAMARI", 
      bodyTex: "./modelos/texturas/JORDANIA.png", 
      bodyTexAnim: "./modelos/texturas/JORDANIA.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Jordania fue subcampeona de la Copa Asiática en 2023. Su capital es Amán."
    },
    { 
      name: "KOREA", 
      player: "TAREMI", 
      bodyTex: "./modelos/texturas/KOREA.png", 
      bodyTexAnim: "./modelos/texturas/KOREA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Corea del Sur fue semifinalista en el Mundial de 2002. Su capital es Seúl."
    },
    { 
      name: "MARRUECOS", 
      player: "HAKIMI", 
      bodyTex: "./modelos/texturas/MARRUECOS.png", 
      bodyTexAnim: "./modelos/texturas/MARRUECOS.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Marruecos fue el primer país africano en llegar a semis de un Mundial (2022). Su capital es Rabat."
    },
    { 
      name: "MEXICO", 
      player: "SANTI GIMENEZ", 
      bodyTex: "./modelos/texturas/MEXICO.png", 
      bodyTexAnim: "./modelos/texturas/MEXICO.png", 
      headTex: "./modelos/texturas/Cara_II.jpg",
      info: "México ha ganado la Copa de Oro de la Concacaf en 12 ocasiones. Su capital es Ciudad de México."
    },
    { 
      name: "NORUEGA", 
      player: "HAALAND", 
      bodyTex: "./modelos/texturas/NORUEGA.png", 
      bodyTexAnim: "./modelos/texturas/NORUEGA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Noruega ha participado en 3 Copas del Mundo (1938, 1994, 1998). Su capital es Oslo."
    },
    { 
      name: "NUEVA ZELANDA", 
      player: "WOOD", 
      bodyTex: "./modelos/texturas/NUEVAZELANDA.png", 
      bodyTexAnim: "./modelos/texturas/NUEVAZELANDA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Nueva Zelanda ha ganado 5 veces la Copa de Naciones de la OFC. Su capital es Wellington."
    },
    { 
      name: "PAISES BAJOS", 
      player: "VAN DIJK", 
      bodyTex: "./modelos/texturas/PAISESBAJOS.png", 
      bodyTexAnim: "./modelos/texturas/PAISESBAJOS.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Países Bajos ganó la Eurocopa en 1988 y fue 3 veces subcampeón mundial. Su capital es Ámsterdam."
    },
    { 
      name: "PANAMA", 
      player: "PEREZ", 
      bodyTex: "./modelos/texturas/PANAMA.png", 
      bodyTexAnim: "./modelos/texturas/PANAMA.png", 
      headTex: "./modelos/texturas/Cara_IV.png",
      info: "Panamá clasificó a su primer Mundial en Rusia 2018. Su capital es Ciudad de Panamá."
    },
    { 
      name: "PARAGUAY", 
      player: "VALDEZ", 
      bodyTex: "./modelos/texturas/PARAGUAY.png", 
      bodyTexAnim: "./modelos/texturas/PARAGUAY.png", 
      headTex: "./modelos/texturas/Cara_II.jpg",
      info: "Paraguay ganó la Copa América en 1953 y 1979. Su capital es Asunción."
    },
    { 
      name: "PORTUGAL", 
      player: "RUIPATRICIO", 
      bodyTex: "./modelos/texturas/PORTUGAL.png", 
      bodyTexAnim: "./modelos/texturas/PORTUGAL.png", 
      headTex: "./modelos/texturas/Cara_II.jpg",
      info: "Portugal ganó la Eurocopa 2016 y la Nations League 2019. Su capital es Lisboa."
    },
    { 
      name: "QATAR", 
      player: "AL-HAYDOS", 
      bodyTex: "./modelos/texturas/QATAR.png", 
      bodyTexAnim: "./modelos/texturas/QATAR.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Qatar ganó la Copa Asiática de forma consecutiva en 2019 y 2023. Su capital es Doha."
    },
    { 
      name: "REPUBLICA DE IRAN", 
      player: "AZMOUN", 
      bodyTex: "./modelos/texturas/IRAN.png", 
      bodyTexAnim: "./modelos/texturas/IRAN.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Irán ha ganado 3 veces la Copa Asiática de Naciones. Su capital es Teherán."
    },
    { 
      name: "SENEGAL", 
      player: "MANE", 
      bodyTex: "./modelos/texturas/SENEGAL.png", 
      bodyTexAnim: "./modelos/texturas/SENEGAL.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Senegal es el campeón de la Copa Africana de Naciones 2021. Su capital es Dakar."
    },
    { 
      name: "SUDAFRICA", 
      player: "MOKOENA", 
      bodyTex: "./modelos/texturas/SUDAFRICA.png", 
      bodyTexAnim: "./modelos/texturas/SUDAFRICA.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Sudáfrica ganó la Copa Africana en 1996 y organizó el Mundial 2010. Su capital es Pretoria."
    },
    { 
      name: "SUIZA", 
      player: "XHAKA", 
      bodyTex: "./modelos/texturas/SUIZA.png", 
      bodyTexAnim: "./modelos/texturas/SUIZA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Suiza ha llegado a cuartos de final en tres Mundiales. Su capital es Berna."
    },
    { 
      name: "TUNEZ", 
      player: "MSAKNI", 
      bodyTex: "./modelos/texturas/TUNEZ.png", 
      bodyTexAnim: "./modelos/texturas/TUNEZ.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Túnez ganó la Copa Africana de Naciones en 2004. Su capital es Túnez."
    },
    { 
      name: "URUGUAY", 
      player: "SUAREZ", 
      bodyTex: "./modelos/texturas/URUGUAY.png", 
      bodyTexAnim: "./modelos/texturas/URUGUAY.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Uruguay ganó el Mundial en 1930 y 1950, y tiene 15 Copas América. Su capital es Montevideo."
    },
    { 
      name: "UZBEKISTAN", 
      player: "SHOMURODOV", 
      bodyTex: "./modelos/texturas/UZBEKISTAN.png", 
      bodyTexAnim: "./modelos/texturas/UZBEKISTAN.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Uzbekistán ganó los Juegos Asiáticos en 1994. Su capital es Taskent."
    },
    { 
      name: "ALBANIA", 
      player: "BROJA", 
      bodyTex: "./modelos/texturas/ALBANIA.png", 
      bodyTexAnim: "./modelos/texturas/ALBANIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "Tras destacar en la Eurocopa, Albania busca su primera cita mundialista."
    },
    { 
      name: "BOLIVIA", 
      player: "MIGUEL TERCEROS", 
      bodyTex: "./modelos/texturas/BOLIVIA.png", 
      bodyTexAnim: "./modelos/texturas/BOLIVIA.png", 
      headTex: "./modelos/texturas/Cara_I.png",
      info: "La Verde busca aprovechar la altura de El Alto para volver a una cita mundialista."
    },
    { 
      name: "HONDURAS", 
      player: "LUIS PALMA", 
      bodyTex: "./modelos/texturas/HONDURAS.png", 
      bodyTexAnim: "./modelos/texturas/HONDURAS.png", 
      headTex: "./modelos/texturas/Cara_V.png",
      info: "Honduras busca su cuarta participación mundialista en 2026."
    },
    { 
      name: "MALI", 
      player: "BISSOUMA", 
      bodyTex: "./modelos/texturas/MALI.png", 
      bodyTexAnim: "./modelos/texturas/MALI.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Mali busca su histórico debut en un Mundial mayor tras brillar en juveniles."
    },
    { 
      name: "OMAN", 
      player: "AL-YAHYAEI", 
      bodyTex: "./modelos/texturas/OMAN.png", 
      bodyTexAnim: "./modelos/texturas/OMAN.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Una selección asiática en constante crecimiento que busca dar la sorpresa."
    },
    { 
      name: "REPUBLICA DOMINICANA DEL CONGO", 
      player: "WISSA", 
      bodyTex: "./modelos/texturas/RDCONGO.png", 
      bodyTexAnim: "./modelos/texturas/RDCONGO.png", 
      headTex: "./modelos/texturas/Cara_III.png",
      info: "Una de las selecciones más fuertes de África en la actualidad."
    }
  ];

  equipos.forEach((equipo, index) => {

    const targetEntity = document.createElement('a-entity');
    targetEntity.setAttribute('mindar-image-target', `targetIndex: ${index}`);

    const contentHolder = document.createElement('a-entity');
    contentHolder.setAttribute('position', '0 0 0.01');
    targetEntity.appendChild(contentHolder);

    targetEntity.addEventListener("targetFound", async () => {
      
      // Si ya hay un modelo en pantalla, no hacer nada (evitar duplicados)
      if (modeloPantallaEntity) return;
      
          setCustomScannerVisible(false);

      // Guardar equipo actual
      equipoActual = equipo;
      
      // Crear modelo anclado en pantalla (no en AR)
      const resultado = await crearModeloEnPantalla(equipo, false);
      if (resultado) {
        modeloPantallaEntity = resultado;
      }
      
      // Crear botón de animar si no existe
      if (!botonActual) {
        botonActual = document.createElement('button');
        botonActual.className = 'animate-btn';
        botonActual.innerText = 'Animar';
        
        botonActual.onclick = async () => {
          if (!equipoActual) return;
          
          if (!animado) {
            await cambiarAModoAnimado();
          } else {
            await cambiarAModoBase();
          }
        };
        
        document.body.appendChild(botonActual);
      }
      
      // Botón de información
      if (!botonInfo) {
        botonInfo = document.createElement('button');
        botonInfo.className = 'info-btn';
        botonInfo.innerText = 'Info';
        
        botonInfo.onclick = () => {
          if (!panelInfo) {
            panelInfo = document.createElement('div');
            panelInfo.className = 'info-panel';
            panelInfo.innerHTML = `
              <h2>${equipo.name}</h2>
              <p>${equipo.info}</p>
            `;
            document.body.appendChild(panelInfo);
          } else {
            panelInfo.remove();
            panelInfo = null;
          }
        };
        
        document.body.appendChild(botonInfo);
      }
      
      // Botón de confetti
      if (!botonConfetti) {
        botonConfetti = document.createElement("button");
        botonConfetti.innerText = "Celebrar 🎉";
        botonConfetti.className = "confetti-btn";
        
        botonConfetti.onclick = () => {
          window.confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 }
          });
        };
        
        document.body.appendChild(botonConfetti);
      }
      
      // Botón de trivia
      if (!botonTrivia) {
        botonTrivia = document.createElement("button");
        botonTrivia.innerText = "Jugar Trivia ⚽";
        botonTrivia.className = "trivia-btn-ar";
        
        const idMap = { 
          "ALBANIA": "ALB", "ARABIA": "KSA", "ARGELIA": "ALG", "ARGENTINA": "ARG",
          "AUSTRALIA": "AUS", "AUSTRIA": "AUT", "BELGICA": "BEL", "BOLIVIA": "BOL",
          "BRASIL": "BRA", "CANADA": "CAN", "COLOMBIA": "COL", "COSTA DE MARFIL": "CIV",
          "CROACIA": "CRO", "CURAZAO": "CUR", "ECUADOR": "ECU", "EGIPTO": "EGY",
          "ESCOCIA": "SCO", "ESPAÑA": "ESP", "EUA": "USA", "FRANCIA": "FRA",
          "GERMANIA": "ALE", "GHANA": "GHA", "HAITI": "HAI", "HONDURAS": "HON",
          "INGLATERRA": "ING", "ISLAS DEL CABOVERDE": "CPV", "JAPON": "JPN", "JORDANIA": "JOR",
          "KOREA": "KOR", "MALI": "MLI", "MARRUECOS": "MAR", "MEXICO": "MEX",
          "NORUEGA": "NOR", "NUEVA ZELANDA": "NZL", "OMAN": "OMA", "PAISES BAJOS": "NED",
          "PANAMA": "PAN", "PARAGUAY": "PAR", "PORTUGAL": "POR", "QATAR": "QAT",
          "REPUBLICA DOMINICANA DEL CONGO": "COD", "REPUBLICA DE IRAN": "IRN", "SENEGAL": "SEN",
          "SUDAFRICA": "RSA", "SUIZA": "SUI", "TUNEZ": "TUN", "URUGUAY": "URU", "UZBEKISTAN": "UZB"
        };
        
        const paisId = idMap[equipo.name.toUpperCase()] || equipo.name.substring(0, 3).toUpperCase();
        
        botonTrivia.onclick = () => {
  // Usar el modal en lugar de redirigir
  if (typeof abrirTriviaModal === 'function') {
    const paisId = idMap[equipo.name.toUpperCase()] || equipo.name.substring(0, 3).toUpperCase();
    abrirTriviaModal(paisId, equipo.name);
  } else {
    console.error("Función abrirTriviaModal no encontrada");
  }
};
        
        document.body.appendChild(botonTrivia);
      }
      
      // Botón de actualizar
      if (!botonActualizar) {
        botonActualizar = document.createElement("button");
        botonActualizar.innerText = "Actualizar 🔄";
        botonActualizar.className = "confetti-btn";
        botonActualizar.style.right = "auto";
        botonActualizar.style.left = "20px";
        botonActualizar.style.top = "80px";
        botonActualizar.style.bottom = "auto";
        
        botonActualizar.onclick = () => {
          refrescarEscena();
        };
        
        document.body.appendChild(botonActualizar);
      }
      
    });

    targetEntity.addEventListener("targetLost", () => {
      // NO hacemos nada cuando se pierde la bandera
      // El modelo permanece en pantalla
      console.log("Bandera perdida, pero modelo permanece");
    });

    sceneEl.appendChild(targetEntity);

  });

});