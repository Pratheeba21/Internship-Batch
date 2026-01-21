const inp = document.getElementById("inp");

const add_button = document.getElementById("add_button");

const task_list = document.getElementById("task_list");

add_button.addEventListener("click", function () {
  const task_input = inp.value;
    
  if (task_input === "") {
    alert("Please enter a task");
    return;
  }

  const list_item = document.createElement("li");

  const complete_btn = document.createElement("div");
  complete_btn.className = "complete-btn";

  const task_span = document.createElement("span");
  task_span.className = "task-span";
  task_span.textContent = task_input;

  const delete_btn = document.createElement("button");
  delete_btn.className = "delete-btn";
  delete_btn.textContent = "Delete";

  complete_btn.addEventListener("click", function () {
    if (complete_btn.textContent === "✔") {
      complete_btn.textContent = "";
    } else {
      complete_btn.textContent = "✔";
    }
    complete_btn.classList.toggle("marked");
    task_span.classList.toggle("completed");
  });

  delete_btn.addEventListener("click", function () {
    task_list.removeChild(list_item);
  });

  list_item.appendChild(complete_btn);
  list_item.appendChild(task_span);
  list_item.appendChild(delete_btn);

  task_list.appendChild(list_item);

  inp.value = "";
});
