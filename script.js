const datumsor = document.getElementById("datum");
const ido = document.getElementById("ido");
const eventTimeSpan = document.getElementById("eventTime");
const inputForm = document.getElementById("inputForm");
const eventInput = document.getElementById("eventInput");
const eventTypeSelect = document.getElementById("eventType"); // Legördülő lista hivatkozás
let events = {};

function ÓraFrissites() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  ido.textContent = `${hours}:${minutes}:${seconds}`;
}

const eventStyles = {
  doga: "doga",
  feleles: "feleles",
  talalkozas: "talalkozas",
};

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

document.querySelectorAll(".clickable").forEach((cell) => {
  cell.addEventListener("click", function () {
    const day = this.getAttribute("data-day");
    const time = this.getAttribute("data-time");
    eventTimeSpan.textContent = `${day}. nap - ${time}`;
    inputForm.style.display = "block";
    eventInput.value = "";
    eventInput.focus();

    inputForm.setAttribute("data-day", day);
    inputForm.setAttribute("data-time", time);
  });
});

function saveEvent() {
  const day = inputForm.getAttribute("data-day");
  const time = inputForm.getAttribute("data-time");
  const event = eventInput.value;
  const eventType = eventTypeSelect.value; // Az esemény típusa a legördülő listából

  if (!event) {
    alert("Kérlek írd be a terveidet");
    return;
  }

  if (!events[day]) {
    events[day] = {};
  }
  events[day][time] = { text: event, type: eventType };

  updateCalendar();

  inputForm.style.display = "none";
}

function updateCalendar() {
  document.querySelectorAll(".clickable").forEach((cell) => {
    const day = cell.getAttribute("data-day");
    const time = cell.getAttribute("data-time");

    if (events[day] && events[day][time]) {
      const { text, type } = events[day][time];

      cell.innerHTML = `<div class="event ${eventStyles[type]}">${text}</div>`;
    } else {
      cell.innerHTML = "";
    }
  });
}
