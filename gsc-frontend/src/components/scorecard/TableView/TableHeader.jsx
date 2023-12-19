

const TableHeader = () => {
  return (
    <div className="h-12 flex text-white/70 justify-between text-center items-end rounded-t-lg border-b-2 border-white/70 font-semibold capitalize">
        <div className="w-1/6">hole</div>
        <div className="w-1/5">dist</div>
        <div className="w-1/5">index</div>
        <div className="w-1/5">par</div>
        <div className="w-1/6">score</div>
    </div>
  )
}

export default TableHeader