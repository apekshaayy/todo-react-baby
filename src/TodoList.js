import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (task.trim() === "" || desc.trim() === "") return;

    const newTodo = { id: Date.now(), task, desc };
    setTodos((prev) => [...prev, newTodo]);
    setTask("");
    setDesc("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDone = (id) => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      handleDelete(id);
    }, 800);
  };

  return (
    <div className="todo-container">
      <div className="addsection">
        <input
          type="text"
          className="tasktaker"
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          className="tasktaker"
          placeholder="Add Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="plus" onClick={handleAdd}>
          &#65291;
        </button>
      </div>
      <hr className="divider" />

      {todos.map((todo) => (
        <div className="todo-box" key={todo.id}>
          <div className="leftbox">
            <p>{todo.task}</p>
            <hr className="dividertodo" />
            <p className="desc">{todo.desc}</p>
          </div>
          <div className="rightbox">
            <button className="donebtn" onClick={() => handleDone(todo.id)}>
              Done!
            </button>
            <button className="delbtn" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
            <i className="fas fa-trash" onClick={() => handleDelete(todo.id)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;