import { useState } from "react";
import CourseList from "../components/CoursePicker/CourseList";
import Header from "../components/NavBar/Header";
import TeeList from "../components/TeePicker/TeeList";

const NewRecordPage = () => {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedTee, setSelectedTee] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState("full");

  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-900">
      <Header />
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
    </div>
  );
};

export default NewRecordPage;
