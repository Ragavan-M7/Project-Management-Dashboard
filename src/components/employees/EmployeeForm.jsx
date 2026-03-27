import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  updateEmployee,
} from "../../features/employees/employeeSlice";

const EmployeeForm = ({ selectedEmployee, setSelectedEmployee }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  const [form, setForm] = useState({
    name: "",
    position: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setForm(selectedEmployee);
    }
  }, [selectedEmployee]);

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

      setForm({ ...form, profileImage: compressedImage });
    };

    reader.readAsDataURL(file);
  };

  
  const isEmailUnique = () => {
    return !employees.some(
      (emp) =>
        emp.email === form.email &&
        emp.id !== selectedEmployee?.id
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.position || !form.email || !form.profileImage) {
      alert("All fields are required");
      return;
    }

    if (!isEmailUnique()) {
      alert("Email already exists!");
      return;
    }

    if (selectedEmployee) {
      dispatch(updateEmployee({ id: selectedEmployee.id, data: form }));
      setSelectedEmployee(null);
    } else {
      dispatch(createEmployee(form));
    }

    setForm({ name: "", position: "", email: "", profileImage: "" });
  };

  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-primary text-white">
        <h5>{selectedEmployee ? "Update Employee" : "Add Employee"}</h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">

            <div className="col-md-3 mb-3">
              <label>Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Position</label>
              <input
                className="form-control"
                name="position"
                value={form.position}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

          </div>

          {/* Image Preview */}
          {form.profileImage && (
            <img
              src={form.profileImage}
              alt=""
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}

          <div className="mt-3 d-flex gap-2">
            {selectedEmployee && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedEmployee(null);
                  setForm({ name: "", position: "", email: "", profileImage: "" });
                }}
              >
                Cancel
              </button>
            )}

            <button className="btn btn-success">
              {selectedEmployee ? "Update" : "Add"} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;