const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("tasksContainer");
const template = document.getElementById("taskTemplate");
const feedback = document.getElementById("feedback");

let tasks = [];

// Load tasks from localStorage 
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

function renderTasks() {
  container.innerHTML = "";

  tasks.forEach((task, index) => {
    const clone = template.content.cloneNode(true);

    const taskDiv = clone.querySelector(".task");
    const textSpan = clone.querySelector(".task-text");
    const checkBtn = clone.querySelector(".check-btn");
    const editBtn = clone.querySelector(".edit-btn");
    const deleteBtn = clone.querySelector(".delete-btn");

    textSpan.textContent = task.text;

    if (task.completed) {
      taskDiv.classList.add("completed");
    } else {
      taskDiv.classList.remove("completed");
    }

    checkBtn.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });


    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText === null) return;
      if (newText.trim() === "") return;
      task.text = newText.trim();
      renderTasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    container.appendChild(clone);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const value = input.value.trim();

  if (value === "") {
    feedback.textContent = "insert your task ";
    feedback.classList.add("error");
    feedback.classList.remove("success");
    return;
  }

  tasks.push({ text: value, completed: false });
  renderTasks();
  input.value = "";

  feedback.textContent = "Saved";
  feedback.classList.add("success");
  feedback.classList.remove("error");

  setTimeout(() => {
    feedback.textContent = "";
    feedback.classList.remove("success");
  }, 2000);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
