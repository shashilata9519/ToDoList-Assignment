function TaskList({ task, deleteTask, index, completeTask, time }) {
  return (
    <>
      <div className="todo-item d-flex">
        <div>
          <div className="checker me-5">
            <span onClick={() => completeTask(index)}>
              <input type="checkbox" />
            </span>
          </div>
          <span
            style={{
              textDecoration: task.done == true ? "line-through" : "none",
            }}
          >
            {task.title}
          </span>
        </div>
        <span className="d-flex align-items-center">
          <p className="mx-2">{time}</p>
          <p
            onClick={() => deleteTask(index)}
            className="text-danger mx-2"
            type="button"
          >
            <i className="fa fa-trash"></i>
          </p>
        </span>
      </div>
    </>
  );
}

export default TaskList;
