const datumsor = document.getElementById("datum");
const ido = document.getElementById("ido");

function ÓraFrissites() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  ido.textContent = `${hours}:${minutes}:${seconds}`;
}

function frissit() {
  const now = new Date();
  const ev = now.getFullYear();
  const honap = String(now.getMonth() + 1).padStart(2, "0");
  const nap = String(now.getDate()).padStart(2, "0");

  datumsor.innerText = `${ev}.${honap}.${nap}`;
}

setInterval(ÓraFrissites, 1000);
ÓraFrissites();

setInterval(frissit, 1000);
frissit();
