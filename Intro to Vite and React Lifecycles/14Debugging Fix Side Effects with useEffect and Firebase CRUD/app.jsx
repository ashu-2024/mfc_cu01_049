import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config'; // Assume correct config here.

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('tasks')
      .onSnapshot(snapshot => {
        const newTasks = snapshot.docs.map(doc => doc.data());
        setTasks(newTasks);
      });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to fetch data once when component mounts.

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
