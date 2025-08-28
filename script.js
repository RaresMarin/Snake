let sarpe = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150},
];

let dx = 10;
let dy = 0;
let mancareX;
let mancareY;
let scor = 0;
let schimbareDirectie = false;

const panza = document.getElementById("jocCanvas");
const ctx = panza.getContext("2d");

function curataPanza() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, panza.width, panza.height);
  ctx.strokeRect(0, 0, panza.width, panza.height);
}

function deseneazaParteSarpe(parte) {
  ctx.fillStyle = '#28a745'; // verde intens
  ctx.strokeStyle = '#155724'; // contur verde închis
  ctx.lineWidth = 1.5;
  ctx.fillRect(parte.x, parte.y, 10, 10);
  ctx.strokeRect(parte.x, parte.y, 10, 10);
}

function deseneazaSarpele() {
  sarpe.forEach(deseneazaParteSarpe);
}

function deseneazaMancare() {
  ctx.fillStyle = '#dc3545'; // roșu aprins
  ctx.strokeStyle = '#721c24'; // contur roșu închis
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(mancareX + 5, mancareY + 5, 5, 0, 2 * Math.PI); // desen măr rotund
  ctx.fill();
  ctx.stroke();
}

function zeceAleator(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function creeazaMancare() {
  mancareX = zeceAleator(0, panza.width - 10);
  mancareY = zeceAleator(0, panza.height - 10);

  sarpe.forEach(function(parte) {
    const peSarpe = parte.x === mancareX && parte.y === mancareY;
    if (peSarpe) creeazaMancare();
  });
}

function avanseazaSarpele() {
  const cap = {x: sarpe[0].x + dx, y: sarpe[0].y + dy};
  sarpe.unshift(cap);

  const aMancat = cap.x === mancareX && cap.y === mancareY;

  if (aMancat) {
    scor += 10;
    document.getElementById("score").innerHTML = scor;
    creeazaMancare();
  } else {
    sarpe.pop();
  }
  schimbareDirectie = false;
}

function schimbaDirectia(event) {
  const STANGA = 37;
  const DREAPTA = 39;
  const SUS = 38;
  const JOS = 40;

  if (schimbareDirectie) return;
  schimbareDirectie = true;

  const tasta = event.keyCode;
  const mergeSus = dy === -10;
  const mergeJos = dy === 10;
  const mergeDreapta = dx === 10;
  const mergeStanga = dx === -10;

  if (tasta === STANGA && !mergeDreapta) {
    dx = -10;
    dy = 0;
  }
  if (tasta === DREAPTA && !mergeStanga) {
    dx = 10;
    dy = 0;
  }
  if (tasta === SUS && !mergeJos) {
    dx = 0;
    dy = -10;
  }
  if (tasta === JOS && !mergeSus) {
    dx = 0;
    dy = 10;
  }
}

function sAterminatJocul() {
  for (let i = 4; i < sarpe.length; i++) {
    if (sarpe[i].x === sarpe[0].x && sarpe[i].y === sarpe[0].y) return true;
  }

  const atinsStanga = sarpe[0].x < 0;
  const atinsDreapta = sarpe[0].x > panza.width - 10;
  const atinsSus = sarpe[0].y < 0;
  const atinsJos = sarpe[0].y > panza.height - 10;

  return atinsStanga || atinsDreapta || atinsSus || atinsJos;
}

function principal() {
  if (sAterminatJocul()) return;

  setTimeout(function() {
    curataPanza();
    deseneazaMancare();
    avanseazaSarpele();
    deseneazaSarpele();
    principal();
  }, 100);
}

document.addEventListener("keydown", schimbaDirectia);

creeazaMancare();
principal();
function reseteazaJocul() {
  sarpe = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];
  dx = 10;
  dy = 0;
  scor = 0;
  schimbareDirectie = false;
  document.getElementById("score").innerHTML = scor;
  creeazaMancare();
  principal();
}
