import React, { useState, useEffect } from "react";

import "./todo.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { DateTime } from "./components/DataTime";

import { getLocalStorage,useLocalStorage } from "./components/TodoLocalStorage";

const todosKey ="reactTodo"

const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorage(todosKey));


  // Automatically persists to localStorage when task changes
  useLocalStorage(todosKey, task);
  
  const handleFormSubmit = (inputValue) => {
    // Current validation
    const { id, content, checked } = inputValue;
    if (!content) return;

    // Better validation (prevents whitespace-only tasks)
    if (!content.trim()) return;

    //to check whettehr data already exists or not
    // if (task.includes(content)) return; for arr
    const ifContentMatched = task.find(
      (currTask) => currTask.content === content)

      if(ifContentMatched) return;


    setTask((prevTasks) => [...prevTasks, {id,content,checked}]);
  };

  //if both  key and value are same we can write it once ok
  // {id:id} ====>{id}
  const handleDeletetask = (value) => {
    // console.log(task);
    // console.log(value);
    const updatedTask = task.filter((currtask) => currtask.content  !== value);
    setTask(updatedTask);
  };

  const handleDeleteAll = () => {
    setTask([]);
  };

const handleChecktodo = (content) => {
  const updatedTASK = task.map((currtask) => {
    if (currtask.content === content) {
      return { ...currtask, checked: !currtask.checked };
    } else {
      return currtask;
    }
  });
  setTask(updatedTASK);
};


  return (
    <section className="todo-container">
      <header>
        <h1>TODO LIST</h1>
        <DateTime />
      </header>

      <TodoForm onAddTask={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul>
          {task.map((currTask) => {
            return (
              <TodoList
                key={currTask.id}
                data={currTask.content}
                checked={currTask.checked}
                onHandledelete={handleDeletetask}
                onHandleCheck={handleChecktodo}
              />
            );
          })}
        </ul>
      </section>
      <section>
        <button className=" clear-btn" onClick={handleDeleteAll}>
          Clear All
        </button>
      </section>
    </section>
  );
};

export default Todo;
