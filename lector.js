document.addEventListener('DOMContentLoaded', () => {

  const sceneEl = document.querySelector('#ar-scene');
  const textureLoader = new THREE.TextureLoader();
  const loadingOverlay = document.getElementById('loading-overlay');
  
  let botonActual = null;
  let botonInfo = null;
  let panelInfo = null;
  let botonConfetti = null;
  let botonActualizar = null;

  let isChanging = false;
  
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
    
    
    const loader = new THREE.GLTFLoader();
    const modeloUrl = esAnimado ? './modelos/jugador_animado3.glb' : './modelos/jugador_base5.glb';
    
    loader.load(modeloUrl, async (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);  
      model.position.set(0, -0.5, 0);   
     
      await aplicarTexturasTHREE(model, equipo.bodyTex, equipo.headTex);
      
      scene.add(model);
      
      let mixer = null;
      if (esAnimado && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
   
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
  
  async function cambiarAModoAnimado() {
    if (!equipoActual) return;
    if (isChanging) return;
    
    isChanging = true;  
    
    try {
        eliminarModeloPantalla();
        const resultado = await crearModeloEnPantalla(equipoActual, true);
        
        if (resultado) {
            modeloPantallaEntity = resultado;
            animado = true;
            if (botonActual) botonActual.innerText = "Detener animación";
        }
    } catch (error) {
        console.error("Error al cambiar a modo animado:", error);
    } finally {
        isChanging = false; 
    }
}

async function cambiarAModoBase() {
    if (!equipoActual) return;
    if (isChanging) return;
    
    isChanging = true;  
    
    try {
        eliminarModeloPantalla();
        const resultado = await crearModeloEnPantalla(equipoActual, false);
        
        if (resultado) {
            modeloPantallaEntity = resultado;
            animado = false;
            if (botonActual) botonActual.innerText = "Animar";
        }
    } catch (error) {
        console.error("Error al cambiar a modo base:", error);
    } finally {
        isChanging = false;  
    }
}
  
 function refrescarEscena() {
    eliminarModeloPantalla();
    equipoActual = null;
    animado = false;
 
    setCustomScannerVisible(true);

    const nombreJugador = document.getElementById('nombre-jugador');
    if (nombreJugador) nombreJugador.remove();
 
    const contenedorModelo = document.getElementById('modelo-pantalla-contenedor');
    if (contenedorModelo) contenedorModelo.remove();
   
    if (botonActual) { botonActual.remove(); botonActual = null; }
    if (botonInfo) { botonInfo.remove(); botonInfo = null; }
    if (panelInfo) { panelInfo.remove(); panelInfo = null; }
    if (botonConfetti) { botonConfetti.remove(); botonConfetti = null; }
    if (botonTrivia) { botonTrivia.remove(); botonTrivia = null; }
 
    const mensaje = document.createElement('div');
    mensaje.id = 'mensaje-actualizacion';
    mensaje.innerText = 'Listo para escanear otra bandera';
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
      bodyTex: "./modelos/texturas/ARGELIA.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇩🇿 ¡Campeones de África! La selección de Argelia ha ganado 2 Copas Africanas de Naciones (1990 y 2019). Su jugador más emblemático es Riyad Mahrez, y su capital es Argel."
    },
    { 
      name: "ARABIA", 
      player: "AL-DAWSARI", 
      bodyTex: "./modelos/texturas/ARABIA.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇸🇦 ¡Los Halcones Verdes! Arabia Saudita tiene 3 títulos de la Copa Asiática (1984, 1988 y 1996). En 2022 logró una de las mayores sorpresas al vencer 2-1 a la campeona Argentina [citation:3][citation:5]."
    },
    { 
      name: "ARGENTINA", 
      player: "LIONEL MESSI", 
      bodyTex: "./modelos/texturas/ARGENTINA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇦🇷 ¡La Albiceleste es tricampeona del mundo! Ganó los Mundiales de 1978, 1986 y 2022. Con Leo Messi a la cabeza, también tiene 16 Copas América, siendo el rey de Sudamérica [citation:2]."
    },
    { 
      name: "AUSTRALIA", 
      player: "KOUL", 
      bodyTex: "./modelos/texturas/AUSTRALIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇦🇺 ¡Los Socceroos! Australia ha ganado la Copa de las Naciones de la OFC 4 veces y la Copa Asiática 1 vez (2015). Son el equipo que ha saltado de confederación (Oceanía a Asia) para buscar mayores retos [citation:2]."
    },
    { 
      name: "AUSTRIA", 
      player: "ALMAUTOVIK", 
      bodyTex: "./modelos/texturas/AUSTRIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇦🇹 ¡Wunderteam! Austria logró su mejor puesto en un Mundial en 1954, alcanzando las semifinales y quedando en tercer lugar. Su capital, Viena, es una de las más musicales del mundo."
    },
    { 
      name: "BELGICA", 
      player: "DE BRUYNE", 
      bodyTex: "./modelos/texturas/BELGICA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇧🇪 ¡Los Diablos Rojos! Bélgica fue la revelación en Rusia 2018, logrando el tercer lugar. Su 'Generación Dorada' encabezada por De Bruyne y Courtois es histórica [citation:8]."
    },
    { 
      name: "BRASIL", 
      player: "NEYMAR JR", 
      bodyTex: "./modelos/texturas/BRASIL.webp", 
      headTex: "./modelos/texturas/Cara_IV.webp",
      info: "🇧🇷 ¡El pentacampeón! Brasil es la selección más ganadora del mundo con 5 Copas del Mundo (1958, 1962, 1970, 1994, 2002). Son los reyes del fútbol, aunque una curiosidad es que nunca han podido vencer a Noruega [citation:1][citation:2]."
    },
    { 
      name: "CANADA", 
      player: "DAVIES", 
      bodyTex: "./modelos/texturas/CANADA.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇨🇦 ¡La Hoja de Maple! Canadá es uno de los anfitriones del Mundial 2026. Ha ganado 2 Copas de Oro de la Concacaf (1985 y 2000). Su estrella Alphonso Davies es el más rápido del mundo."
    },
    { 
      name: "COLOMBIA", 
      player: "JAMES RODRIGUEZ", 
      bodyTex: "./modelos/texturas/COLOMBIA.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇨🇴 ¡Los Cafeteros! Colombia logró su mejor participación en Brasil 2014 llegando a cuartos de final, donde James Rodríguez fue el goleador del torneo con 6 goles."
    },
    { 
      name: "COSTA DE MARFIL", 
      player: "HALLER", 
      bodyTex: "./modelos/texturas/COSTADEMARFIL.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇨🇮 ¡Los Elefantes! Son los actuales campeones de África, ganando su tercera Copa Africana de Naciones en 2023. Figuras como Didier Drogba los hicieron famosos [citation:4][citation:6]."
    },
    { 
      name: "CROACIA", 
      player: "JAMES", 
      bodyTex: "./modelos/texturas/CROACIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇭🇷 ¡Vatreni! La selección más guerrera. Fue subcampeona del Mundo en 2018 y tercera en 2022. A pesar de tener solo 4 millones de habitantes, son un gigante del fútbol."
    },
    { 
      name: "CURAZAO", 
      player: "MARTIN", 
      bodyTex: "./modelos/texturas/CURAZAO.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇨🇼 ¡La Familia Azul! Aunque no ha ido a un Mundial absoluto, tienen un dato curioso: es el país más pequeño (en población) que ha logrado hazañas en la CONCACAF [citation:1]."
    },
    { 
      name: "ECUADOR", 
      player: "ENNER VALENCIA", 
      bodyTex: "./modelos/texturas/ECUADOR.webp", 
      headTex: "./modelos/texturas/Cara_IV.webp",
      info: "🇪🇨 ¡La Tricolor! Ecuador fue el último país de Sudamérica en debutar en un Mundial (2002). Su mejor participación fue en Alemania 2006, llegando a octavos de final [citation:1]."
    },
    { 
      name: "EGIPTO", 
      player: "SALAH", 
      bodyTex: "./modelos/texturas/EGIPTO.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇪🇬 ¡Los Faraones! Egipto es el rey de África con 7 Copas Africanas de Naciones. Con Mohamed Salah como estrella, buscan dejar huella en los Mundiales [citation:2]."
    },
    { 
      name: "ESCOCIA", 
      player: "ROBERTSON", 
      bodyTex: "./modelos/texturas/ESCOCIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 ¡La legendaria Escocia! Son conocidos por ser la única selección que venció a Inglaterra cuando estos eran campeones del mundo (1967). Su capitán es Andy Robertson del Liverpool."
    },
    { 
      name: "ESPAÑA", 
      player: "RODRII", 
      bodyTex: "./modelos/texturas/ESPAÑA.webp", 
      headTex: "./modelos/texturas/Cara_II.webp",
      info: "🇪🇸 ¡La Furia Roja! España es campeona del mundo (2010) y tiene 4 títulos de la Eurocopa (1964, 2008, 2012, 2024). Su época de oro con el 'tiki-taka' revolucionó el fútbol [citation:2]."
    },
    { 
      name: "EUA", 
      player: "PULISIC", 
      bodyTex: "./modelos/texturas/EUA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇺🇸 ¡Las Barras y las Estrellas! EE.UU. es potencia en la Concacaf con 7 Copas de Oro. Anfitrión del Mundial 2026, su mejor puesto histórico fue el tercer lugar en el primer Mundial de 1930 [citation:2]."
    },
    { 
      name: "FRANCIA", 
      player: "MBAPPÉ", 
      bodyTex: "./modelos/texturas/FRANCIA.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇫🇷 ¡Les Bleus! Francia es bicampeona del mundo (1998 y 2018) y fue finalista en 2022. Tienen una de las canteras más ricas del planeta, con Kylian Mbappé como máxima estrella [citation:2]."
    },
     { 
      name: "GHANA", 
      player: "AYEW", 
      bodyTex: "./modelos/texturas/GHANA.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇬🇭 ¡Black Stars! Ghana es la única selección africana que ha llegado a cuartos de final en un Mundial (2010). Fueron campeones africanos 4 veces [citation:1][citation:2]."
    },
    
    { 
      name: "GERMANIA", 
      player: "MÜLLER", 
      bodyTex: "./modelos/texturas/ALEMANIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇩🇪 ¡La Maquinaria Alemana! Son tetracampeones del mundo (1954, 1974, 1990, 2014). El legendario Miroslav Klose es el máximo goleador histórico de los Mundiales con 16 goles [citation:1][citation:2]."
    },
   
    { 
      name: "HAITI", 
      player: "NAZON", 
      bodyTex: "./modelos/texturas/HAITI.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇭🇹 ¡Los Granaderos! Haití fue el primer país caribeño en clasificar a un Mundial (1974). En ese torneo, le metieron un susto a la poderosa Italia de la época."
    },
    { 
      name: "INGLATERRA", 
      player: "KANE", 
      bodyTex: "./modelos/texturas/INGLATERRA.webp", 
      headTex: "./modelos/texturas/Cara_IV.webp",
      info: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 ¡Los Tres Leones! La cuna del fútbol fue campeona del mundo en 1966 en su casa, Wembley. Con Harry Kane, buscan repetir la hazaña 60 años después."
    },
    { 
      name: "ISLAS DEL CABOVERDE", 
      player: "RODRIGUES", 
      bodyTex: "./modelos/texturas/CABOVERDE.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇨🇻 ¡Los Tiburones Azules! Cabo Verde ha sorprendido al mundo llegando a cuartos de final de la Copa Africana. Son la revelación africana de los últimos años."
    },
    { 
      name: "JAPON", 
      player: "MINAMINO", 
      bodyTex: "./modelos/texturas/JAPAN.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇯🇵 ¡Samurái Blue! Japón es el país asiático con más títulos de la Copa Asiática (4). Son famosos por su disciplina y por derrotar a potencias como Alemania y España en 2022 [citation:1][citation:2]."
    },
    { 
      name: "JORDANIA", 
      player: "AL-TAMARI", 
      bodyTex: "./modelos/texturas/JORDANIA.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇯🇴 ¡Los Nashama! Jordania ha crecido enormemente, alcanzando la final de la Copa Asiática 2023. Son un equipo en constante evolución en Asia."
    },
    { 
      name: "KOREA", 
      player: "TAREMI", 
      bodyTex: "./modelos/texturas/KOREA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇰🇷 ¡Tigres de Asia! Corea del Sur es la selección asiática más exitosa en Mundiales, logrando el histórico cuarto lugar en 2002. Su estrella es Son Heung-min."
    },
    { 
      name: "MARRUECOS", 
      player: "HAKIMI", 
      bodyTex: "./modelos/texturas/MARRUECOS.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇲🇦 ¡Los Leones del Atlas! Marruecos hizo historia al ser la primera selección africana y árabe en llegar a las semifinales de un Mundial (Catar 2022) [citation:2]."
    },
    { 
      name: "MEXICO", 
      player: "SANTI GIMENEZ", 
      bodyTex: "./modelos/texturas/MEXICO.webp", 
      headTex: "./modelos/texturas/Cara_II.webp",
      info: "🇲🇽 ¡El Tricampeón de la Concacaf! México es el gigante de Norteamérica con 14 Copas de Oro. Hará historia al ser sede de 3 Mundiales (1970, 1986 y 2026) [citation:1][citation:2]."
    },
    { 
      name: "NORUEGA", 
      player: "HAALAND", 
      bodyTex: "./modelos/texturas/NORUEGA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇳🇴 Los Vikingos! Aunque no son los máximos ganadores, tienen un dato honorífico: son el único equipo invicto contra Brasil (nunca han perdido ante la pentacampeona) [citation:1]."
    },
    { 
      name: "NUEVA ZELANDA", 
      player: "WOOD", 
      bodyTex: "./modelos/texturas/NUEVAZELANDA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇳🇿 ¡All Whites! Nueva Zelanda es el gigante de Oceanía, con 5 títulos de la Copa de las Naciones de la OFC. Clasificó a los Mundiales de 1982 y 2010 [citation:2]."
    },
    { 
      name: "PAISES BAJOS", 
      player: "VAN DIJK", 
      bodyTex: "./modelos/texturas/PAISESBAJOS.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇳🇱 ¡La Naranja Mecánica! Países Bajos tiene una de las historias más tristes del fútbol: han sido 3 veces subcampeones del mundo (1974, 1978, 2010). Su estilo 'fútbol total' es legendario [citation:2]."
    },
    { 
      name: "PANAMA", 
      player: "PEREZ", 
      bodyTex: "./modelos/texturas/PANAMA.webp", 
      headTex: "./modelos/texturas/Cara_IV.webp",
      info: "🇵🇦 ¡Los Canaleros! Panamá hizo historia al clasificar por primera vez a un Mundial en 2018. Su gol ante Inglaterra fue un momento histórico para el país."
    },
    { 
      name: "PARAGUAY", 
      player: "VALDEZ", 
      bodyTex: "./modelos/texturas/PARAGUAY.webp", 
      headTex: "./modelos/texturas/Cara_II.webp",
      info: "🇵🇾 ¡La Albirroja! Paraguay fue cuartofinalista en el Mundial de 2010. Es uno de los equipos más 'picantes' de Sudamérica, con 2 Copas América en su haber [citation:2]."
    },
    { 
      name: "PORTUGAL", 
      player: "RUIPATRICIO", 
      bodyTex: "./modelos/texturas/PORTUGAL.webp", 
      headTex: "./modelos/texturas/Cara_II.webp",
      info: "🇵🇹 ¡Las Quinas! Portugal es campeón de Europa (2016) y tiene en su haber la Nations League. Antes de Cristiano Ronaldo, solo habían ido a 3 Mundiales; con él, han ido a 6 consecutivos [citation:1][citation:2]."
    },
    { 
      name: "QATAR", 
      player: "AL-HAYDOS", 
      bodyTex: "./modelos/texturas/QATAR.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇶🇦 ¡Los Anfitriones! Catar es el actual campeón de Asia (2019 y 2023). Fue sede del memorable Mundial de 2022, donde Messi finalmente levantó la copa."
    },
    { 
      name: "REPUBLICA DE IRAN", 
      player: "AZMOUN", 
      bodyTex: "./modelos/texturas/IRAN.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇮🇷 ¡Team Melli! Irán es una potencia asiática con 3 Copas Asiáticas. Es conocida por tener una defensa férrea y por ser uno de los equipos más difíciles de vencer en Asia."
    },
    { 
      name: "SENEGAL", 
      player: "MANE", 
      bodyTex: "./modelos/texturas/SENEGAL.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇸🇳 ¡Los Leones de la Teranga! Senegal es el campeón de África 2021. Son famosos por eliminar a Francia en el Mundial de 2002 y por su portero Édouard Mendy [citation:1][citation:2]."
    },
    { 
      name: "SUDAFRICA", 
      player: "MOKOENA", 
      bodyTex: "./modelos/texturas/SUDAFRICA.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇿🇦 ¡Bafana Bafana! Sudáfrica fue la primera nación africana en organizar un Mundial (2010). Su recuerdo más vívido es el sonido de las vuvuzelas y el gol de Tshabalala [citation:2]."
    },
    { 
      name: "SUIZA", 
      player: "XHAKA", 
      bodyTex: "./modelos/texturas/SUIZA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇨🇭 ¡La Nati! Suiza tiene un récord único en la historia: en el Mundial de 2006 no recibió ni un solo gol en todo el torneo, aunque quedaron eliminados en penales [citation:1]."
    },
    { 
      name: "TUNEZ", 
      player: "MSAKNI", 
      bodyTex: "./modelos/texturas/TUNEZ.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇹🇳 ¡Las Águilas de Cartago! Túnez fue el primer país africano en ganar un partido de Mundial (1978). Son los eternos aspirantes en África."
    },
    { 
      name: "URUGUAY", 
      player: "SUAREZ", 
      bodyTex: "./modelos/texturas/URUGUAY.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇺🇾 ¡La Celeste! Uruguay ganó el PRIMER Mundial de la historia en 1930 y lo repitió en 1950 (Maracanazo). Con 15 Copas América, son los reyes de América del Sur [citation:2]."
    },
    { 
      name: "UZBEKISTAN", 
      player: "SHOMURODOV", 
      bodyTex: "./modelos/texturas/UZBEKISTAN.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇺🇿 ¡Los Lobos Blancos! Uzbekistán es la selección revelación de Asia. Aún no han ido a un Mundial, pero son los actuales campeones del fútbol asiático juvenil."
    },
    { 
      name: "ALBANIA", 
      player: "BROJA", 
      bodyTex: "./modelos/texturas/ALBANIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇦🇱 ¡Las Águilas! Albania sorprendió al mundo al clasificar a la Eurocopa 2016. Son un equipo que ha creído en su potencial y lucha contra los gigantes europeos."
    },
    { 
      name: "BOLIVIA", 
      player: "MIGUEL TERCEROS", 
      bodyTex: "./modelos/texturas/BOLIVIA.webp", 
      headTex: "./modelos/texturas/Cara_I.webp",
      info: "🇧🇴 ¡La Verde! Bolivia fue campeón de América en 1963 jugando en su altiplanicie. Son conocidos por jugar en el estadio más alto del mundo (más de 3,600 metros), lo que la hace imbatible de local [citation:2]."
    },
    { 
      name: "HONDURAS", 
      player: "LUIS PALMA", 
      bodyTex: "./modelos/texturas/HONDURAS.webp", 
      headTex: "./modelos/texturas/Cara_V.webp",
      info: "🇭🇳 ¡Los Catrachos! Honduras ha participado en 3 Mundiales (1982, 2010, 2014). Es una selección guerrera que siempre pelea cada partido en la eliminatoria de la Concacaf."
    },
    { 
      name: "MALI", 
      player: "BISSOUMA", 
      bodyTex: "./modelos/texturas/MALI.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇲🇱 ¡Las Águilas! Malí es una de las potencias emergentes de África. Han sido subcampeones de África y tienen una generación dorada liderada por Yves Bissouma."
    },
    { 
      name: "OMAN", 
      player: "AL-YAHYAEI", 
      bodyTex: "./modelos/texturas/OMAN.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇴🇲 Los Rojos! Omán es un clásico de la Copa del Golfo, siendo campeones en 2009 y 2017. Buscan dar el salto a la élite del fútbol asiático."
    },
    { 
      name: "REPUBLICA DOMINICANA DEL CONGO", 
      player: "WISSA", 
      bodyTex: "./modelos/texturas/RDCONGO.webp", 
      headTex: "./modelos/texturas/Cara_III.webp",
      info: "🇨🇩 ¡Los Leopardos! La RD Congo fue la primera selección africana en clasificar a un Mundial (1974 como Zaire). Son dos veces campeones de África [citation:2]."
    }
  ];
  
  equipos.forEach((equipo, index) => {

    const targetEntity = document.createElement('a-entity');
    targetEntity.setAttribute('mindar-image-target', `targetIndex: ${index}`);

    const contentHolder = document.createElement('a-entity');
    contentHolder.setAttribute('position', '0 0 0.01');
    targetEntity.appendChild(contentHolder);

    targetEntity.addEventListener("targetFound", async () => {
      
      if (modeloPantallaEntity) return;
      
          setCustomScannerVisible(false);
      equipoActual = equipo;
      
      const resultado = await crearModeloEnPantalla(equipo, false);
      if (resultado) {
        modeloPantallaEntity = resultado;
      }
      
     
if (!botonActual) {
    botonActual = document.createElement('button');
    botonActual.className = 'animate-btn';
    botonActual.innerText = 'Animar';
    
    botonActual.onclick = async () => {
        if (isChanging) {
            console.log("Espera a que termine...");
            return;
        }
        if (!equipoActual) return;
        
        if (!animado) {
            await cambiarAModoAnimado();
        } else {
            await cambiarAModoBase();
        }
    };
    
    document.body.appendChild(botonActual);
}

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

      if (!botonConfetti) {
        botonConfetti = document.createElement("button");
        botonConfetti.innerText = "Celebrar";
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

      if (!botonTrivia) {
        botonTrivia = document.createElement("button");
        botonTrivia.innerText = "Jugar Trivia";
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
  if (typeof abrirTriviaModal === 'function') {
    const paisId = idMap[equipo.name.toUpperCase()] || equipo.name.substring(0, 3).toUpperCase();
    abrirTriviaModal(paisId, equipo.name);
  } else {
    console.error("Función abrirTriviaModal no encontrada");
  }
};
        
        document.body.appendChild(botonTrivia);
      }
      if (!botonActualizar) {
        botonActualizar = document.createElement("button");
        botonActualizar.innerText = "Actualizar";
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
      console.log("Bandera perdida, pero modelo permanece");
    });

    sceneEl.appendChild(targetEntity);

  });

});