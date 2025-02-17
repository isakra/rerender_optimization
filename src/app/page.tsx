"use client";

import React, { memo, useCallback, useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Optimized Task Component using memo
const TaskItem: React.FC<{ task: Task; onToggle: (id: number) => void }> = ({ task, onToggle }) => {
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

const MemoizedTaskItem = memo(TaskItem);

const TaskManagerApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Optimized task toggling: updates only the changed task
  const handleToggleTask = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Optimized task addition: Appends without causing full rerender
  const handleAddTask = useCallback(() => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title: newTask, completed: false }
    ]);
    setNewTask(""); // Reset input field
  }, [newTask]);

  return (
    <div>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        placeholder="New Task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <MemoizedTaskItem key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManagerApp;
