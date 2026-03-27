import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../features/tasks/taskSlice";
import TaskForm from "./TaskForm";

const TaskTable = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list || []);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <TaskForm selectedTask={selectedTask} setSelectedTask={setSelectedTask} />

      <div className="card shadow">
        <div className="card-header bg-dark text-white">Tasks List</div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.status}</td>
                <td>{t.eta}</td>
                <td>
                  {t.image && (
                    <img
                      src={t.image}
                      width={40}
                      style={{ objectFit: "cover" }}
                      alt={t.title}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setSelectedTask(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(deleteTask(t.id))}
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
  );
};

export default TaskTable;