import { useEffect, useState } from 'react';


export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  const sortedCourses = [...courses].sort((a, b) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    
    if (typeof aVal === "string") {
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    
    return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
  });
  
  const totalPages = Math.ceil(
    sortedCourses.filter(course =>
      course.courseName.toLowerCase().includes(filter.toLowerCase()) ||
      course.courseNumber.toLowerCase().includes(filter.toLowerCase())
    ).length / itemsPerPage
  );

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
            <th onClick={() => handleSort("trimester")} style={{ cursor: "pointer"}}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")} style={{ cursor: "pointer"}}>Course Number</th>
            <th onClick={() => handleSort("courseName")} style={{ cursor: "pointer"}}>Courses Name</th>
            <th onClick={() => handleSort("semesterCredits")} style={{ cursor: "pointer"}}>Semester Credits</th>
            <th onClick={() => handleSort("totalClockHours")} style={{ cursor: "pointer"}}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses
            .filter(courses => 
              courses.courseName.toLowerCase().includes(filter.toLowerCase()) ||
              courses.courseNumber.toLowerCase().includes(filter.toLowerCase())
            )
            .slice(startIndex, endIndex)
            .map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={{ cursor: "pointer"}}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ cursor: "pointer"}}>Next</button>
      </div>
    </div>
  );
}
