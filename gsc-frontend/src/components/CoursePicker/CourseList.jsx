import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCoursesService } from "../../utilities/courses-service";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const fetchCourses = async () => {
    try {
      const courses = await getCoursesService();
      setCourseList(courses);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

  const handleChange = (e) => {
    console.log(e);
    setSelectedCourse(e.target.value);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <fieldset className="space-y-4 px-2">
        <legend className="sr-only">Course List</legend>

        {courseList.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          courseList?.map((course) => (
            <div key={course._id}>
              <input
                type="radio"
                name="CourseOption"
                value={course.course_name}
                id={course._id}
                className="peer hidden [&:checked_+_label_svg]:block"
                checked={selectedCourse === course.course_name}
                onChange={handleChange}
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
    </>
  );
};

export default CourseList;
