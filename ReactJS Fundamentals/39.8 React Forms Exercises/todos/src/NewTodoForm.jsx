import React, {useState} from "react";
import { v4 as uuid } from 'uuid';
import './NewTodoForm.css';


function NewTodoForm({ createTodo }) {
  const [task, setTask] = useState("");

  const handleChange = evt => {
    console.log(evt.target.value);
    setTask(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    createTodo({ task, id: uuid() });
    setTask("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task">Task:</label>
          <input 
            id="task"
            name="task"
            type="text"
            onChange={handleChange}
            value={task}
          />
        </div>
        <button>Add Todo</button>
      </form>
    </div>
  )
}

export default NewTodoForm
