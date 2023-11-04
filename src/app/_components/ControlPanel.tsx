import ControlWidget from "./ControlWidget"
import CreateWorker from "./CreateWorker"
import CreateTask from "./CreateTask"
import DeleteWorker from "./DeleteWorker"
import RunWorker from "./RunWorker"


export default function ControlPanel() {
  return (
    <div className="flex flex-col gap-8 px-4 py-8">
      <ControlWidget>
        <CreateWorker />
      </ControlWidget>
      <ControlWidget>
        <CreateTask />
      </ControlWidget>
      <ControlWidget>
        <RunWorker />
      </ControlWidget>
      <ControlWidget>
        <DeleteWorker />
      </ControlWidget>
    </div>
  )
}