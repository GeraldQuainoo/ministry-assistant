import { useEffect, useReducer } from "react";

function AddStudentForm({ dispatch, editingStudent }) {
  const initialState = {
    name: "",
    location: "",
    number: "",
    studyMaterial: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "location":
        return { ...state, location: action.payload };
      case "number":
        return { ...state, number: action.payload };
      case "studyMaterial":
        return { ...state, studyMaterial: action.payload };
      case "reset":
        return { ...initialState };
      case "set":
        return { ...action.payload };
    }
  }
  const [state, setState] = useReducer(reducer, initialState);
  const { name, location, number, studyMaterial } = state;

  useEffect(
    function () {
      if (editingStudent) {
        setState({
          type: "set",
          payload: {
            name: editingStudent.name || "",
            location: editingStudent.location || "",
            number: editingStudent.number || "",
            studyMaterial: editingStudent.studyMaterial || "",
          },
        });
      } else {
        setState({ type: "reset" });
      }
    },
    [editingStudent],
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (editingStudent) {
      dispatch({
        type: "updateStudent",
        payload: {
          ...editingStudent,
          name,
          location,
          number,
          studyMaterial,
        },
      });
    } else {
      dispatch({
        type: "addStudent",
        payload: {
          name,
          location,
          number,
          studyMaterial,
          id: new Date().getTime(),
        },
      });
    }
    setState({ type: "reset" });
  }

  return (
    <div
      className="form-wrapper"
      onClick={() => dispatch({ type: "closeForm" })}
    >
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{editingStudent ? "Edit Student" : "New Student"}</h2>
          <p>
            {editingStudent
              ? "Update the student details."
              : "Fill in the details to enroll a new Student."}
          </p>
        </div>

        <form className="student-form">
          <div className="input-group">
            <input
              value={name}
              onChange={(e) =>
                setState({ type: "name", payload: e.target.value })
              }
              type="text"
              name="fullName"
              required
              placeholder=" "
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              value={location}
              onChange={(e) =>
                setState({ type: "location", payload: e.target.value })
              }
              type="text"
              name="location"
              placeholder=" "
            />
            <label>Location</label>
          </div>
          <div className="input-group">
            <input
              value={number}
              onChange={(e) =>
                setState({ type: "number", payload: e.target.value })
              }
              type="number"
              name="number"
              placeholder=" "
            />
            <label>Number</label>
          </div>

          <div className="input-group">
            <select
              value={studyMaterial}
              onChange={(e) =>
                setState({ type: "studyMaterial", payload: e.target.value })
              }
              name="Study material"
              required
            >
              <option value=""></option>
              <option value="Enjoy Life Forever">Enjoy Life Forever</option>
              <option value="Lesson From The Bible">
                Lesson From The Bible
              </option>
              <option value="Young people ask">Young people ask</option>
              <option value="WatchTower">WatchTower</option>
            </select>
            <label>Study material</label>
          </div>

          <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            className="submit-btn"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudentForm;
