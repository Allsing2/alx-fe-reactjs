import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

const initialTodos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Wire up Tailwind", completed: true },
  { id: 3, title: "Write tests", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (title) => {
    setTodos((prev) => [...prev, { id: Date.now(), title, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />

      {todos.length === 0 ? (
        <p
          role="status"
          aria-label="empty-message"
          className="text-center text-gray-500 py-6"
        >
          No todos — add your first task!
        </p>
      ) : (
        <ul role="list" aria-label="todo-list" className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              role="listitem"
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
            >
              <button
                aria-label={`toggle-${todo.title}`}
                aria-pressed={todo.completed}
                onClick={() => toggleTodo(todo.id)}
                className={`text-left flex-1 ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
              >
                {todo.title}
              </button>

              <button
                aria-label={`delete-${todo.title}`}
                onClick={() => deleteTodo(todo.id)}
                className="ml-3 rounded-lg border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
