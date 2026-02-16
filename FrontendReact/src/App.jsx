// import "./App.css";


// function Login(){
//   return(
//     <>
//       <h1>Login</h1>
//       <button>Login</button>
//     </>
//   );
// }

// function SignUp() {
//   return (
//     <>
//       <h1>Sign Up</h1>
//       <button>SignUp</button>
//     </>
//   );
// }

// function App(){
  // let user = "new";
  // let display;
  // if(user=="old"){
  //     display = <Login/>;
  // }
  // else{
  //    display = <SignUp/>;
  // }

//   const students = [ {id:1, name: "a", age:5 },
//                      {id:2,name: "a", age: 5},
//                      {id:3,name: "a", age: 5}
//                   ];
//   const stds = students.map( (student,ind) => 
//     <li key={student.id}>
//       {ind}
//       {student.id}
//       {student.name}
//       {student.age}
//     </li>
//   );

//   return (
//     <ul>{stds}</ul>
//     // <div>
//     //   <h1>Hi from App</h1>
//     //   {/* {user == "old" ? <Login /> : <SignUp />} */}
//     //
//     // </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://backend-todo-63d8.onrender.com/todos";

function App(){

  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect( () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((err) => console.log("Error fetching tasks", err) )},
    []
  );

  const addTask = () => {
    if (task.trim() === "") 
      return alert("Please enter a task!")

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userTask: task }),
    })
    .then( (res) => res.json())
    .then( (newTaskValue) => {
      setTaskList([...taskList, newTaskValue]);
      setTask("");
    } )

    // setTaskList([...taskList, { tasktext: task, taskstatus: false }]); 
    // setTask("");
  };

  const completeStatus= (id,status) => {

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complete: !status }),
    })
    .then((res)=>res.json() )
    .then( (newInputValue) => {
      setTaskList(taskList.map( (t) => t._id ===  id ? newInputValue : t ));
    } )




      // const newList = [...taskList];
      // newList[index].taskstatus = !newList[index].taskstatus;
      // setTaskList(newList);
  }

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`,
      {
        method: "DELETE"
      }
    )
    .then( () => {
      setTaskList( taskList.filter( (t) => t._id !== id  ));
    } )

    // const newTask = taskList.filter((currentvalue, index) => ind !== index);
    // setTaskList(newTask);                                 
  }
  
  return (
    <div className="container">
      <h1>Add your tasks</h1>
      <input
        placeholder="enter your task"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button className="add_button " onClick={addTask}>
        Add the task
      </button>
      <ul>
        {taskList.map((currentTask) => (
          <li key={currentTask._id}>
            <div
              className={`complete-btn ${currentTask.complete ? "marked" : ""}`}
              onClick={() => completeStatus(currentTask._id, currentTask.complete)}>
              {currentTask.complete && "✔"}
            </div>
            <span
              className={`task-text ${currentTask.complete ? "completed" : ""}`}>
              {currentTask.userTask}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(currentTask._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}                     

export default App;

