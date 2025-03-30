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
  const handleDeletetask = (id) => {
    // console.log(task);
    // console.log(value);
    const updatedTask = task.filter(currtask => currtask.id !== id);
    setTask(updatedTask);
  };

  const handleDeleteAll = () => {
    setTask([]);
  };

  const handleEditTasks = (id, newContent) => {
    const updatedTasks = task.map(task => 
      task.id === id ? { ...task, content: newContent } : task
    );
    setTask(updatedTasks);
  };

  const handleChecktodo = (id) => {
    const updatedTASK = task.map(currtask => 
      currtask.id === id ? { ...currtask, checked: !currtask.checked } : currtask
    );
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
                id={currTask.id}
                data={currTask.content}
                checked={currTask.checked}
                onHandledelete={handleDeletetask}
                onHandleCheck={handleChecktodo}
                onHandleEdit={handleEditTasks}
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
