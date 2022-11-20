import React, { useState } from "react";

function CreateTask({ addTask }) {
  const [value, setValue] = useState("");
  const addHandler = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <div>
      <form>
        <div className="search position-relative">
          <input
            type="text"
            className="form-control py-2"
            placeholder="Add New Task..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <button className="btn  position-absolute" onClick={addHandler}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
