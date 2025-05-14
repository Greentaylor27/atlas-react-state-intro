import { useEffect, useState } from 'react';


export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch('/api/courses.json')
    .then((res) => res.json())
    .then((data) => setCourses(data));
  }, []);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses
            .filter(courses => 
              courses.courseName.toLowerCase().includes(filter.toLowerCase()) ||
              courses.courseNumber.toLowerCase().includes(filter.toLowerCase())
            )
            .map((courses, index) => (
            <tr key={index}>
              <td>{courses.trimester}</td>
              <td>{courses.courseNumber}</td>
              <td>{courses.courseName}</td>
              <td>{courses.semesterCredits}</td>
              <td>{courses.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
