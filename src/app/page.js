"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  //tasks = array of {id: string, title: string, completed: boolean}
  const [tasks, setTasks] = useState([]);
  const [allTask, setAllTask] = useState(0);
  const [done, setDone] = useState(0);

  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setAllTask(allTask + 1);
  };

  const deleteTask = (taskId) => {
    // const thisTask = tasks.find((x) => x.id === taskId);
    // setDone(thisTask.completed ? done - 1 : done);
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setDone(newTasks.filter((x) => x.completed).length);
    setTasks(newTasks);
    setAllTask(allTask - 1);
  };

  const toggleDoneTask = (taskId) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);
    //search for a task based on condition
    const task = newTasks.find((x) => x.id === taskId);
    //setDone(task.completed ? done - 1 : done + 1);
    task.completed = !task.completed;
    setTasks(newTasks);
    setDone(newTasks.filter((x) => x.completed).length);
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({allTask}) Done ({done})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2023" fullName="Pubest Ruengkum" studentId="650610798" />
    </div>
  );
}
