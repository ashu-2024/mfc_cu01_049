import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios
      .get("https://your-firebase-db.firebaseio.com/tasks.json")
      .then((response) => {
        const taskData = response.data;
        // Firebase data is usually nested under keys, so we need to parse it into an array
        const tasksArray = Object.keys(taskData).map((key) => ({
          id: key, 
          name: taskData[key].name
        }));
        setTasks(tasksArray);
      })
      .catch((error) => {
        setError("Error fetching tasks: " + error.message);
        console.log("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li> // Ensure each task has a unique key
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
