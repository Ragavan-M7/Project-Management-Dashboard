import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../features/tasks/taskSlice";
import TaskCard from "./TaskCard";

const statuses = ["Need To Do", "In Progress", "Need for Test", "Completed", "Re-open"];

const DashboardBoard = ({ projectFilter }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list || []);

  const filteredTasks = projectFilter
    ? tasks.filter((t) => String(t.projectId) === String(projectFilter))
    : tasks;

  const getTasksByStatus = (status) => filteredTasks.filter((t) => t.status === status);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, 
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const task = tasks.find((t) => String(t.id) === String(taskId));
    if (!task) return;

    let node = over;
    while (node && !node.dataset?.status) node = node.parentNode;
    if (!node) return;

    const newStatus = node.dataset.status;
    if (task.status !== newStatus) {
      dispatch(updateTask({ id: task.id, data: { ...task, status: newStatus } }));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="row">
        {statuses.map((status) => {
          const tasksForStatus = getTasksByStatus(status);

          return (
            <div key={status} className="col-md-2">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white text-center">{status}</div>
                <div
                  className="card-body"
                  style={{ minHeight: "400px" }}
                  data-status={status} 
                >
                  <SortableContext
                    items={tasksForStatus.map((t) => String(t.id))}
                    strategy={verticalListSortingStrategy}
                  >
                    {tasksForStatus.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </SortableContext>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};

export default DashboardBoard;