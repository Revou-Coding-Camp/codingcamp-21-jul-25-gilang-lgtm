// Ambil elemen-elemen dari HTML
const todoForm = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");
const filterDate = document.getElementById("filterDate");

// Array untuk menyimpan tugas
let tasks = [];

// Event saat form dikirim
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "" || taskDate === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    date: taskDate,
  };

  tasks.push(newTask);

  // Reset input
  taskInput.value = "";
  dateInput.value = "";

  // Tampilkan ulang daftar tugas
  renderTasks();
});

// Fungsi untuk menampilkan tugas ke layar
function renderTasks() {
  taskList.innerHTML = ""; // Bersihkan isi sebelumnya

  // Cek apakah ada filter tanggal
  const filtered = filterDate.value
    ? tasks.filter((task) => task.date === filterDate.value)
    : tasks;

  // Buat elemen untuk tiap tugas
  filtered.forEach((task) => {
    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const taskDate = document.createElement("span");
    taskDate.className = "task-date";
    taskDate.textContent = task.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks(); // Refresh list
    });

    li.appendChild(taskText);
    li.appendChild(taskDate);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Event saat filter diubah
filterDate.addEventListener("change", renderTasks);