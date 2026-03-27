import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3 sidebar"
    >
      <h4 className="text-center mb-4">PM Dashboard</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/employees">
            Employees
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/projects">
            Projects
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/tasks">
            Tasks
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;