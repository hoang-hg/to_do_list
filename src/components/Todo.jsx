import React from "react";
import { useEffect, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import timeline from "../assets/timeline.png"
import night from "../assets/night.png";
import sun from "../assets/sun-and-moon.png";
import TodoItems from "./TodoItems";
import { useRef } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'complete', 'incomplete'
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  }); // Dark mode state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      alert("Emty Task");
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      createdAt: new Date(),
      status: "To do",
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id != id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          const newStatus = todo.isComplete ? "To do" : "Complete";
          return { ...todo, isComplete: !todo.isComplete, status: newStatus };
        }
        return todo;
      });
    });
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const filterTodos = (todos) => {
    if (filter === "complete") {
      return todos.filter((todo) => todo.isComplete);
    } else if (filter === "incomplete") {
      return todos.filter((todo) => !todo.isComplete);
    }
    return todos;
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`place-self-center w-11/12 max-w-[700px] flex flex-col p-7 min-h-[700px] rounded-xl ${
        darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <img
        onClick={() => setDarkMode(!darkMode)}
        src={darkMode ? sun : night}
        alt="Dark Mode Toggle"
        className="absolute top-4 right-4 w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-110"
      />
      {/*Title */}
      <div
        className={`flex justify-center items-center mt-7 gap-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <img className="w-8" src={darkMode ? timeline : todo_icon} alt="Todo icon" />
        <h1 className="text-3xl font-semibold">
          {darkMode ? "To-Do-List" : "To-Do-List"}
        </h1>
      </div>

      {/* input box */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none
                flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 text-black"
          type="text"
          placeholder="Add your task"
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              add();
            }
          }}
        />
        <button
          onClick={add}
          className="border-spacing-4 rounded-full
                bg-red-600 w-32 h-14 text-white text-lg font-medium cursor-pointer hover:bg-red-700 trasition-all duration-300"
        >
          ADD +
        </button>
      </div>

      {/* Filter Dropdown */}
      <div
        className={`relative mt-4 `}
      >
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`bg-gray-200 rounded-md p-2 w-30 flex justify-between ${
            darkMode ? "text-white bg-red-600" : "text-black"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
          <span className="material-icons">arrow_drop_down</span>{" "}
          {/* Biểu tượng mũi tên */}
        </button>
        {isDropdownOpen && (
          <div
            className={`absolute shadow-lg rounded-md mt-1 z-10 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => {
                setFilter("all");
                setIsDropdownOpen(false);
              }}
              className={`block px-4 py-2 ${
                darkMode ? "text-white" : "text-black"
              } ${filter === "all" ? "font-bold" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilter("incomplete");
                setIsDropdownOpen(false);
              }}
              className={`block px-4 py-2 ${
                darkMode ? "text-white" : "text-black"
              } ${filter === "incomplete" ? "font-bold" : ""}`}
            >
              Incomplete
            </button>
            <button
              onClick={() => {
                setFilter("complete");
                setIsDropdownOpen(false);
              }}
              className={`block px-4 py-2 ${
                darkMode ? "text-white" : "text-black"
              } ${filter === "complete" ? "font-bold" : ""}`}
            >
              Complete
            </button>
          </div>
        )}
      </div>

      {/* To-do-list */}
      <div className="overflow-x-auto">
        <table
          className={`w-full mt-4 ${darkMode ? "text-white" : "text-black"}`}
        >
          <thead>
            <tr
              className={`border-b ${
                darkMode ? "border-gray-600" : "border-gray-300"
              }`}
            >
              <th className="text-center p-2 w-12">ID</th>
              <th className="text-center p-2 w-60">Task</th>
              <th className="text-center p-2 w-28">Times</th>
              <th className="text-center p-2 w-28">Status</th>
              <th className="text-center p-2 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterTodos(todoList).map((item, index) => (
              <TodoItems
                key={item.id}
                text={item.text}
                index={index + 1}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
                createdAt={ new Date(item.createdAt)}
                darkMode={darkMode}
                isEditing={editingId === item.id}
                editText={editText}
                setEditText={setEditText}
                saveEdit={saveEdit}
                startEditing={startEditing}
                status={item.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
