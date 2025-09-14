import { useState,useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import Dashtask from "./Dashtask";
import Tasks from "./Tasks";
import Completed from "./Completed";
import TaskEdit from "./TaskEdit";
import "../todo.css";
import { useTasks } from "./TaskContext";
import axios from "axios";

export default function Dashboard() {
  const [setTab, setNewTab] = useState("home");
  const [menu,setMenu]=useState(false)
  const [stats,setStats]=useState({
    weekTasks:0,
    dayTasks:0,
  })
  const clickHandler = (index) => {
    setNewClick(index);
  };
  const {
    tasks,
    task,
    weekDates,
    selectedData,
    setSelectedData,
    newEdit,
    setEdit,
    newClick,
    setNewClick,
    menuRef,
    getTodyTasks,
    refreshTasks,
    data,
    deleteBtnHandler,
    setForm,
    doneHandler,
    apiUser 
  } = useTasks();
  useEffect(() => {
    getTodyTasks()
  }, [refreshTasks]);

  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get(`${apiUser}/stats`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=>{
      setStats(res.data)
    })
    .catch((error)=>console.log(error))
  },[])
  const clickEditHandler = (index) => {
    setEdit(index);
    setForm({
      id:tasks[index].id,
      todo: tasks[index].todo,
      ftime: tasks[index].stime,
      sctime: tasks[index].etime,
      timePeriod: tasks[index].timeperiod || "am",
    });
  };
  return (
    <div className="container">
      <div className="dashboard">
      <button className="icon-open-menu"onClick={()=>setMenu(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-menu-icon lucide-menu"
            >
              <path d="M4 12h16" />
              <path d="M4 18h16" />
              <path d="M4 6h16" />
            </svg>
          </button>
        <div className={`left-said-bar ${menu === true ? 'openMenu':''}`}>
          <button className="icon-close" onClick={()=>setMenu(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <button onClick={() => setNewTab("home")} className="icon-side-bar">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="currentColor"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M506.555,208.064L263.859,30.367c-4.68-3.426-11.038-3.426-15.716,0L5.445,208.064
			c-5.928,4.341-7.216,12.665-2.875,18.593s12.666,7.214,18.593,2.875L256,57.588l234.837,171.943c2.368,1.735,5.12,2.57,7.848,2.57
			c4.096,0,8.138-1.885,10.744-5.445C513.771,220.729,512.483,212.405,506.555,208.064z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M442.246,232.543c-7.346,0-13.303,5.956-13.303,13.303v211.749H322.521V342.009c0-36.68-29.842-66.52-66.52-66.52
			s-66.52,29.842-66.52,66.52v115.587H83.058V245.847c0-7.347-5.957-13.303-13.303-13.303s-13.303,5.956-13.303,13.303v225.053
			c0,7.347,5.957,13.303,13.303,13.303h133.029c6.996,0,12.721-5.405,13.251-12.267c0.032-0.311,0.052-0.651,0.052-1.036v-128.89
			c0-22.009,17.905-39.914,39.914-39.914s39.914,17.906,39.914,39.914v128.89c0,0.383,0.02,0.717,0.052,1.024
			c0.524,6.867,6.251,12.279,13.251,12.279h133.029c7.347,0,13.303-5.956,13.303-13.303V245.847
			C455.549,238.499,449.593,232.543,442.246,232.543z"
                  />
                </g>
              </g>
            </svg>
          </button>
          <button
            onClick={() => setNewTab("dashtask")}
            className="icon-side-bar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-file-plus-icon lucide-file-plus"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M9 15h6" />
              <path d="M12 18v-6" />
            </svg>
          </button>
          <button  onClick={() => setNewTab("task")} className="icon-side-bar">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
          </button>
          <button
            onClick={() => setNewTab("completed")}
            className="icon-side-bar"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
            </svg>
          </button>
        </div>
        <div className="body-main">
          <h1>TO DO EM</h1>
          <div
            className={`tody-task ${
              setTab === "dashtask" ? "tody-task-align-none" : ""
            }`}
          >
            {setTab === "dashtask" ? (
              <Dashtask/>
            ) : setTab === "task" ? (
              <Tasks
                setNewTab={setNewTab}
                clickHandler={clickHandler}
              />
            ) : setTab === "completed" ? (
              <Completed
                days={weekDates}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                setClick={newClick}
                clickHandler={clickHandler}
                menuRef={menuRef}
              />
            ) : setTab === "home" ? (
              <div ref={menuRef} className="informtion">
                <div className="tody-data-task">
                  <div className="tody-data">{data}</div>
                  <div className="tody-task-dasboard">
                    {task.length > 0 ? (  
                      task.map((ts, index) => (
                        <div key={index} className="ts">
                          {newEdit !== index ? (
                            <>
                              <div className="icon-menu">
                                <div className="data-box-task ts-section-date">
                                  {ts.data}
                                </div>
                                <div
                                  onClick={() => clickHandler(index)}
                                  className="menu"
                                >
                                  ⋮
                                  <div
                                    className={`item-menu ${
                                      newClick === index ? "clicked" : ""
                                    }`}
                                  >
                                    <button
                                      onClick={() => clickEditHandler(index)}
                                      className="btn-icon-menu"
                                    >
                                      Edit
                                    </button>
                                    <button className="btn-icon-menu" onClick={()=>deleteBtnHandler(ts.id)}>
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="ts-body">
                                <div className="ts-item">
                                  <p className="ts-text">{ts.todo}</p>
                                  <p className="ts-time">
                                    <span>{ts.stime}</span>-
                                    <span>{ts.etime}</span>
                                    <span>{ts.timeperiod}</span>
                                  </p>
                                </div>
                              </div>
                              <button className="done"onClick={()=>doneHandler(ts.id)}>Done</button>
                            </>
                          ) : (
                            <TaskEdit />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="empty">
                        <svg
                          version="1.1"
                          id="Icons"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 32"
                          style={{ enableBackground: "new 0 0 32 32" }}
                          xmlSpace="preserve"
                        >
                          <g>
                            <path
                              d="M27,18c-0.5,0-0.9-0.3-1-0.8l0-0.1c-0.6-2.7-3.1-4.8-6-5.2V14c0,0.7-0.4,1.3-1,1.6c-0.6,0.3-1.3,0.1-1.8-0.4l-5.9-5.7
		C11.1,9.3,11,9.1,11,8.8s0.1-0.5,0.3-0.7l5.9-5.7c0.4-0.4,1.1-0.5,1.6-0.3c0.7,0.3,1.2,1,1.2,1.8v1.9c4.5,0.5,8,4.1,8,8.5V17
		c0,0.5-0.4,0.9-0.9,1C27.1,18,27,18,27,18z"
                            />
                          </g>
                          <g>
                            <path
                              d="M13.7,30c-0.2,0-0.4,0-0.6-0.1c-0.7-0.3-1.2-1-1.2-1.8v-1.9c-4.5-0.5-8-4.1-8-8.5V15c0-0.5,0.4-0.9,0.9-1
		c0.5-0.1,1,0.3,1.1,0.8l0,0.1c0.6,2.7,3.1,4.8,6,5.2V18c0-0.7,0.4-1.3,1-1.6c0.6-0.3,1.3-0.1,1.8,0.4l5.9,5.7
		c0.2,0.2,0.3,0.4,0.3,0.7s-0.1,0.5-0.3,0.7l-5.9,5.7C14.5,29.9,14.1,30,13.7,30z"
                            />
                          </g>
                        </svg>

                        <p>empty</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="areya">
                  <div className="prog-bar">
                    <h3>All Week Tasks</h3>
                    <div className="progressbar">
                      <CircularProgressbar
                        value={stats.weekTasks}
                        text={`${stats.weekTasks}`}
                        styles={buildStyles({
                          pathColor: "#00C853",
                          trailColor: "#eee",
                          textColor: "#333",
                          backgroundColor: "#fafafa",
                          textSize: "20px",
                        })}
                      />
                    </div>
                  </div>
                  <div className="prog-bar">
                    <h3>Today Tasks</h3>
                    <div className="progressbar">
                      <CircularProgressbar
                        value={stats.dayTasks}
                        text={`${stats.dayTasks}`}
                        styles={buildStyles({
                          pathColor: "#00C853",
                          trailColor: "#eee",
                          textColor: "#333",
                          backgroundColor: "#fafafa",
                          textSize: "20px",
                        })}
                      />
                    </div>
                  </div>
                  <div className="prog-bar">
                    <h3>Today Completed Tasks</h3>
                    <div className="progressbar">
                      <CircularProgressbar
                        value={stats.weekCompletedPercent}
                        text={`${Math.round(stats.weekCompletedPercent)}%`}
                        styles={buildStyles({
                          pathColor: "#00C853",
                          trailColor: "#eee",
                          textColor: "#333",
                          backgroundColor: "#fafafa",
                          textSize: "20px",
                        })}
                      />
                    </div>
                  </div>
                  <div className="prog-bar">
                    <h3>All Week Completed Tasks</h3>
                    <div className="progressbar">
                      <CircularProgressbar
                        value={stats.dayCompletedPercent}
                        text={`${Math.round(stats.dayCompletedPercent)}%`}
                        styles={buildStyles({
                          pathColor: "#00C853",
                          trailColor: "#eee",
                          textColor: "#333",
                          backgroundColor: "#fafafa",
                          textSize: "20px",
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              setTab === "home"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


