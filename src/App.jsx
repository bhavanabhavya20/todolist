import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>✅ React To-Do List</h1>

        <div style={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addButton}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((t) => (
            <li key={t.id} style={styles.listItem}>
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "green" : "black",
                  fontWeight: t.completed ? "bold" : "normal",
                }}
              >
                {t.text}
              </span>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => toggleTask(t.id)}
                  style={t.completed ? styles.unreadButton : styles.readButton}
                >
                  {t.completed ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
                  style={styles.deleteButton}
                >
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  // Full-page background
  page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  // To-do box
  container: {
    width: "90%",
    maxWidth: "500px",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.85)", // glass effect
    backdropFilter: "blur(10px)",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  },

  title: { fontSize: "26px", marginBottom: "20px", color: "#333" },

  inputWrapper: { display: "flex", gap: "10px", justifyContent: "center" },

  input: {
    padding: "10px",
    width: "70%",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  addButton: {
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },

  list: { listStyle: "none", padding: 0, marginTop: "20px" },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },

  buttonGroup: {
    display: "flex",
    gap: "8px",
  },

  readButton: {
    background: "green",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  unreadButton: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
