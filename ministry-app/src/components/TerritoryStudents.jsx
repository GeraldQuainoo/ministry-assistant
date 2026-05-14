import Student from "./Student";
import StudentList from "./StudentList";

function territoryStudents() {
  const students = JSON.parse(localStorage.getItem("students"));
  console.log(students);
  return (
    <div className="territoryStudents">
      {students.length > 0 ? (
        students.map((student, i) => <Student key={i} />)
      ) : (
        <p>No students yet</p>
      )}
    </div>
  );
}

export default territoryStudents;
