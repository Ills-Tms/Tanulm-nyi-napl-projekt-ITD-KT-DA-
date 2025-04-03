document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");

  const events = JSON.parse(localStorage.getItem("events")) || {};

  for (const day in events) {
    for (const time in events[day]) {
      const event = events[day][time];
      const listItem = document.createElement("li");
      listItem.textContent = `${day} - ${time}: ${event.text} (${event.type})`;
      taskList.appendChild(listItem);
    }
  }
});
