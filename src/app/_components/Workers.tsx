"use client";

import { trpc } from "../_trpc/client"
import LoadingSpinner from "./LoadingSpinner"

export const Workers: React.FC = () => {
  const { data, isLoading, isRefetching } = trpc.getAllWorkers.useQuery()
  const utils = trpc.useUtils()
  const allWorkers = data?.map((worker) => {
    return {
      id: worker.id,
      concurrency: worker.concurrency,
      status: worker.status,
      tasks: worker.tasks.map((task) => {
        return {
          workerId: task.workerId,
          task: {
            id: task.id,
            name: task.name,
            status: task.status,
            timeCost: task.timeCost,
          },
        }
      }),
    }
  })
  const sortedWorkers = allWorkers?.sort((a, b) => { return a.id - b.id })

  return (
    
      (isLoading || isRefetching) ? <LoadingSpinner /> : 
      <div className="w-full px-8 flex flex-col py-16 justify-center">
            <div className="flex flex-col gap-8">
            {sortedWorkers?.map((worker) => {
              return <div key={worker.id} className="flex flex-col justify-center border-2 rounded-md border-black">
                <div className="flex flex-row justify-between border-b border-black">
                  <p className="font-bold mx-1 my-1 px-2 bg-blue-400 rounded-lg">Worker {worker.id}</p>
                  <p className="font-bold mx-1 my-1 px-2 bg-blue-400 rounded-lg">Concurrency = {worker.concurrency}</p>
                  {(worker.status == 'pending') && <p className="font-bold bg-red-400 mx-1 my-1 rounded-lg px-2">{worker.status.toUpperCase()}</p>}
                  {(worker.status == 'running') && <p className="font-bold bg-yellow-400 mx-1 my-1 rounded-lg px-2">{worker.status.toUpperCase()}</p>}
                  {(worker.status == 'done') && <p className="font-bold bg-green-400 mx-1 my-1 rounded-lg px-2">{worker.status.toUpperCase()}</p>}
                </div>
                <div className="flex flex-row items-stretch">
                  <div className="flex flex-col items-center w-1/3 h-full">
                    <h3 className="font-bold">Pending Tasks:</h3>
                    <ul>
                      {worker.tasks.filter(task => task.task.status == 'pending').map((task) => {
                        return <li key={task.task.id}>{task.task.name}</li>
                      })}
                    </ul>
                  </div>
                  <div className="flex flex-col items-center w-1/3 h-full">
                    <h3 className="font-bold">Running Tasks:</h3>
                    <ul>
                      {worker.tasks.filter(task => task.task.status == 'running').map((task) => {
                        return <li key={task.task.id}>{task.task.name}</li>
                      })}
                    </ul>
                  </div>
                  <div className="flex flex-col items-center w-1/3 h-full">
                    <h3 className="font-bold">Done Tasks:</h3>
                    <ul>
                      {worker.tasks.filter(task => task.task.status == 'done').map((task) => {
                        return <li key={task.task.id}>{task.task.name}</li>
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            })}
          </div>
          <button
          className="bg-blue-400 rounded-lg px-2 py-1 mt-8 font-bold"
          onClick={() => {
            utils.getAllWorkers.refetch()
          }}>
            Refresh Workers
        </button>
      </div>
      

  )
}

export default Workers