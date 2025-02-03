"use client";

import { useState } from "react";

type Ttask = { title: string; details: string };

export default function Home() {
  const [tasks, setTasks] = useState<Ttask[]>([]);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [edit, setEdit] = useState<number | null>(null);

  const addTask = () => {
    if (title.trim() === "" || details.trim() === "") return;

    if (edit !== null) {
      const updateTask = [...tasks];
      updateTask[edit] = { title, details };
      setTasks(updateTask);
      setEdit(null);
    } else {
      setTasks([...tasks, { title, details }]);
    }

    setDetails("");
    setTitle("");
  };

  const editTask = (index: number) => {
    setTitle(tasks[index].title);
    setDetails(tasks[index].details);
    setEdit(index);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main className="flex justify-center items-center h-screen bg-sky-200 px-2.5 mx-auto">
      <div className="w-full max-w-screen-xl mx-auto bg-sky-300 py-10 px-5 rounded-lg">
        <h1 className=" text-xl md:text-3xl font-bold text-sky-600 text-center">
          Task Management Application
        </h1>

        {/* Task length  */}
        <p className="text-center mt-2 font-bold text-slate-500 text-lg">
          Total Task: {tasks.length.toLocaleString()}
        </p>
        <hr className="my-3" />

        {/* Input section */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 ">
          <div className="flex flex-col w-full md:w-1/2 mx-auto  sm:p-5 space-y-2 ">
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
                  className="bg-sky-100 p-5 rounded-md space-y-1 shadow-md"
                >
                  <h1 className="font-bold text-base md:text-xl">
                    {task.title}
                  </h1>
                  <p className="text-[14px] md:text-base pb-2">
                    {task.details}
                  </p>
                  <div className="flex items-center gap-2 md:gap-4 ">
                    {/* Edit Task */}

                    <button
                      onClick={() => editTask(i)}
                      className="bg-green-500 rounded px-3 py-1 text-white text-xs sm:text-[14px]"
                    >
                      Edit
                    </button>

                    {/* Remove Task */}

                    <button
                      onClick={() => removeTask(i)}
                      className="bg-red-500 rounded px-3 py-1 text-white text-xs sm:text-[14px]"
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
