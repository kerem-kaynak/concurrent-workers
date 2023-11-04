"use client";
import { trpc } from "../_trpc/client"
import { useState } from "react"

export default function CreateWorker() {
  const utils = trpc.useUtils()
  const createWorker = trpc.createWorker.useMutation({
    onSuccess: () => {
      utils.getAllWorkers.refetch()
    }
  })
  const [concurrency, setConcurrency] = useState(1)
  

  return (
    <div className="flex flex-col justify-center">
      <label htmlFor="content" className="font-bold">Set Concurrency</label>
      <input
        id="content"
        type="number"
        onChange={(e) => {
          if (parseInt(e.target.value) > 0) {
            setConcurrency(parseInt(e.target.value))
          }}}
        className="text-black bg-white rounded-md border border-slate-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
      />
      <button
        onClick={async () => {
            createWorker.mutate(concurrency)
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-full"
      >
        Add New Worker
      </button>
    </div>
  )
}