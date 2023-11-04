"use client";

import ControlPanel from "./_components/ControlPanel"
import Workers from "./_components/Workers"

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen items-center justify-between bg-white text-black">
      <div className="h-screen w-1/3 border-r-2 border-slate-900 overflow-auto">
        <ControlPanel
        />
      </div>
      <div className="h-screen w-2/3 overflow-auto">
        <Workers />
      </div>
    </main>
  )
}
