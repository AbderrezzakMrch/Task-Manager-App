import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Task Dashboard</h2>
      <form onSubmit={addTask} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success w-100">Add Task</button>
      </form>

      <ul className="list-group mt-4">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
