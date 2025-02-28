import React, { Dispatch, SetStateAction, useState } from "react";
import ToDoService from "../ToDoService";
import ToDoTypes from "../ToDo";


interface PropTypes {
  setTodos: Dispatch<SetStateAction<ToDoTypes[]>>;
}

const ToDoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = ToDoService.addTodos(newTodoText);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <div className="inputForm">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus
        placeholder="Add a Task"
      />
      <button onClick={handleAddTodo}>Add Task</button> {/* ✅ Button to trigger function */}
    </div>
  );
};

export default ToDoForm;