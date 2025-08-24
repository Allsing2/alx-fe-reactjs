import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="add-todo-form"
      className="flex gap-2 mb-4"
    >
      <label htmlFor="new-todo" className="sr-only">
        New Todo
      </label>
      <input
        id="new-todo"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button
        type="submit"
        aria-label="add-button"
        className="rounded-lg px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium transition"
      >
        Add
      </button>
    </form>
  );
}
