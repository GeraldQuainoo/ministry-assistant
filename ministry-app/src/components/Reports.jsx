import { useState, useEffect } from "react";
import Header from "./Header";

function Reports() {
  const getHours = localStorage.getItem("hoursCompleted");
  const [bibleStudies, setBibleStudies] = useState(
    () => JSON.parse(localStorage.getItem("bibleStudies")) || 0,
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [editValue, setEditValue] = useState(bibleStudies);

  useEffect(() => {
    localStorage.setItem("bibleStudies", JSON.stringify(bibleStudies));
  }, [bibleStudies]);

  function getCurrentMonthYear() {
    const now = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${month} ${year}`;
  }

  function handleSave() {
    setBibleStudies(editValue);
    setShowEditModal(false);
  }

  function handleCancel() {
    setEditValue(bibleStudies);
    setShowEditModal(false);
  }

  return (
    <div>
      <Header>
        <div className="header">
          <h1 className="headingPrimary">Monthly Report</h1>
          <span className="month-selector">
            <p>{getCurrentMonthYear()}</p>
            <i className="fa-solid fa-calendar-check"></i>
          </span>
        </div>
      </Header>
      <div className="content">
        <div className="stats-grid">
          <div className="stat-card highlight">
            <div className="label">Hours</div>
            <div className="value">{getHours || 0}</div>
          </div>
          <div
            className="stat-card"
            onClick={() => setShowEditModal(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="label">Bible studies</div>
            <div className="value">{bibleStudies}</div>
          </div>
        </div>
        <p>Features coming soon...</p>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Bible Studies</h2>
            <div className="form-group">
              <label htmlFor="bibleStudies">Number of Bible Studies:</label>
              <input
                type="number"
                id="bibleStudies"
                value={editValue}
                onChange={(e) => setEditValue(Number(e.target.value))}
                min="0"
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn--primary" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn--secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
