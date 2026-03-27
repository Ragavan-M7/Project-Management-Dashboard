import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">

        <span className="navbar-brand fw-bold">
          Project Management
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/employees">Employees</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/tasks">Tasks</Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;