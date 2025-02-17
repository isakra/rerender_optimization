"use client";

import React, { memo, useCallback, useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Task component (inefficient)
const TaskItem: React.FC<{ task: Task; onToggle: (id: number) => void }> = ({
  task,
  onToggle,
}) => {
  console.log(`Rendering Task: ${task.title}`);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.title}
      </label>
    </li>
  );
};

const MemoizedTaskItem = memo(TaskItem)

const TaskManagerApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      title: `Task ${i}`,
      completed: false,
    }))
  );

  const [newTask, setNewTask] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleAddTask = () => {
    const toBeAddedTask = { id: tasks.length, title: newTask, completed: false };
    setTasks((prev) => [...prev, toBeAddedTask
    ]);
    setNewTask("");
  };

  const handleToggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [])

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  console.log("App rendered");

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="New task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {filteredTasks.map((task) => (
          <MemoizedTaskItem key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManagerApp;
