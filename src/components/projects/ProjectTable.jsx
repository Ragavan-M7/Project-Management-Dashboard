import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  deleteProject,
} from "../../features/projects/projectSlice";
import { fetchEmployees } from "../../features/employees/employeeSlice";
import ProjectForm from "./ProjectForm";

const ProjectTable = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const employees = useSelector((state) => state.employees.list);

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <ProjectForm
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          Project List
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Employees</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((pro) => (
                <tr key={pro.id}>
                  <td>
                    <img src={pro.logo} alt="" style={{ width: 40 }} />
                  </td>

                  <td>{pro.title}</td>
                  <td>{pro.description}</td>
                  <td>{pro.startDate}</td>
                  <td>{pro.endDate}</td>

                  
                 <td>
  {(pro.employees || []).length === 0
    ? "No Employees"
    : pro.employees.map((id) => {
        const emp = employees.find(
          (e) => String(e.id) === String(id)
        );

        return (
          <span
            key={id}
            className="badge bg-primary me-1"
          >
            {emp ? emp.name : "Unknown"}
          </span>
        );
      })}
</td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => setSelectedProject(pro)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(deleteProject(pro.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;