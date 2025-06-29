import React, { useState, useEffect } from 'react';
import Header from './Header';
import AddTodo from './TodoList';
import Footer from './Footer';
import './App.css';
import confetti from 'canvas-confetti';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskObj) => {
    setTasks([...tasks, taskObj]);
  };

  const handleDelete = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleDone = (index) => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      handleDelete(index);
    }, 800);
  };

  return (
    <div className="app">
      <Header />
      <AddTodo onAdd={handleAddTask} />

      <div className="todos">
        {tasks.map((task, index) => (
          <div className="todo-box" key={index}>
            <div className="leftbox">
              <p>{task.task}</p>
              <hr className="dividertodo" />
              <p className="desc">{task.desc}</p>
            </div>
            <div className="rightbox">
              <button className="donebtn" onClick={() => handleDone(index)}>
                Done!
              </button>
              <button className="delbtn" onClick={() => handleDelete(index)}>
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default App;