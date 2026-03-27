
import Layout from "../components/layout/Layout";
import { useSelector } from "react-redux";
import { useState } from "react";
import DashboardBoard from "../components/dashboard/DashboardBoard";

const Dashboard = () => {
  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);
  const tasks = useSelector((state) => state.tasks.list);

  const [projectFilter, setProjectFilter] = useState("");

  return (
    <Layout>
      <h2 className="mb-4">Dashboard</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Employees</h5>
            <h3>{employees.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Projects</h5>
            <h3>{projects.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Tasks</h5>
            <h3>{tasks.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-3">
            <h5>Completed</h5>
            <h3>
              {tasks.filter((t) => t.status === "Completed").length}
            </h3>
          </div>
        </div>
      </div>

      
      <div className="mb-3">
        <select
          className="form-control"
          onChange={(e) => setProjectFilter(e.target.value)}
        >
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      
      <DashboardBoard projectFilter={projectFilter} />
    </Layout>
  );
};

export default Dashboard;