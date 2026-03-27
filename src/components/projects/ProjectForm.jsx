import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  updateProject,
} from "../../features/projects/projectSlice";
import { fetchEmployees } from "../../features/employees/employeeSlice";

const ProjectForm = ({ selectedProject, setSelectedProject }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  const [form, setForm] = useState({
    title: "",
    description: "",
    logo: "",
    startDate: "",
    endDate: "",
    employees: [],
  });

  useEffect(() => {
    dispatch(fetchEmployees());

    if (selectedProject) {
      setForm({
        ...selectedProject,
        employees: selectedProject.employees || [],
      });
    }
  }, [selectedProject, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 150;
      canvas.height = 150;

      ctx.drawImage(img, 0, 0, 150, 150);

      const compressed = canvas.toDataURL("image/jpeg", 0.6);

      setForm({ ...form, logo: compressed });
    };

    reader.readAsDataURL(file);
  };

 const handleEmployees = (e) => {
  const options = e.target.options;
  const selectedEmployees = [];

  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      selectedEmployees.push(options[i].value); 
    }
  }

  setForm((prev) => ({
    ...prev,
    employees: selectedEmployees,
  }));
};

  const validate = () => {
    if (
      !form.title ||
      !form.description ||
      !form.startDate ||
      !form.endDate ||
      form.employees.length === 0
    ) {
      alert("All fields required");
      return false;
    }

    if (new Date(form.startDate) >= new Date(form.endDate)) {
      alert("Start date must be less than End date");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (selectedProject) {
      dispatch(updateProject({ id: selectedProject.id, data: form }));
      setSelectedProject(null);
    } else {
      dispatch(createProject(form));
    }

    setForm({
      title: "",
      description: "",
      logo: "",
      startDate: "",
      endDate: "",
      employees: [],
    });
  };

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-primary text-white">
        <h5>{selectedProject ? "Update Project" : "Create Project"}</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Project Title</label>
              <input
                className="form-control"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Start Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>End Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Project Logo</label>
              <input
                type="file"
                className="form-control"
                onChange={handleLogo}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>Assign Employees (Ctrl + Click)</label>
              <select
                multiple
                className="form-control"
                value={form.employees.map(String)}
                onChange={handleEmployees}
                style={{ height: "120px" }}
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} - {emp.position}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {form.logo && (
            <img
              src={form.logo}
              alt="logo"
              style={{ width: 80, marginBottom: 10 }}
            />
          )}

          <button className="btn btn-success">
            {selectedProject ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;