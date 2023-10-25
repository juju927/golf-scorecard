import SingleStep from "./SingleStep"


const Steps = () => {

  return (
    <div>
        <h2 className="sr-only">Steps</h2>
        <div>
          <ol className="w-screen flex justify-center gap-2 text-xs font-medium text-gray-500 sm:gap-4">
            <SingleStep number="1" title="Choose course" isComplete={true} />
            <SingleStep number="2" title="Settings" isComplete={false} />
            <SingleStep number="3" title="Moar Settings" isComplete={false} />
          </ol>
        </div>
      </div>
  )
}

export default Steps