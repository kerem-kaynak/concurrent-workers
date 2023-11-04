"use client";

import { trpc } from "../_trpc/client"
import { useState, useEffect } from "react"

export default function RunWorker() {
  const utils = trpc.useUtils()
  const { data } = trpc.getAllWorkers.useQuery()
  const runWorker = trpc.runWorker.useMutation({
    onSuccess: () => {
      utils.getAllWorkers.refetch()
    }
  })
  const [workerIdToRun, setWorkerIdToRun] = useState(0)

  useEffect(() => {
    if (data && data.length > 0) {
      setWorkerIdToRun(data[0].id);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center">
      <label htmlFor="content" className="font-bold">Choose Worker to Run</label>
      <select
        name="workers" 
        id="workers"
        value={workerIdToRun}
        onChange={e => setWorkerIdToRun(parseInt(e.target.value))} 
        className="text-black bg-white rounded-md border border-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
      >
        {
          data?.map((worker) => {
            return <option value={worker.id} key={worker.id}>{worker.id}</option>
          }) 
        }
      </select>
      <button
        onClick={() => {
          if (workerIdToRun) {
            runWorker.mutate(workerIdToRun)
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-full"
      >
        Run Selected Worker
      </button>
    </div>
  )
}