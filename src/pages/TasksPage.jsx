import Layout from "../components/layout/Layout";
import TaskTable from "../components/tasks/TaskTable";

const Tasks = () => {
  return (
    <Layout>
      <h2>Tasks</h2>
      <TaskTable />
    </Layout>
  );
};

export default Tasks;