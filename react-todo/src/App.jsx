import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">React Todo</h1>
        <TodoList />
      </div>
    </div>
  );
}
