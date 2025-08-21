import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <TodoList />
    </div>
  );
};

export default App;
