

document.addEventListener('DOMContentLoaded', () => {

  const sceneEl = document.querySelector('#ar-scene');
  const textureLoader = new THREE.TextureLoader();
  const loadingOverlay = document.getElementById('loading-overlay');
  
let botonActual = null;
let botonInfo = null;
let panelInfo = null;
let botonConfetti = null;

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
//EQUIPOS PROVISIONALES/////////////////////////////////////////////////////////
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

  function cargarTextura(src) {
    return new Promise(resolve => {
      textureLoader.load(src, tex => {
        tex.flipY = false;
        resolve(tex);
      });
    });
  }

  async function aplicarTexturas(mesh, bodyTex, headTex) {

    const body = await cargarTextura(bodyTex);
    const head = await cargarTextura(headTex);

    mesh.traverse(node => {

      if (!node.isMesh) return;

      if (node.material.name === "SHD_Body") {
        node.material.map = body;
        node.material.needsUpdate = true;
      }

      if (node.material.name === "SHD_Head") {
        node.material.map = head;
        node.material.needsUpdate = true;
      }

    });
  }

  // BOTÓN CONFETTI GLOBAL 
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

  equipos.forEach((equipo, index) => {

    const targetEntity = document.createElement('a-entity');
    targetEntity.setAttribute('mindar-image-target', `targetIndex: ${index}`);

    const contentHolder = document.createElement('a-entity');
    contentHolder.setAttribute('position', '0 0 0.01');
    targetEntity.appendChild(contentHolder);

    let modeloActual = null;
    let animado = false;

    const textEl = document.createElement('a-text');
    textEl.setAttribute('value', equipo.player);
    textEl.setAttribute('color', '#FFD65C');
    textEl.setAttribute('align', 'center');
    textEl.setAttribute('width', '3');
    textEl.setAttribute('position', '0 -0.12 0.1');

    contentHolder.appendChild(textEl);

    function crearModeloBase() {
      mostrarCargando(true); // Mostrar mensaje
      const modelEl = document.createElement('a-gltf-model');

      modelEl.setAttribute('src', '#jugador-base');
      modelEl.setAttribute('scale', '0.5 0.5 0.5');
      modelEl.setAttribute('material', 'side: double');
      modelEl.setAttribute('visible', 'false');

      modelEl.addEventListener("model-loaded", async () => {
        await aplicarTexturas(
          modelEl.getObject3D('mesh'),
          equipo.bodyTex,
          equipo.headTex
        );
        modelEl.setAttribute('visible', 'true');
        mostrarCargando(false); // Ocultar al terminar
      });

      contentHolder.appendChild(modelEl);
      modeloActual = modelEl;
    }

    function crearModeloAnimado() {
      mostrarCargando(true); // Mostrar mensaje
      const animatedModel = document.createElement('a-gltf-model');

      animatedModel.setAttribute('src', '#jugador-animado');
      animatedModel.setAttribute('scale', '0.5 0.5 0.5');
      animatedModel.setAttribute('position', '0 0 0.01');
      animatedModel.setAttribute('animation-mixer', 'clip: *; loop: repeat');
      animatedModel.setAttribute('material', 'side: double');
      animatedModel.setAttribute('visible', 'false');

      animatedModel.addEventListener("model-loaded", async () => {
        await aplicarTexturas(
          animatedModel.getObject3D('mesh'),
          equipo.bodyTexAnim || equipo.bodyTex,
          equipo.headTex
        );
        animatedModel.setAttribute('visible', 'true');
        mostrarCargando(false); // Ocultar al terminar
      });

      contentHolder.appendChild(animatedModel);
      modeloActual = animatedModel;
    }

    targetEntity.addEventListener("targetFound", () => {

      if (!modeloActual) {
        crearModeloBase();
      }

      if (!botonActual) {

        botonActual = document.createElement('button');
        botonActual.className = 'animate-btn';
        botonActual.innerText = 'Animar';

        botonActual.onclick = () => {

          contentHolder.removeChild(modeloActual);

          if (!animado) {

            crearModeloAnimado();
            botonActual.innerText = "Detener animación";
            animado = true;

          } else {

            crearModeloBase();
            botonActual.innerText = "Animar";
            animado = false;

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


    });

    targetEntity.addEventListener("targetLost", () => {

      if (modeloActual) {
        contentHolder.removeChild(modeloActual);
        modeloActual = null;
      }

      animado = false;

      if (botonActual) {
        botonActual.remove();
        botonActual = null;
      }

      if (botonInfo) {
  botonInfo.remove();
  botonInfo = null;
}

if (panelInfo) {
  panelInfo.remove();
  panelInfo = null;
}

    });

    sceneEl.appendChild(targetEntity);

  });

});