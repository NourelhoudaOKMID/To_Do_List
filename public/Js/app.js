const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("tasksContainer");
const template = document.getElementById("taskTemplate");
const feedback = document.getElementById("feedback");


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








    container.appendChild(clone);
  });

}


renderTasks();
