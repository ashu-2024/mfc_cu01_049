import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCompletion, setFilterCompletion] = useState('All');

  const addTask = () => {
    if (!taskTitle.trim()) {
      alert('Please enter a task title!');
      return;
    }

    const newTask = {
      title: taskTitle,
      priority: taskPriority,
      completed: false,
    };

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks.sort((a, b) => {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    });

    setTaskTitle('');
    setTaskPriority('Medium');
  };

  const toggleCompletion = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityFilter = filterPriority === 'All' || task.priority === filterPriority;
    const completionFilter =
      filterCompletion === 'All' ||
      (filterCompletion === 'Completed' && task.completed) ||
      (filterCompletion === 'Incomplete' && !task.completed);

    return priorityFilter && completionFilter;
  });

  return (
    <div>
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div>
        <label>Filter by Priority: </label>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Filter by Completion: </label>
        <select
          value={filterCompletion}
          onChange={(e) => setFilterCompletion(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              backgroundColor: task.priority === 'High' ? '#ffcccc' : 'transparent',
            }}
          >
            {task.title} ({task.priority})
            <button onClick={() => toggleCompletion(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
