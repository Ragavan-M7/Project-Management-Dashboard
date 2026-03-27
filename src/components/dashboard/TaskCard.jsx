import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";

const TaskCard = ({ task }) => {
  const employees = useSelector((state) => state.employees.list || []);
  const employee = employees.find((e) => String(e.id) === String(task.employeeId));

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: String(task.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    marginBottom: "8px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="card p-2 shadow-sm">
      <h6>{task.title}</h6>
      <small>👤 {employee?.name || "No Employee"}</small>
      <br />
      <small>⏰ {task.eta}</small>
      {task.image && (
        <img
          src={task.image}
          width="100%"
          style={{ marginTop: "5px", borderRadius: "4px" }}
          alt={task.title}
        />
      )}
    </div>
  );
};

export default TaskCard;  