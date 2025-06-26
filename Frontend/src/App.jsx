import React, { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectionTodo, setSelectionTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editableTitle, setEditableTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api");
        const data = await response.json();
        setTodos(Array.isArray(data) ? data : data.todos || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // handleAddTodo

  const handleAddTodo = async () => {
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      const data = await response.json();

      setTodos([...todos, data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  // handleDeleteTodo
  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setSelectionTodo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editableTitle,
          description: editDescription
        })
      });
      const data = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
      setIsEditing(false);
      setEditDescription("");
      setEditableTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${id}/complete`, {
        method: "PUT"
      });
      const data = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border-2 w-1/2 h-10"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border-2 w-1/2 h-10"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-2 w-1/2">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              selectionTodo === todo._id ? "bg-blue-50 border-blue-300" : ""
            }`}
            onClick={() => {
              setSelectionTodo(todo._id);
              setEditableTitle(todo.title);
              setEditDescription(todo.description);
              setIsEditing(false);
            }}
          >
            <h3 className="font-medium">{todo.title}</h3>
            <p className="text-sm text-gray-500">
              Description: {todo.description}
            </p>
            <p className="text-sm">
              Status: {todo.completed ? "✅ Completed" : "⏳ Pending"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        {/* <button
          onClick={handleAddTodo}
          className="border-2 bg-blue-500 text-white w-24 h-10"
        >
          Add
        </button> */}
        <button
          onClick={handleAddTodo}
          disabled={!title.trim() || !description.trim()}
          className={`border-2 w-24 h-10 ${
            !title.trim() || !description.trim()
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Add
        </button>

        <button
          disabled={!selectionTodo}
          onClick={() => handleDeleteTodo(selectionTodo)}
          className="border-2 bg-blue-500 text-white w-24 h-10 disabled:opacity-50"
        >
          Delete
        </button>

        <button
          disabled={!selectionTodo}
          onClick={() => handleCompleteTodo(selectionTodo)}
          className="border-2 bg-blue-500 text-white w-24 h-10 disabled:opacity-50"
        >
          Complete
        </button>

        {!isEditing ? (
          <button
            disabled={!selectionTodo}
            onClick={() => setIsEditing(true)}
            className="border-2 bg-blue-500 text-white w-24 h-10 disabled:opacity-50"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => handleConfirmUpdate(selectionTodo)}
            className="border-2 bg-green-500 text-white w-24 h-10"
          >
            Confirm
          </button>
        )}
      </div>

      {isEditing && (
        <div className="mt-4 w-1/2 space-y-2">
          <input
            className="border-2 w-full h-10"
            type="text"
            placeholder="Edit Title"
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
          />
          <input
            className="border-2 w-full h-10"
            type="text"
            placeholder="Edit Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
