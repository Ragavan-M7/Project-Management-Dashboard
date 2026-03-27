import Layout from "../components/layout/Layout";
import EmployeeTable from "../components/employees/EmployeeTable";

const Employees = () => {
  return (
    <Layout>
      <h2>Employees</h2>
      <EmployeeTable />
    </Layout>
  );
};

export default Employees;