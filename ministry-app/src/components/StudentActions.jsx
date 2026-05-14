function StudentActions({ student, dispatch }) {
  const handleEdit = () => {
    dispatch({ type: "editStudent", payload: student });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Student",
    );
    if (!confirmDelete) return;
    dispatch({ type: "deleteStudent", payload: student.id });
  };

  const handleCall = () => {
    if (student.number) {
      window.location.href = `tel:${student.number}`;
    } else {
      alert("No mobile number available for this student");
    }
  };

  return (
    <div className="action-grid">
      <button className="icon-btn" onClick={handleCall}>
        <i className="fa-solid fa-phone"></i>
        <span>Call</span>
      </button>

      <button className="icon-btn">
        <i className="fa-solid fa-calendar-plus"></i>
        <span>Plan</span>
      </button>
      <button onClick={handleEdit} className="icon-btn">
        <i className="fa-solid fa-edit"></i>
        <span>Edit</span>
      </button>
      <button onClick={handleDelete} className="icon-btn">
        <i className="fa-solid fa-trash"></i>
        <span>Delete</span>
      </button>
    </div>
  );
}

export default StudentActions;
