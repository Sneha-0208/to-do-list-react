import React, { useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoTypes from "../ToDo";
import ToDoService from "../ToDoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "../CSS/ToDoList.css";

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ToDoTypes[]>(ToDoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [EditedTodoText, setEditedTodoText] = useState<string>("");

  // Function to toggle task completion
  const handleToggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function for handling edit actions
  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (EditedTodoText.trim() !== "") {
      const updatedTodo = ToDoService.updateTodo({
        id,
        text: EditedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  // Function to delete todo
  const handleDeleteTodo = (id: number) => {
    ToDoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todoContainer">
      <div>
        <ToDoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <div className="items" key={todo.id}>
            <button
              onClick={() => handleToggleComplete(todo.id)}
              style={{ color: todo.completed ? "green" : "gray" }}
            >
              <FaCheck />
            </button>
            {editingTodoId === todo.id ? (
              <div className="editedText">
                <input
                  type="text"
                  value={EditedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button onClick={handleEditCancel}>
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
