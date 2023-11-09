import { useState } from "react";
import CourseList from "../components/CoursePicker/CourseList";
import TeeList from "../components/TeePicker/TeeList";
import toast from "react-hot-toast"
import { startNewRoundService } from "../utilities/rounds-service";
import { currentRoundRecordAtom } from "../utilities/atom";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";


const NewRoundPage = () => {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedTee, setSelectedTee] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("full");

  const setCurrentRound = useSetAtom(currentRoundRecordAtom)

  const navigate = useNavigate()

  const handleStartRound = async () => {
    try {
      const newRound = await startNewRoundService({
        course_id: selectedCourse._id,
        tee: selectedTee,
        round_type: selectedCourseType
      })
      setCurrentRound(newRound)

      toast.success(`New round started!`)
      navigate(`/record/hole/${newRound.round_record[0].hole_num}`)
    } catch (err) {
      toast.error(`${err.message}`);
    }
  }

  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-900">
      <TopHeader header="Record" />
      <CourseList
        setSelectedCourse={setSelectedCourse}
        setSelectedTee={setSelectedTee}
        selectedCourse={selectedCourse}
        setSelectedCourseType={setSelectedCourseType}
        selectedCourseType={selectedCourseType}
      />
      {Object.keys(selectedCourse).length > 0 && (
        <TeeList
          selectedCourse={selectedCourse}
          selectedTee={selectedTee}
          setSelectedTee={setSelectedTee}
        />
      )}
      {selectedTee && (
        <div className="block pt-10 px-4 flex justify-center">
        <div
          className="inline-flex cursor-pointer items-center gap-2 rounded border border-teal-600 bg-teal-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          onClick={handleStartRound}
        >
          <span className="text-sm font-medium"> Start Game </span>

          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
        </div>
      )}
    </div>
  );
};

export default NewRoundPage;
