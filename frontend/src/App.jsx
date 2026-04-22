import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const fetchData = async () => {
    const res = await axios.get(`${API}/api/data`);
    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post(`${API}/api/data`, { name });
    setName("");
    fetchData();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/api/data/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Full Stack App</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name}
            <button onClick={() => deleteItem(i.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
