import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; // Import firestore
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("not-started"); // Default to "not-started"
  const [taskCount, setTaskCount] = useState({ completed: 0, ongoing: 0, notStarted: 0 });

  // Fetch tasks in real-time with Firestore onSnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'tasks'), (snapshot) => {
      const fetchedTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
      updateTaskCount(fetchedTasks);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Update task counts based on status
  const updateTaskCount = (tasks) => {
    const counts = { completed: 0, ongoing: 0, notStarted: 0 };
    tasks.forEach(task => {
      counts[task.status] += 1;
    });
    setTaskCount(counts);
  };

  // Add new task
  const addTask = async () => {
    if (taskName) {
      await addDoc(collection(firestore, 'tasks'), {
        name: taskName,
        status: taskStatus,
      });
      setTaskName("");
    }
  };

  // Edit task name
  const editTask = async (id, newName) => {
    const taskRef = doc(firestore, 'tasks', id);
    await updateDoc(taskRef, { name: newName });
  };

  // Delete task
  const deleteTask = async (id) => {
    const taskRef = doc(firestore, 'tasks', id);
    await deleteDoc(taskRef);
  };

  return (
    <div>
      <Navbar taskCount={taskCount} />
      <div>
        <h2>Add a Task</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <select onChange={(e) => setTaskStatus(e.target.value)} value={taskStatus}>
          <option value="not-started">Not Started</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
};

const Navbar = ({ taskCount }) => {
  return (
    <nav>
      <div className="navbar">
        <div className="card">
          <h3>Completed</h3>
          <p>{taskCount.completed}</p>
        </div>
        <div className="card">
          <h3>Ongoing</h3>
          <p>{taskCount.ongoing}</p>
        </div>
        <div className="card">
          <h3>Not Started</h3>
          <p>{taskCount.notStarted}</p>
        </div>
      </div>
    </nav>
  );
};

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

const TaskCard = ({ task, editTask, deleteTask }) => {
  const [newName, setNewName] = useState(task.name);

  return (
    <div className="task-card">
      <p>{task.name}</p>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Edit task name"
      />
      <button onClick={() => editTask(task.id, newName)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskManager;
