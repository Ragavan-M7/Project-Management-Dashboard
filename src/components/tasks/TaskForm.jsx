import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../features/tasks/taskSlice";
import { fetchProjects } from "../../features/projects/projectSlice";
import { fetchEmployees } from "../../features/employees/employeeSlice";

const TaskForm = ({ selectedTask, setSelectedTask }) => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects.list || []);
  const employees = useSelector((state) => state.employees.list || []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    employeeId: "",
    eta: "",
    image: "",
    status: "Need To Do",
  });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchEmployees());

    if (selectedTask) {
      setForm(selectedTask);
    }
  }, [selectedTask, dispatch]);

  const selectedProject = projects.find(
    (p) => String(p.id) === String(form.projectId)
  );

  const allowedEmployees = selectedProject
    ? employees.filter((emp) =>
        (selectedProject.employees || []).includes(emp.id)
      )
    : employees;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const img = new Image();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      
      canvas.width = 200;
      canvas.height = 200;
      ctx.drawImage(img, 0, 0, 200, 200);

     
      const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
      setForm({ ...form, image: compressedImage });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.projectId || !form.employeeId || !form.eta) {
      alert("All fields are required!");
      return;
    }

    if (selectedTask) {
      dispatch(updateTask({ id: selectedTask.id, data: form }));
      setSelectedTask(null);
    } else {
      dispatch(createTask(form));
    }

    setForm({
      title: "",
      description: "",
      projectId: "",
      employeeId: "",
      eta: "",
      image: "",
      status: "Need To Do",
    });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-success text-white">
        <h5>{selectedTask ? "Update Task" : "Create Task"}</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                className="form-control"
                placeholder="Task Title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-control"
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-control"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
              >
                <option value="">Assign Employee</option>
                {allowedEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            className="form-control mb-3"
            placeholder="Task Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="datetime-local"
                className="form-control"
                name="eta"
                value={form.eta}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-control"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Need To Do</option>
                <option>In Progress</option>
                <option>Need for Test</option>
                <option>Completed</option>
                <option>Re-open</option>
              </select>
            </div>
          </div>

          {/* Image Preview */}
          {form.image && (
            <img
              src={form.image}
              width={60}
              className="mb-3"
              style={{ objectFit: "cover" }}
              alt={form.title}
            />
          )}

          <div className="d-flex gap-2">
            {selectedTask && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedTask(null);
                  setForm({
                    title: "",
                    description: "",
                    projectId: "",
                    employeeId: "",
                    eta: "",
                    image: "",
                    status: "Need To Do",
                  });
                }}
              >
                Cancel
              </button>
            )}

            <button className="btn btn-success">
              {selectedTask ? "Update" : "Create"} Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;