import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders without crashing", () => {
    render(<TodoList />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  });

  test("renders initial demo todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  test("allows user to add a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter new todo/i);
    const addButton = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });

  test("toggles a todo between completed and not completed", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");

    expect(todo).not.toHaveClass("completed");

    fireEvent.click(todo);
    expect(todo).toHaveClass("completed");

    fireEvent.click(todo);
    expect(todo).not.toHaveClass("completed");
  });

  test("deletes a todo item when delete button is clicked", () => {
    render(<TodoList />);
    
    // Ensure "Build a Todo App" exists
    const todo = screen.getByText("Build a Todo App");
    expect(todo).toBeInTheDocument();

    // Find and click the corresponding delete button
    const deleteButton = todo.nextSibling; // button is rendered next to the span
    fireEvent.click(deleteButton);

    // The todo should no longer exist
    expect(screen.queryByText("Build a Todo App")).not.toBeInTheDocument();
  });
});
