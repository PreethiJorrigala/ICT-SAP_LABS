import React, { useState } from "react";

function TodoForm({ addTodo }) {
    const [input, setInput] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // validation
        if (!input.trim() && !date) {
            alert("Please enter task and select date!");
            return;
        }

        if (!input.trim()) {
            alert("Please enter the task!");
            return;
        }

        if (!date) {
            alert("Please select a date!");
            return;
        }

        // add todo
        addTodo(input, date);

        // clear fields
        setInput("");
        setDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;  
