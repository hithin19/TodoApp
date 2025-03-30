import React, { useState } from 'react';

export const TodoForm = ({ onAddTask }) => {
  // Use a single string state for input value
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    // Directly update with the input value
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Validate input
    if (!inputValue.trim()) return;
    
    // Create new task object
    const newTask = {
      id: Date.now().toString(), // Generate unique ID
      content: inputValue.trim(),
      checked: false
    };
    
    // Pass to parent component
    onAddTask(newTask);
    
    // Reset input field
    setInputValue('');
  };

  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            className="todo-input"
            autoComplete="off"
            value={inputValue}  // Use direct string value
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="todo-btn">
            Add task
          </button>
        </div>
      </form>
    </section>
  );
};