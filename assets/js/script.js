const notesList = document.getElementById("notes-list");
const addNoteButton = document.getElementById("add-note");

addNoteButton.addEventListener("click", () => {
  const note = prompt("Catatan baru:");
  if (note) {
    const div = document.createElement("div");
    div.className = "note";
    div.textContent = note;
    notesList.appendChild(div);
    saveNotes();
  }
});

function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note").forEach((el) => {
    notes.push(el.textContent);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("notes") || "[]");
  saved.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note";
    div.textContent = note;
    notesList.appendChild(div);
  });
}

function clearAll() {
  if (confirm("Hapus semua catatan?")) {
    localStorage.removeItem("notes");
    notesList.innerHTML = "";
  }
}

function exportData() {
  const data = localStorage.getItem("notes") || "[]";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "catatan_keuangan.json";
  a.click();
  URL.revokeObjectURL(url);
}

function showCalculator() {
  alert("Fitur kalkulator akan ditambahkan nanti.");
}

function hitungJumlah() {
  const input = document.getElementById('calc-input').value;
  try {
    const hasil = eval(input);
    document.getElementById('calc-result').textContent = hasil;
  } catch (error) {
    document.getElementById('calc-result').textContent = 'Error';
  }
}
document.getElementById("toggle-calculator").addEventListener("click", function() {
  const calc = document.getElementById("calculator");
  if (calc.style.display === "none" || calc.style.display === "") {
    calc.style.display = "block";
  } else {
    calc.style.display = "none";
  }
});


loadNotes();
