export default function ControlWidget({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <div className="px-4 py-8 rounded-md border-2 border-slate-900 bg-white shadow-lg">
      {children}
    </div>
  )
}