import { useEffect, useReducer } from "react";
import AddStudentForm from "./AddStudentForm";
import Header from "./Header";
import Search from "./Search";
import StudentList from "./StudentList";

const savedStudents = localStorage.getItem("students");
const initialState = {
  openForm: false,
  students: !savedStudents ? [] : JSON.parse(savedStudents),
  searchQuery: "",
  editingStudent: null,
};

function reducer(state, action) {
  if (action.type === "openForm") {
    return { ...state, openForm: true };
  }
  if (action.type === "closeForm") {
    return { ...state, openForm: false };
  }
  if (action.type === "addStudent") {
    return {
      ...state,
      students: [...state.students, action.payload],
    };
  }
  if (action.type === "query") {
    return {
      ...state,
      searchQuery: action.payload,
    };
  }
  if (action.type === "deleteStudent") {
    return {
      ...state,
      students: state.students.filter(
        (student) => student.id !== action.payload,
      ),
    };
  }
  if (action.type === "editStudent") {
    return {
      ...state,
      editingStudent: action.payload,
      openForm: true,
    };
  }
  if (action.type === "updateStudent") {
    return {
      ...state,
      students: state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student,
      ),
      editingStudent: null,
      openForm: false,
    };
  }
  return state;
}

function MyStudents() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchQuery, openForm, students, editingStudent } = state;

  useEffect(
    function () {
      localStorage.setItem("students", JSON.stringify(students));
    },
    [students],
  );

  return (
    <div className="myStudentBox">
      <Header>
        <div className="header">
          <div className="headerTop">
            <h1 className="headingPrimary">My Students</h1>
            <span>
              <i className="fa-solid fa-filter"></i>
            </span>
          </div>
          <Search type="normal" searchQuery={searchQuery} dispatch={dispatch} />
        </div>
      </Header>
      <StudentList
        students={students}
        searchQuery={searchQuery}
        dispatch={dispatch}
      />
      {openForm && (
        <AddStudentForm dispatch={dispatch} editingStudent={editingStudent} />
      )}
      <button
        onClick={() => dispatch({ type: "openForm" })}
        className="addStudentIcon"
      >
        <i className="fa-solid fa-user-plus"></i>
      </button>
    </div>
  );
}

export default MyStudents;
