"use client";
import { trpc } from "../_trpc/client"
import { useState } from "react"

export default function CreateTask() {
  const { data } = trpc.getAllWorkers.useQuery()
  const utils = trpc.useUtils()
  const [task, setTask] = useState({
    task: {
      name: "task",
      status: "pending",
      timeCost: 1,
    },
    workerId: 1,
  })
  const createTask = trpc.createTask.useMutation({
    onSuccess: () => {
      utils.getAllWorkers.refetch()
    }
  })

  return (
    <div className="flex flex-col justify-center">
      <label htmlFor="name" className="font-bold">Set Task Name</label>
      <input
        id="name"
        type="text"
        value={task.task.name}
        onChange={(e) => setTask({ ...task, task: { ...task.task, name: e.target.value}})}
        className="text-black bg-white rounded-md border border-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 mb-4"
      />
      <label htmlFor="timeCost" className="font-bold">Set Time Cost</label>
      <input
        id="timeCost"
        type="number"
        value={task.task.timeCost}
        min="1"
        onChange={(e) => setTask({ ...task, task: { ...task.task, timeCost: parseInt(e.target.value)}})}
        className="text-black bg-white rounded-md border border-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2 mb-4"
      />
      <label htmlFor="workerId" className="font-bold">Set Worker ID</label>
      <select
        name="finishedWorkers" 
        id="finishedWorkers"
        value={task.workerId}
        onChange={e => setTask({ ...task, workerId: parseInt(e.target.value)})} 
        className="text-black bg-white rounded-md border border-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
      >
        {
          data?.map((worker) => {
            return <option value={worker.id} key={worker.id}>{worker.id}</option>
          }) 
        }
      </select>
      <button
        onClick={async () => {
            createTask.mutate(task)
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-full"
      >
        Add New Task
      </button>
    </div>
  )
}