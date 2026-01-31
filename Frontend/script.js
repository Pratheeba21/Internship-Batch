const inp = document.getElementById("inp");

const add_button = document.getElementById("add_button");

const task_list = document.getElementById("task_list");

const API_URL = "https://backend-todo-63d8.onrender.com/todos";

window.addEventListener("DOMContentLoaded", function(){
  fetch(API_URL)
  .then((res) => res.json())
  .then( (tasks) => tasks.forEach(task => {
    create_task_list(task.userTask, task.complete, task._id);
  }) );
});

add_button.addEventListener("click", function () {
  const task_input = inp.value;
    
  if (task_input === "") {
    alert("Please enter a task");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userTask: task_input }),
  })
  .then( (res) => res.json())
  .then((newTask) => {
    create_task_list(newTask.userTask, newTask.complete, newTask._id);
    inp.value = "";
  } )  ;
});

function create_task_list(task_text,task_status,task_id) {
  const list_item = document.createElement("li");

  const complete_btn = document.createElement("div");
  complete_btn.className = "complete-btn";

  const task_span = document.createElement("span");
  task_span.className = "task-span";
  task_span.textContent = task_text;

  const delete_btn = document.createElement("button");
  delete_btn.className = "delete-btn";
  delete_btn.textContent = "Delete";

  if (task_status === true){
    complete_btn.textContent = "✔";
    complete_btn.classList.toggle("marked");
    task_span.classList.toggle("completed");
  }

    complete_btn.addEventListener("click", function () {
      let finished = complete_btn.textContent === "✔";
      fetch(API_URL + "/" + task_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !finished }),
      })
        .then((res) => res.json())
        .then(() => {
          if (complete_btn.textContent === "✔") {
            complete_btn.textContent = "";
          } else {
            complete_btn.textContent = "✔";
          }
          complete_btn.classList.toggle("marked");
          task_span.classList.toggle("completed");
        });
    });

  delete_btn.addEventListener("click", function () {

    fetch(API_URL + "/" + task_id,{
      method:"DELETE"
    })
    .then( () => {
      task_list.removeChild(list_item);
    })
  });

  list_item.appendChild(complete_btn);
  list_item.appendChild(task_span);
  list_item.appendChild(delete_btn);

  task_list.appendChild(list_item);
}