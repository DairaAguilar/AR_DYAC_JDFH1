
const parseFecha = (fechaStr) => {
    const meses = { "junio": 5, "julio": 6 };
    const partes = fechaStr.split(", ")[1].split(" de ");
    const dia = parseInt(partes[0]);
    const mes = meses[partes[1].toLowerCase()];
    return new Date(2026, mes, dia);
};


let todosLosPartidos = [];
Object.keys(datosPartidos).forEach(ciudad => {
    datosPartidos[ciudad].forEach(partido => {
        todosLosPartidos.push({ ...partido, ciudad });
    });
});


todosLosPartidos.sort((a, b) => parseFecha(a.fecha) - parseFecha(b.fecha));


const lista = document.getElementById('lista-partidos');
todosLosPartidos.forEach(p => {
    lista.innerHTML += `
        <div class="match-card">
            <div class="match-header">
                <span>${p.fecha.toUpperCase()}</span>
                <span>${p.ciudad.toUpperCase()}</span>
            </div>
            <div class="teams-display">
                <div class="team">${p.equipos.split(' vs ')[0]}</div>
                <div class="vs">VS</div>
                <div class="team">${p.equipos.split(' vs ')[1]}</div>
            </div>
            <div class="match-footer">
                <i class="fas fa-map-marker-alt"></i> ${p.estadio}
            </div>
        </div>
    `;
});