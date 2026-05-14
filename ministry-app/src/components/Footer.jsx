import { NavLink } from "react-router-dom";
function footer() {
  return (
    <nav className="footer">
      <NavLink to="/" className="nav-item">
        <i className="fa-solid fa-chart-line"></i> Home
      </NavLink>
      <NavLink to="/territory" className="nav-item">
        <i className="fa-solid fa-map-pin"></i> Territory
      </NavLink>
      <NavLink to="/students" className="nav-item">
        <i className="fa-solid fa-address-book"></i> My Students
      </NavLink>
      <NavLink to="/report" className="nav-item">
        <i className="fa-solid fa-briefcase"></i> Reports
      </NavLink>
    </nav>
  );
}

export default footer;
