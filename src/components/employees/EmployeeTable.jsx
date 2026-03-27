import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchEmployees,
    deleteEmployee,
} from "../../features/employees/employeeSlice";
import EmployeeForm from "./EmployeeForm";

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.employees);

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const filtered = list.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const currentEmployees = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);

    return (
        <div>
            <EmployeeForm
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
            />

           
            <div className="mb-3">
                <input
                    className="form-control"
                    placeholder="Search employee..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="card shadow">
                <div className="card-header bg-dark text-white">
                    Employee List
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentEmployees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>
                                        <img
                                            src={emp.profileImage}
                                            alt=""
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/50";
                                            }}
                                        />
                                    </td>
                                    <td>{emp.name}</td>
                                    <td>{emp.position}</td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => setSelectedEmployee(emp)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => dispatch(deleteEmployee(emp.id))}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="p-3 d-flex justify-content-between">
                    <button
                        className="btn btn-outline-primary"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Prev
                    </button>

                    <span>Page {currentPage} / {totalPages}</span>

                    <button
                        className="btn btn-outline-primary"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTable;