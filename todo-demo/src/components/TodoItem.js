import React, { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleUpdate = () => {
        if (!editText.trim()) return;
        updateTodo(todo.id, editText);
        setIsEditing(false);
    };

    const isOverdue = (todo) => {
        if (!todo.dueDate || todo.completed) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(todo.dueDate);
        due.setHours(0, 0, 0, 0);

        return due < today;
    };


    return (
        <li className={isOverdue(todo) ? "overdue" : ""}>


            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <div className="todo-text">
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            className={todo.completed ? "completed" : ""}
                        >
                            {todo.text}
                        </span>

                        {/* show date */}
                        {todo.dueDate && (
                            <div className="date">
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                            </div>
                        )}
                    </div>

                    <div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button
                            className="delete-btn"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}

        </li>
    );
}

export default TodoItem;
