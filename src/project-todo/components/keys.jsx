import { useState } from "react";
import "./NewTodo.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { TodoList } from "./TodoList";

export const Keys = () => {
    const [tasks, setTasks] = useState([]);
    const [inputval, setInputval] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleInputChange = (value) => {
        setInputval(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!inputval.trim()) return; //empty str-fa;se

        if (tasks.includes(inputval)) {
            setInputval("");
            return;
        }

        setTasks((prevTasks) => [...prevTasks, inputval]);
        setInputval("");
    };

    const handleDeleteTask = (indexToDel) => {
        // Underscore (_): This is a convention to indicate we're ignoring the first parameter (the task itself) and only using the index.
        // Some developers prefer unused or ignored for even more clarity
        setTasks(tasks.filter((_, index) => index !== indexToDel))
    }

    const handleEditTask = (index) => {
        setEditIndex(index)
        setEditValue(tasks[index])
    }

    const handleSaveEdit = (index) => {
        const updatedTasks = tasks.map((task, i) => {
           return  i === index ? editValue : task;
        })
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditValue("");
    }



    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
            </header>
            <section id="from">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputval}
                            onChange={(event) => handleInputChange(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="todo-btn">
                        Add Task
                    </button>
                </form>
                <section className="myUnorderedList">
                    <ul className="todo-list">
                        {tasks.map((currTask, idx) => (
                            <TodoLists
                                key={idx}
                                index={idx}
                                data={currTask}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                                editIndex={editIndex}
                                editValue={editValue}
                                setEditValue={setEditValue}
                                onSaveEdit={handleSaveEdit}
                            />
                        ))}
                    </ul>
                </section>
            </section>
        </section>
    );
};

const TodoLists = ({
    data,
    index,
    onDelete,
    onEdit,
    editIndex,
    editValue,
    setEditValue,
    onSaveEdit,
}) => {
    return (
        <li className="todo-item">
            {
                editIndex === index ? (
                    <>
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                        />
                        <button onClick={() => onSaveEdit(index)} className="save-btn">
                            Save
                        </button>

                    </>


                ):(
                    <>
                    <span>{data}</span>
          <button onClick={() => onEdit(index)} className="edit-btn">
            <MdEdit />
          </button>
          <button onClick={() => onDelete(index)} className="delete-btn">
            <MdDeleteForever />
          </button>
                    
                    </>
                )
            }
        </li>
    );
};
