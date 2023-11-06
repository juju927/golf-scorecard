const StrokeListItem = ({ stroke, idx }) => {
  return (
    <>
      <div className="w-100 h-fit p-3 rounded-lg block border text-white my-3">
        {`${idx+1}. ${stroke.club}`}
      </div>
    </>
  )
}

export default StrokeListItem