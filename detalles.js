 const infoCiudades = {

            toronto: {
                desc: "El Estadio Toronto se ubica en Toronto, Ontario, Canadá; cuenta con una capacidad para 45,000 personas y se fundó en el año 2007.",
                estadioImg: "img/ESTADIOS/ESTADIO_TORONTO.jpg",
                logoPais: "img/ALCE.png"
            },
            vancouver: {
                desc: "El Estadio BC Place Vancouver se ubica en Vancouver, Columbia Británica, Canadá; cuenta con una capacidad de 54,000 personas y fue renovado en 2011.",
                estadioImg: "img/ESTADIOS/ESTADIO_VANCOUVER.jpg",
                logoPais: "img/ALCE.png"
            },

            guadalajara: {
                desc: "El Estadio Guadalajara, con su icónico diseño de volcán, se ubica en Zapopan, Jalisco, México; tiene capacidad para 48,000 personas y se fundó en 2010.",
                estadioImg: "img/ESTADIOS/ESTADIO_GUADALAJARA.jpg",
                logoPais: "img/LEOPARDO.png"
            },
            CDMX: {
                desc: "El histórico Estadio Ciudad de México, fundado en 1966, se ubica en Tlalpan, CDMX; es el único en recibir tres mundiales y tiene capacidad para 83,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_CDMX.jpg",
                logoPais: "img/LEOPARDO.png"
            },
            monterrey: {
                desc: "El Estadio Monterrey es uno de los más modernos de la región, fundado en 2015 en Guadalupe, Nuevo León; cuenta con una capacidad para 53,500 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_MONTERREY.png",
                logoPais: "img/LEOPARDO.png"
            },

            atlanta: {
                desc: "Ubicado en Atlanta, Georgia, este estadio de techo retráctil se fundó en 2017 y tiene una capacidad de 71,000 personas para el mundial.",
                estadioImg: "img/ESTADIOS/ESTADIO_ATLANTA.jpg",
                logoPais: "img/AGUILA2.png"
            },
            boston: {
                desc: "Situado en Foxborough, Massachusetts, se fundó en 2002; es un pilar del deporte en Nueva Inglaterra con capacidad para 65,000 espectadores.",
                estadioImg: "img/ESTADIOS/ESTADIO_BOSTON.jpg",
                logoPais: "img/AGUILA2.png"
            },
            dallas: {
                desc: "El Estadio Dallas fundado en 2009 está en Arlington, Texas; es una maravilla tecnológica con capacidad para 94,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_DALLAS.jpg",
                logoPais: "img/AGUILA2.png"
            },
            houston: {
                desc: "El estado de Houston esta ubicado en Houston, Texas, se fundó en 2002; cuenta con techo retráctil y una capacidad de 72,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_HOUSTON.jpg",
                logoPais: "img/AGUILA2.png"
            },
            kansas_city: {
                desc: "Este histórico recinto en Kansas City, Missouri, se fundó en 1972 y es famoso por su ambiente ruidoso; tiene capacidad para 76,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_KANSASCITY.jpg",
                logoPais: "img/AGUILA2.png"
            },
            los_angeles: {
                desc: "Ubicado en Inglewood, California, este estadio se fundó en 2020 y es el más costoso del mundo, con capacidad para 70,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_LOSANGELES.jpg",
                logoPais: "img/AGUILA2.png"
            },
            miami: {
                desc: "Situado en Miami Gardens, Florida, se fundó en 1987 y fue remodelado en 2015; cuenta con capacidad para 65,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_MIAMI.jpg",
                logoPais: "img/AGUILA2.png"
            },
            new_york: {
                desc: "Ubicado en East Rutherford, Nueva Jersey, se fundó en 2010; será la sede de la final y tiene capacidad para 82,500 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_NEWYORK.png",
                logoPais: "img/AGUILA2.png"
            },
            philadelphia: {
                desc: "Ubicado en Filadelfia, Pensilvania, se fundó en 2003; es un estadio icónico de la costa este con capacidad para 69,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_FILADELFIA.jpg",
                logoPais: "img/AGUILA2.png"
            },
            san_francisco: {
                desc: "Ubicado en Santa Clara, California, se fundó en 2014; es un estadio ecológico de alta tecnología con capacidad para 68,500 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_SANFRANCISCO.jpg",
                logoPais: "img/AGUILA2.png"
            },
            seattle: {
                desc: "Ubicado en Seattle, Washington, se fundó en 2002; es conocido por su diseño vertical y tiene capacidad para 69,000 personas.",
                estadioImg: "img/ESTADIOS/ESTADIO_SEATTLE.jpg",
                logoPais: "img/AGUILA2.png"
            }

        };

        const datosPartidos = {
            monterrey: [
                { fecha: "Domingo, 14 de junio", equipos: "Ucrania/Suecia/Polonia/Albania vs Túnez", estadio: "Estadio Monterrey" },
                { fecha: "Sábado, 20 de junio", equipos: "Túnez vs Japón", estadio: "Estadio Monterrey" },
                { fecha: "Miércoles, 24 de junio", equipos: "Sudáfrica vs República de Corea", estadio: "Estadio Monterrey" },
                { fecha: "Lunes, 29 de junio", equipos: "1º Grupo F vs 2º Grupo C", estadio: "Estadio Monterrey" }
            ],

            CDMX: [
                { fecha: "Jueves, 11 de junio", equipos: "México vs Sudáfrica", estadio: "Estadio Ciudad de México" },
                { fecha: "Miércoles, 17 de junio", equipos: "Uzbekistán vs Colombia", estadio: "Estadio Ciudad de México" },
                { fecha: "Miércoles, 24 de junio", equipos: "Dinamarca/Macedonia/República Checa/Irlanda vs México", estadio: "Estadio Ciudad de México" },
                { fecha: "Martes, 30 de junio", equipos: "1º Grupo A vs 3º Grupo C/E/F/H/I", estadio: "Estadio Ciudad de México" },
                { fecha: "Domingo, 5 de julio", equipos: "Ganador Partido 79 vs Ganador Partido 80", estadio: "Estadio Ciudad de México" }
            ],

            guadalajara: [
                { fecha: "Jueves, 11 de junio", equipos: "República de Corea vs Rep. Checa/Dinamarca/Macedonia del Norte/Irlanda", estadio: "Estadio Guadalajara" },
                { fecha: "Jueves, 18 de junio", equipos: "México vs República de Corea", estadio: "Estadio Guadalajara" },
                { fecha: "Martes, 23 de junio", equipos: "Colombia vs Congo/Jamaica/Nueva Caledonia", estadio: "Estadio Guadalajara" },
                { fecha: "Viernes, 26 de junio", equipos: "Uruguay vs España", estadio: "Estadio Guadalajara" }
            ],

            atlanta: [
                { fecha: "Lunes, 15 de junio", equipos: "España vs Cabo Verde", estadio: "Estadio Atlanta" },
                { fecha: "Jueves, 18 de junio", equipos: "Rep. Checa/Dinamarca/Macedonia/Irlanda vs Sudáfrica", estadio: "Estadio Atlanta" },
                { fecha: "Domingo, 21 de junio", equipos: "España vs Arabia Saudí", estadio: "Estadio Atlanta" },
                { fecha: "Miércoles, 24 de junio", equipos: "Marruecos vs Haití", estadio: "Estadio Atlanta" },
                { fecha: "Sábado, 27 de junio", equipos: "Congo/Jamaica/Nueva Caledonia vs Uzbekistán", estadio: "Estadio Atlanta" },
                { fecha: "Miércoles, 1 de julio", equipos: "1º Grupo L vs 3º Grupo E/H/I/J/K", estadio: "Estadio Atlanta" },
                { fecha: "Martes, 7 de julio", equipos: "Ganador Partido 86 vs Ganador Partido 88", estadio: "Estadio Atlanta" },
                { fecha: "Miércoles, 15 de julio", equipos: "Ganador Partido 99 vs Ganador Partido 100", estadio: "Estadio Atlanta" }
            ],

            dallas: [
                { fecha: "Domingo, 14 de junio", equipos: "Países Bajos vs Japón", estadio: "Estadio Dallas" },
                { fecha: "Miércoles, 17 de junio", equipos: "Inglaterra vs Croacia", estadio: "Estadio Dallas" },
                { fecha: "Lunes, 22 de junio", equipos: "Argentina vs Austria", estadio: "Estadio Dallas" },
                { fecha: "Jueves, 25 de junio", equipos: "Japón vs Albania/Polonia/Suecia/Ucrania", estadio: "Estadio Dallas" },
                { fecha: "Sábado, 27 de junio", equipos: "Jordania vs Argentina", estadio: "Estadio Dallas" },
                { fecha: "Martes, 30 de junio", equipos: "2E vs 2I", estadio: "Estadio Dallas" },
                { fecha: "Viernes, 3 de julio", equipos: "2D vs 2G", estadio: "Estadio Dallas" },
                { fecha: "Lunes, 6 de julio", equipos: "Ganador Partido 83 vs Ganador Partido 84", estadio: "Estadio Dallas" },
                { fecha: "Martes, 14 de julio", equipos: "Ganador Partido 97 vs Ganador Partido 98", estadio: "Estadio Dallas" }
            ],

            boston: [
                { fecha: "Sábado, 13 de junio", equipos: "Haití vs Escocia", estadio: "Estadio Boston" },
                { fecha: "Jueves, 16 de junio", equipos: "Irak/Bolivia/Surinam vs Noruega", estadio: "Estadio Boston" },
                { fecha: "Viernes, 19 de junio", equipos: "Escocia vs Marruecos", estadio: "Estadio Boston" },
                { fecha: "Martes, 23 de junio", equipos: "Inglaterra vs Ghana", estadio: "Estadio Boston" },
                { fecha: "Viernes, 26 de junio", equipos: "Noruega vs Francia", estadio: "Estadio Boston" },
                { fecha: "Lunes, 29 de junio", equipos: "1º Grupo E vs 3º Grupo A/B/C/D/F", estadio: "Estadio Boston" },
                { fecha: "Jueves, 9 de julio", equipos: "Ganador Partido 89 vs Ganador Partido 90", estadio: "Estadio Boston" }
            ],

            houston: [
                { fecha: "Domingo, 14 de junio", equipos: "Alemania vs Curazao", estadio: "Estadio Houston" },
                { fecha: "Miércoles, 17 de junio", equipos: "Portugal vs Jamaica/RD Congo/Nueva Caledonia", estadio: "Estadio Houston" },
                { fecha: "Sábado, 20 de junio", equipos: "Países Bajos vs Ucrania/Suecia/Polonia/Albania", estadio: "Estadio Houston" },
                { fecha: "Martes, 23 de junio", equipos: "Portugal vs Uzbekistán", estadio: "Estadio Houston" },
                { fecha: "Viernes, 26 de junio", equipos: "Cabo Verde vs Arabia Saudí", estadio: "Estadio Houston" },
                { fecha: "Lunes, 29 de junio", equipos: "1º Grupo E vs 2º Grupo F", estadio: "Estadio Houston" },
                { fecha: "Sábado, 4 de julio", equipos: "Ganador Partido 73 vs Ganador Partido 75", estadio: "Estadio Houston" }
            ],

            kansas_city: [
                { fecha: "Jueves, 16 de junio", equipos: "Argentina vs Argelia", estadio: "Estadio Kansas City" },
                { fecha: "Sábado, 20 de junio", equipos: "Ecuador vs Curazao", estadio: "Estadio Kansas City" },
                { fecha: "Jueves, 25 de junio", equipos: "Túnez vs Países Bajos", estadio: "Estadio Kansas City" },
                { fecha: "Viernes, 3 de julio", equipos: "1º Grupo K vs 3º Grupo D/E/I/J/L", estadio: "Estadio Kansas City" },
                { fecha: "Sábado, 11 de julio", equipos: "Ganador Partido 95 vs Ganador Partido 96", estadio: "Estadio Kansas City" }
            ],

            los_angeles: [
                { fecha: "Viernes, 12 de junio", equipos: "Estados Unidos vs Paraguay", estadio: "Estadio Los Ángeles" },
                { fecha: "Lunes, 15 de junio", equipos: "Irán vs Nueva Zelanda", estadio: "Estadio Los Ángeles" },
                { fecha: "Jueves, 18 de junio", equipos: "Suiza vs Italia/Irlanda/Gales/Bosnia", estadio: "Estadio Los Ángeles" },
                { fecha: "Domingo, 21 de junio", equipos: "Bélgica vs Irán", estadio: "Estadio Los Ángeles" },
                { fecha: "Jueves, 25 de junio", equipos: "Turquía/Rumania/Eslovaquia/Kosovo vs Estados Unidos", estadio: "Estadio Los Ángeles" },
                { fecha: "Domingo, 28 de junio", equipos: "2º Grupo A vs 2º Grupo B", estadio: "Estadio Los Ángeles" },
                { fecha: "Jueves, 2 de julio", equipos: "1º Grupo H vs 2º Grupo J", estadio: "Estadio Los Ángeles" },
                { fecha: "Viernes, 10 de julio", equipos: "Ganador Partido 93 vs Ganador Partido 94", estadio: "Estadio Los Ángeles" }
            ],

            miami: [
                { fecha: "Lunes, 15 de junio", equipos: "Arabia Saudí vs Uruguay", estadio: "Estadio Miami" },
                { fecha: "Domingo, 21 de junio", equipos: "Uruguay vs Cabo Verde", estadio: "Estadio Miami" },
                { fecha: "Miércoles, 24 de junio", equipos: "Escocia vs Brasil", estadio: "Estadio Miami" },
                { fecha: "Sábado, 27 de junio", equipos: "Colombia vs Portugal", estadio: "Estadio Miami" },
                { fecha: "Viernes, 3 de julio", equipos: "1º Grupo J vs 2º Grupo H", estadio: "Estadio Miami" },
                { fecha: "Sábado, 11 de julio", equipos: "Ganador Partido 91 vs Ganador Partido 92", estadio: "Estadio Miami" },
                { fecha: "Sábado, 18 de julio", equipos: "Perdedor Partido 101 vs Perdedor Partido 102 (Tercer Puesto)", estadio: "Estadio Miami" }
            ],

            new_york: [
                { fecha: "Sábado, 13 de junio", equipos: "Brasil vs Marruecos", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Jueves, 16 de junio", equipos: "Francia vs Senegal", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Lunes, 22 de junio", equipos: "Noruega vs Senegal", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Jueves, 25 de junio", equipos: "Ecuador vs Alemania", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Sábado, 27 de junio", equipos: "Panamá vs Inglaterra", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Martes, 30 de junio", equipos: "1º Grupo I vs 3º Grupo C/D/F/G/H", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Domingo, 5 de julio", equipos: "Ganador Partido 76 vs Ganador Partido 78", estadio: "Estadio Nueva York Nueva Jersey" },
                { fecha: "Domingo, 19 de julio", equipos: "Ganador Partido 101 vs Ganador Partido 102 (Gran Final)", estadio: "Estadio Nueva York Nueva Jersey" }
            ],

            philadelphia: [
                { fecha: "Domingo, 14 de junio", equipos: "Costa de Marfil vs Ecuador", estadio: "Estadio Filadelfia" },
                { fecha: "Viernes, 19 de junio", equipos: "Brasil vs Haití", estadio: "Estadio Filadelfia" },
                { fecha: "Lunes, 22 de junio", equipos: "Francia vs Irak/Bolivia/Surinam", estadio: "Estadio Filadelfia" },
                { fecha: "Jueves, 25 de junio", equipos: "Curazao vs Costa de Marfil", estadio: "Estadio Filadelfia" },
                { fecha: "Sábado, 27 de junio", equipos: "Croacia vs Ghana", estadio: "Estadio Filadelfia" },
                { fecha: "Sábado, 4 de julio", equipos: "Ganador Partido 74 vs Ganador Partido 77", estadio: "Estadio Filadelfia" }
            ],

            san_francisco: [
                { fecha: "Sábado, 13 de junio", equipos: "Catar vs Suiza", estadio: "Estadio Bahía de San Francisco" },
                { fecha: "Jueves, 16 de junio", equipos: "Austria vs Jordania", estadio: "Estadio Bahía de San Francisco" },
                { fecha: "Viernes, 19 de junio", equipos: "Turquía/Rumania/Eslovaquia/Kosovo vs Paraguay", estadio: "Estadio Bahía de San Francisco" },
                { fecha: "Lunes, 22 de junio", equipos: "Jordania vs Argelia", estadio: "Estadio Bahía de San Francisco" },
                { fecha: "Jueves, 25 de junio", equipos: "Paraguay vs Australia", estadio: "Estadio Bahía de San Francisco" },
                { fecha: "Miércoles, 1 de julio", equipos: "1º Grupo D vs 3º Grupo B/E/F/I/J", estadio: "Estadio Bahía de San Francisco" }
            ],

            seattle: [
                { fecha: "Lunes, 15 de junio", equipos: "Bélgica vs Egipto", estadio: "Estadio Seattle" },
                { fecha: "Viernes, 19 de junio", equipos: "Estados Unidos vs Australia", estadio: "Estadio Seattle" },
                { fecha: "Miércoles, 24 de junio", equipos: "Italia/Irlanda del Norte/Gales/Bosnia vs Catar", estadio: "Estadio Seattle" },
                { fecha: "Viernes, 26 de junio", equipos: "Egipto vs Irán", estadio: "Estadio Seattle" },
                { fecha: "Miércoles, 1 de julio", equipos: "1º Grupo G vs 3º Grupo A/E/H/I/J", estadio: "Estadio Seattle" },
                { fecha: "Lunes, 6 de julio", equipos: "Ganador Partido 81 vs Ganador Partido 82", estadio: "Estadio Seattle" }
            ],

            vancouver: [
                { fecha: "Sábado, 13 de junio", equipos: "Australia vs Kosovo/Rumania/Eslovaquia/Turquía", estadio: "Estadio BC Place Vancouver" },
                { fecha: "Jueves, 18 de junio", equipos: "Canadá vs Catar", estadio: "Estadio BC Place Vancouver" },
                { fecha: "Domingo, 21 de junio", equipos: "Nueva Zelanda vs Egipto", estadio: "Estadio BC Place Vancouver" },
                { fecha: "Miércoles, 24 de junio", equipos: "Suiza vs Canadá", estadio: "Estadio BC Place Vancouver" },
                { fecha: "Viernes, 26 de junio", equipos: "Nueva Zelanda vs Bélgica", estadio: "Estadio BC Place Vancouver" },
                { fecha: "Jueves, 2 de julio", equipos: "1º Grupo B vs 3º Grupo E/F/G/I/J", estadio: "Estadio BC Place Vancouver" },
                { fecha: "Martes, 7 de julio", equipos: "Ganador Partido 85 vs Ganador Partido 87", estadio: "Estadio BC Place Vancouver" }
            ],

            toronto: [
                { fecha: "Viernes, 12 de junio", equipos: "Canadá vs Italia/Nigeria/Gales/Bosnia", estadio: "Estadio Toronto" },
                { fecha: "Miércoles, 17 de junio", equipos: "Ghana vs Panamá", estadio: "Estadio Toronto" },
                { fecha: "Sábado, 20 de junio", equipos: "Alemania vs Costa de Marfil", estadio: "Estadio Toronto" },
                { fecha: "Martes, 23 de junio", equipos: "Panamá vs Croacia", estadio: "Estadio Toronto" },
                { fecha: "Viernes, 26 de junio", equipos: "Senegal vs Irak/Bolivia/Surinam", estadio: "Estadio Toronto" },
                { fecha: "Jueves, 2 de julio", equipos: "2º Grupo K vs 2º Grupo L", estadio: "Estadio Toronto" }
            ]
        };

        const params = new URLSearchParams(window.location.search);
        const ciudad = params.get('ciudad');

        if (ciudad && infoCiudades[ciudad]) {
            const info = infoCiudades[ciudad];
            document.getElementById('titulo-sede').innerText = ciudad.replace('_', ' ').toUpperCase();
            document.getElementById('descripcion-sede').innerText = info.desc;
            document.getElementById('foto-estadio').src = info.estadioImg;
            document.getElementById('logo-pais').src = info.logoPais;

            const lista = document.getElementById('lista-partidos');
            if (datosPartidos[ciudad]) {
                datosPartidos[ciudad].forEach(p => {
                    lista.innerHTML += `
                        <div class="card">
                            <p><strong>${p.fecha}</strong></p>
                            <p>${p.equipos}</p>
                            <p><small>${p.estadio}</small></p>
                        </div>
                    `;
                });
            }
        }