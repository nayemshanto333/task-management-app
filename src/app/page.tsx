"use client";

import { useEffect, useState } from "react";

type Ttask = { title: string; details: string; completed: boolean };

export default function Home() {
  const [tasks, setTasks] = useState<Ttask[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [edit, setEdit] = useState<number | null>(null);
  const [error, setError] = useState("");

  // data load
  useEffect(() => {
    try {
      const savedTask = localStorage.getItem("tasks");
      if (savedTask) {
        setTasks(JSON.parse(savedTask));
      }
    } catch (error) {
      console.error("loading error from localStorage", error);
      setTasks([]);
    }
  }, []);

  // data save

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Saving error from localStorage", error);
    }
  }, [tasks]);

  // Tasks add

  const addTask = () => {
    if (title.trim() === "" || details.trim() === "") {
      setError(`Title & Details can't be empty!`);
      return;
    }
    setError("");
    if (edit !== null) {
      const updateTask = [...tasks];
      updateTask[edit] = {
        title,
        details,
        completed: updateTask[edit].completed,
      };
      setTasks(updateTask);
      setEdit(null);
    } else {
      setTasks([...tasks, { title, details, completed: false }]);
    }

    setDetails("");
    setTitle("");
  };

  const editTask = (index: number) => {
    setTitle(tasks[index].title);
    setDetails(tasks[index].details);
    setEdit(index);
    setError("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completedCheckBox = (index: number) => {
    const updateTasks = [...tasks];
    updateTasks[index].completed = !updateTasks[index].completed;
    setTasks(updateTasks);
  };

  return (
    <main className="flex justify-center items-center h-screen bg-sky-200 px-2.5 mx-auto">
      <div className="w-full max-w-screen-xl mx-auto bg-sky-300 py-10 px-5 rounded-lg">
        <h1 className=" text-xl md:text-3xl font-bold text-sky-600 text-center">
          Task Management Application
        </h1>

        {/* Task length  */}
        <div className="flex justify-around items-center">
          <p className="text-center mt-2 font-bold text-slate-500 text-lg">
            Total Task: {tasks.length.toLocaleString()}
          </p>
          <p className="text-center mt-2 font-bold text-slate-500 text-lg">
            Pending Task: {tasks.filter((task)=>!task.completed).length}
          </p>
          <p className="text-center mt-2 font-bold text-slate-500 text-lg">
            Complete Task: {tasks.filter((task)=> task.completed).length}
          </p>
        </div>
        <hr className="my-3" />

        {/* Input section */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 ">
          <div className="flex flex-col w-full md:w-1/2 mx-auto  sm:p-5 space-y-2 bg-sky-100 rounded-md shadow-lg">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title Here..."
              className="text-[14px] md:text-base px-4 py-2 border border-slate-400 bg-sky-100 focus:outline-none focus:ring focus:ring-indigo-300 rounded"
            />
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Details Here..."
              className="text-[14px] md:text-base px-4 py-2 border border-slate-400 bg-sky-100 focus:outline-none focus:ring focus:ring-indigo-300 rounded"
            />
            <button
              onClick={addTask}
              className={`text-[14px] md:text-base bg-indigo-500 text-white  px-6 py-2 active:translate-y-0.5 rounded shadow-lg`}
            >
              {edit !== null ? "Update Task" : "Add New Task"}
            </button>
          </div>
          {/* Output section */}
          <div className="w-full md:w-1/2 mx-auto sm:px-5 space-y-2 ">
            {tasks.length > 0 ? (
              tasks.map((task, i) => (
                <div
                  key={i}
                  className={` p-5 rounded-md space-y-1 shadow-md ${
                    task.completed ? "bg-sky-200" : "bg-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h1
                      className={`font-bold text-base md:text-xl ${
                        task.completed ? "text-sky-400" : ""
                      }`}
                    >
                      {task.title}
                    </h1>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => completedCheckBox(i)}
                      className="w-5 h-5"
                    />
                  </div>
                  <p
                    className={`text-[14px] md:text-base pb-2 ${
                      task.completed ? "text-sky-400 " : ""
                    }`}
                  >
                    {task.details}
                  </p>
                  <div className="flex items-center gap-2 md:gap-4 ">
                    {/* Edit Task */}

                    <button
                      onClick={() => editTask(i)}
                      className={` rounded px-3 py-1 text-white text-xs sm:text-[14px] ${
                        task.completed ? "bg-green-300" : "bg-green-500"
                      }`}
                    >
                      Edit
                    </button>

                    {/* Remove Task */}

                    <button
                      onClick={() => removeTask(i)}
                      className={` rounded px-3 py-1 text-white text-xs sm:text-[14px] ${
                        task.completed ? "bg-red-300" : "bg-red-500"
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className=" text-sky-800 text-center text-base sm:text-lg">
                No Task Avilable
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
