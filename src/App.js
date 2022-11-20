import moment from "moment/moment";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./App.css";
import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";

function App() {
  const getData = () => {
    let list = localStorage.getItem("lists");

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const [item, setItem] = useState(getData());
  const [completed, setComplete] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(item));
    let completed = item.filter((data) => data.done === true);
    setComplete(completed);
    let pending = item.filter((data) => data.done === false);
    setPending(pending);
    // console.log(completed)
  }, [item]);

  const addTask = (title) => {
    const newTask = [
      ...item,
      { title, done: false, time: moment().format("LT") },
    ];
    setItem(newTask);
  };
  const deleteTask = (index) => {
    const newTask = [...item];
    newTask.splice(index, 1);
    setItem(newTask);
  };
  const completeTask = (index) => {
    const newTask = [...item];
    newTask[index].done = true;
    setItem(newTask);
  };

  return (
    <div className="App">
      <div className="container my-5">
        <h2 className="my-4 fw-bold textheading">ToDo List</h2>
        <div className="row w-50 mx-auto mt-5">
          <div className="col-md-12 ">
            <div className="card card-white">
              <p className="d-flex justify-content-between mx-4">
                <span className="fs-3 currentDay">
                  {moment().format("dddd")}
                </span>
                <span className="text-muted ">{item.length} Tasks</span>
              </p>

              <div className="card-body">
                <CreateTask addTask={addTask} />

                <Tabs
                  defaultActiveKey="home"
                  transition={false}
                  id="noanim-tab-example"
                  className="my-3"
                >
                  <Tab eventKey="home" title="All Task" id="headingTitle">
                    <p className="todo-list">
                      {item.map((task, index) => {
                        return (
                          <TaskList
                            task={task}
                            index={index}
                            deleteTask={deleteTask}
                            key={index}
                            completeTask={completeTask}
                            time={task.time}
                          />
                        );
                      })}
                    </p>
                  </Tab>
                  <Tab
                    eventKey="complete"
                    title="Completed Task"
                    id="headingTitle2"
                  >
                    <p className="todo-list">
                      {completed.map((task, index) => {
                        return (
                          <TaskList
                            task={task}
                            index={index}
                            deleteTask={deleteTask}
                            key={index}
                            completeTask={completeTask}
                            time={task.time}
                          />
                        );
                      })}
                    </p>
                  </Tab>
                  <Tab
                    eventKey="pending"
                    title="Pending Task"
                    id="headingTitle3"
                  >
                    <p className="todo-list">
                      {pending.map((task, index) => {
                        return (
                          <TaskList
                            task={task}
                            index={index}
                            deleteTask={deleteTask}
                            key={index}
                            completeTask={completeTask}
                            time={task.time}
                          />
                        );
                      })}
                    </p>
                  </Tab>
                </Tabs>

                <div
                  className="empty"
                  style={{
                    visibility: item.length === 0 ? "visible" : "hidden",
                  }}
                >
                  Empty 😥
                </div>
                <div className="tab-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
