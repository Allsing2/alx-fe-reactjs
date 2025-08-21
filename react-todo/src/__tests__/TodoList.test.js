import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component Tests", () => {
  // 1. Initial render
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

  // 2. Adding Todos
  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Enter new todo/i);
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo Item")).toBeInTheDocument();
  });

  // 3. Toggling Todos
  test("toggles a todo between completed and not completed", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");

    // Initial state
    expect(todo).toHaveStyle("text-decoration: none");

    // Toggle completed
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: line-through");

    // Toggle back
    fireEvent.click(todo);
    expect(todo).toHaveStyle("text-decoration: none");
  });

  // 4. Deleting Todos
  test("deletes a todo item", () => {
    render(<TodoList />);
    const todo = screen.getByText("Build a Todo App");
    const deleteButton = screen.getAllByText("Delete")[1]; // second todo

    fireEvent.click(deleteButton);
    expect(screen.queryByText("Build a Todo App")).not.toBeInTheDocument();
  });
});