import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCoursesService } from "../../../utilities/courses-service";

const CourseList = ({
  selectedCourse,
  setSelectedCourse,
  setSelectedTee,
  selectedCourseType,
  setSelectedCourseType,
}) => {
  const [courseList, setCourseList] = useState([]);
  const courseTypes = ["full", "front", "back"];

  const fetchCourses = async () => {
    try {
      const courses = await getCoursesService();
      setCourseList(courses);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const handleSelectCourse = (e) => {
    setSelectedCourse(courseList[e.target.value]);
    setSelectedTee("");
  };

  const handleSelectCourseType = (e) => {
    setSelectedCourseType(e.target.value);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <h1 className="block text-sm font-medium text-white pt-4 px-4">
        Select a course:
      </h1>
      <fieldset className="space-y-4 px-2">
        <legend className="sr-only">Course List</legend>

        {courseList.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          courseList?.map((course, idx) => (
            <div key={course._id}>
              <input
                type="radio"
                name="CourseOption"
                value={idx}
                id={course._id}
                className="peer hidden [&:checked_+_label_svg]:block"
                checked={selectedCourse?.course_name === course.course_name}
                onChange={handleSelectCourse}
              />

              <label
                htmlFor={course._id}
                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="hidden h-5 w-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-gray-700">{course.course_name}</p>
                </div>
              </label>
            </div>
          ))
        )}
      </fieldset>
      {Object.keys(selectedCourse).length > 0 && (
        <>
          <h1 className="block text-sm font-medium text-white pt-4 px-4">
            Select course type:
          </h1>
          <fieldset className="grid grid-cols-3 gap-4 px-2 pt-4">
            <legend className="sr-only">Course Type List</legend>
            {courseTypes.map((type) => (
              <div key={type}>
                <input
                  type="radio"
                  name="CourseTypeOption"
                  value={type}
                  id={type}
                  className="peer hidden [&:checked_+_label_svg]:block"
                  checked={selectedCourseType === type}
                  onChange={handleSelectCourseType}
                />

                <label
                  htmlFor={type}
                  className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">{type}</p>

                    <svg
                      className="hidden h-5 w-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            ))}
          </fieldset>
        </>
      )}
    </>
  );
};

export default CourseList;
