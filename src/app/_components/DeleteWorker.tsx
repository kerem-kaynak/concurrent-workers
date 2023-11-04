"use client";

import { useState, useEffect } from 'react'
import { trpc } from '../_trpc/client'

export default function DeleteWorker() {
  const utils = trpc.useUtils()
  const { data } = trpc.getAllWorkers.useQuery()
  const [workerIdToDelete, setWorkerIdToDelete] = useState(0)
  useEffect(() => {
    if (data && data.length > 0) {
      setWorkerIdToDelete(data[0].id);
    }
  }, [data]);
  const deleteWorker = trpc.deleteWorker.useMutation({
    onSuccess: () => {
      utils.getAllWorkers.refetch()
    }
  })
  return (
    <div className="flex flex-col justify-center">
      <label htmlFor="content" className="font-bold">Choose Worker to Delete</label>
      <select
        name="finishedWorkers" 
        id="finishedWorkers"
        value={workerIdToDelete}
        onChange={e => {setWorkerIdToDelete(parseInt(e.target.value))}} 
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
          if (workerIdToDelete) {
            deleteWorker.mutate(workerIdToDelete)
          }
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-full"
      >
        Delete Selected Worker
      </button>
    </div>
  )
}