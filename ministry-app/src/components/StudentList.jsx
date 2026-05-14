import Student from "./Student";
import StudentActions from "./StudentActions";

function StudentList({ students, searchQuery, dispatch }) {
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="studentList">
      {filteredStudents.length > 0 ? (
        filteredStudents.map((student) => (
          <Student key={student.id}>
            <div className="student">
              <h1 className="headingSecondary">{student.name}</h1>
              <p className="textSmall">{student.location}</p>
              <h3 className="headingTertiary">Study material</h3>
              <div className="studyDetails">
                <p className=" detail">Lesson 2</p>
                <p className=" detail">{student.studyMaterial}</p>
              </div>
              <StudentActions student={student} dispatch={dispatch} />
            </div>
          </Student>
        ))
      ) : (
        <p>No Students</p>
      )}
    </div>
  );
}

export default StudentList;
