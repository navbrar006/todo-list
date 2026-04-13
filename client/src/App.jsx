import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7000";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;
    await axios.post(`${API}/todos`, { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📝 Todo App</h1>

      <input
        value={text}
        placeholder="Enter task"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <ul style={{ marginTop: "20px" }}>
        {todos.map((t) => (
          <li key={t._id} style={{ marginBottom: "10px" }}>
            {t.text}
            <button
              onClick={() => deleteTodo(t._id)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;