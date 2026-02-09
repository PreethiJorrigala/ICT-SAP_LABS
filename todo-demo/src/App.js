import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

  /* ---------- LOAD TODOS FROM LOCAL STORAGE ---------- */
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  /* ---------- FILTER STATE ---------- */
  const [filter, setFilter] = useState("all");

  const [selectedDate, setSelectedDate] = useState("");


  <div className="filters">
    <button onClick={() => setFilter("all")}>All</button>
    <button onClick={() => setFilter("active")}>Active</button>
    <button onClick={() => setFilter("completed")}>Completed</button>
    <button onClick={() => setFilter("overdue")}>Overdue</button>


    <hr style={{ margin: "10px 0" }} />

    <button onClick={() => setFilter("today")}>Today</button>
    <button onClick={() => setFilter("upcoming")}>Upcoming</button>
    <button onClick={() => setFilter("overdue")}>Overdue</button>
    <button onClick={() => setFilter("nodate")}>No Date</button>
  </div>


  /* ---------- SAVE TODOS TO LOCAL STORAGE ---------- */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* ---------- ADD TODO ---------- */
  const addTodo = (text, date) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      dueDate: date || null,
    };
    setTodos([...todos, newTodo]);
  };


  /* ---------- TOGGLE COMPLETE ---------- */
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /* ---------- DELETE ---------- */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /* ---------- EDIT / UPDATE ---------- */
  const updateTodo = (id, newText, newDate) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, date: newDate } : todo
      )
    );
  };

  /* ---------- CLEAR COMPLETED ---------- */
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  /* ---------- MARK ALL COMPLETE ---------- */
  const markAllComplete = () => {
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));
  };

  /* ---------- FILTER LOGIC ---------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredTodos = todos.filter((todo) => {

    // ===== DATE SEARCH FEATURE =====
    if (filter === "bydate" && selectedDate) {
      if (!todo.dueDate) return false;

      const due = new Date(todo.dueDate);
      due.setHours(0, 0, 0, 0);

      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);

      return due.getTime() === selected.getTime();
    }

    // ===== BASIC FILTERS =====
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;

    // ===== OVERDUE TAB =====
    if (filter === "overdue") {
      if (!todo.dueDate || todo.completed) return false;

      const due = new Date(todo.dueDate);
      due.setHours(0, 0, 0, 0);

      return due < today;
    }

    // IMPORTANT: ALL button unchanged
    return true;
  });




  return (
    <div className="container">
      <h2>Todo List</h2>

      {/* Task Counter */}
      <p>
        {todos.filter(t => !t.completed).length} active / {todos.length} total
      </p>

      {/* Add Form */}
      <TodoForm addTodo={addTodo} />

      {/* Filter Buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <div className="date-search">
        <label>Search by date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setFilter("bydate");
          }}
        />

        <button onClick={() => setSelectedDate("")}>Reset</button>
      </div>

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />

      {/* Extra Actions */}
      <button onClick={markAllComplete}>Mark All Done</button>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;
