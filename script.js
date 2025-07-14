const ramos = [
  { id: 'BIOL034', name: 'Biología Celular', sem: 1, prereq: [] },
  { id: 'BIOL035', name: 'Lab. Biocelular', sem: 1, prereq: [] },
  { id: 'QUI002', name: 'Química', sem: 1, prereq: [] },
  { id: 'FMMP003', name: 'Matemática', sem: 1, prereq: [] },
  { id: 'DEBD221', name: 'Zoología', sem: 1, prereq: [] },
  { id: 'ING119', name: 'Inglés I', sem: 1, prereq: [] },
  { id: 'MVET611', name: 'Intro. Med. Vet', sem: 1, prereq: [] },

  { id: 'BIOL166', name: 'Bioquímica', sem: 2, prereq: ['BIOL034', 'BIOL035', 'QUI002'] },
  { id: 'MVET621', name: 'ADO I', sem: 2, prereq: ['BIOL034', 'BIOL035'] },
  { id: 'MVET622', name: 'Cuerpo Animal I', sem: 2, prereq: ['BIOL034', 'BIOL035', 'DEBD221'] },
  { id: 'ING129', name: 'Inglés II', sem: 2, prereq: ['ING119'] },
  { id: 'CEGHC11', name: 'Hab. Comunicativas', sem: 2, prereq: [] },
];

const container = document.getElementById('malla');
const maxSem = Math.max(...ramos.map(r => r.sem));

// Crear estructura por semestre
for (let s = 1; s <= maxSem; s++) {
  const divS = document.createElement('div');
  divS.classList.add('semester');
  divS.innerHTML = `<h2>Semestre ${s}</h2><div class="grid" id="sem${s}"></div>`;
  container.appendChild(divS);
}

// Crear botones de ramos
ramos.forEach(r => {
  const btn = document.createElement('div');
  btn.id = r.id;
  btn.textContent = r.name;
  btn.classList.add('ramo', r.prereq.length ? 'locked' : 'avail');
  btn.addEventListener('click', () => onClick(r));
  document.getElementById('sem' + r.sem).appendChild(btn);
});

function onClick(r) {
  const el = document.getElementById(r.id);
  if (el.classList.contains('avail')) {
    el.classList.replace('avail', 'done');
    desbloquear(r.id);
  }
}

function desbloquear(id) {
  ramos.filter(r => r.prereq.includes(id)).forEach(r => {
    const el = document.getElementById(r.id);
    const ready = r.prereq.every(pr => document.getElementById(pr).classList.contains('done'));
    if (ready && el.classList.contains('locked')) {
      el.classList.replace('locked', 'avail');
    }
  });
}

// Reset
document.getElementById('reset').addEventListener('click', () => {
  ramos.forEach(r => {
    const el = document.getElementById(r.id);
    el.className = 'ramo';
    if (r.prereq.length) el.classList.add('locked');
    else el.classList.add('avail');
  });
});
