import { useState, useEffect } from "react";
import axios from "axios";
import "../todo.css";
import { useTasks } from "./TaskContext";
import TaskEdit from "./TaskEdit";

export default function Tasks({ setNewTab, clickHandler }) {
  const {
    weekDates,
    selectedData,
    setSelectedData,
    newClick,
    timeBoxRef,
    menuRef,
    setShow,
    setNewShow,
    setNewShowFilter,
    newEdit,
    setEdit,
    setForm,
    getTasksHandler,
    tasks,
    setNewTasks,
    deleteBtnHandler,
    doneHandler,
    apiUser,
  } = useTasks();
  const [filter, setFilters] = useState({
    filterType:'all',
    stime: "",
    etime: "",
    period: "AM"
  });
  console.log(filter.filterType);
  console.log(filter.stime);
  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const [open, setOpen] = useState(false);
  const options = ["all", "today"];
  const showFilterTimeHandler = (e) => {
    const getValue = e.target.innerText;
    if (getValue === "Timeing") {
      setNewShow(true);
    } else {
      setNewShow(false);
    }
    if (getValue === "Filter") {
      setNewShowFilter(true);
    } else {
      setNewShowFilter(false);
    }
  };
  useEffect(() => {
    getTasksHandler();
  }, [selectedData]);
  const clickEditHandler = (index) => {
    setEdit(index);
    setForm({
      id: tasks[index].id,
      todo: tasks[index].todo,
      ftime: tasks[index].stime,
      sctime: tasks[index].etime,
      timePeriod: tasks[index].timeperiod || "am",
    });
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${apiUser}/filter-tasks`, {
          params: filter
        });
        setNewTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [filter]);
  return (
    <div className="data-task">
      <div className="data">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`data-text ${
              selectedData === date.getDate() ? "selected-date" : ""
            }`}
            onClick={() => setSelectedData(date.getDate())}
          >
            <div className="date-large-text">{date.getDate()}</div>
            <div className="month-week">
              <span>
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              {date.toLocaleDateString("en-US", { month: "short" })}
            </div>
          </div>
        ))}
      </div>
      <div className="filter-bar">
        <button
          className="add-task-inFilter"
          onClick={() => setNewTab("dashtask")}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 64 64"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M32 5.5C26.9526 5.49717 22.0095 6.93641 17.7525 9.64829C13.4955 12.3602 10.1019 16.2318 7.97119 20.8074C5.84047 25.383 5.06131 30.4721 5.72545 35.4756C6.38959 40.4791 8.46938 45.1887 11.72 49.05V49.05C11.98 49.37 12.25 49.67 12.56 50.05C12.6479 50.1357 12.7313 50.2258 12.81 50.32C12.96 50.48 13.12 50.63 13.27 50.78L13.45 50.96L13.7 51.2C14.02 51.51 14.34 51.8 14.65 52.05C14.96 52.3 15.38 52.68 15.73 52.94C16.08 53.2 16.37 53.43 16.73 53.66L17.01 53.85C17.22 54 17.44 54.15 17.62 54.26L18.23 54.64H18.29C19.04 55.09 19.76 55.48 20.49 55.84H20.6C20.92 56 21.25 56.14 21.6 56.27C22.8383 56.8 24.1154 57.2346 25.42 57.57C25.81 57.67 26.2 57.76 26.6 57.84C27 57.92 27.36 58 27.71 58.05L28.18 58.12C28.46 58.17 28.76 58.2 29.04 58.23L29.56 58.29C29.86 58.29 30.18 58.29 30.5 58.35H30.76C31.18 58.35 31.6 58.35 32.02 58.35C32.44 58.35 32.86 58.35 33.28 58.35H33.54C33.86 58.35 34.18 58.35 34.54 58.28L34.99 58.23C35.3 58.23 35.6 58.17 35.79 58.13L36.3 58.05C36.7 58.05 37.08 57.92 37.46 57.84L38.67 57.57C39.9562 57.2319 41.2162 56.8007 42.44 56.28C42.77 56.14 43.09 56 43.44 55.84L42.78 54.49L43.55 55.79C44.28 55.43 45 55.04 45.75 54.59L45.84 54.53L46.36 54.2C46.5772 54.0747 46.7875 53.9379 46.99 53.79L47.27 53.6C47.61 53.37 47.95 53.11 48.27 52.88C48.59 52.65 49.02 52.28 49.35 51.99C49.68 51.7 50.02 51.42 50.28 51.16L50.58 50.87L50.38 50.67C50.7148 50.6162 51.0214 50.4505 51.25 50.2L51.51 49.92C51.78 49.63 52.05 49.33 52.31 49.01C55.5499 45.1459 57.6196 40.4374 58.2759 35.4376C58.9322 30.4379 58.1478 25.3547 56.0149 20.7853C53.882 16.216 50.4892 12.3504 46.2351 9.64273C41.9811 6.93507 37.0426 5.49786 32 5.5V5.5ZM50 47.12V47.17C49.76 47.45 49.53 47.72 49.32 47.94L48.99 48.29C48.7965 48.5066 48.6682 48.7736 48.62 49.06L48.42 48.86L48.21 49.06C47.95 49.31 47.69 49.55 47.39 49.8C47.09 50.05 46.76 50.33 46.39 50.6C46.02 50.87 45.83 51.03 45.5 51.27L45.29 51.4C45.13 51.52 44.96 51.63 44.73 51.77L44.26 52.07H44.2C43.53 52.48 42.89 52.84 42.31 53.07C42.241 53.0946 42.1741 53.1247 42.11 53.16C41.84 53.29 41.58 53.41 41.28 53.53C40.1953 53.9919 39.0791 54.3762 37.94 54.68L36.82 55C36.49 55.07 36.17 55.14 35.82 55.19C35.7 55.19 35.58 55.24 35.36 55.26C35.14 55.28 34.92 55.32 34.67 55.35H34.24C33.97 55.35 33.7 55.4 33.42 55.41H33.1C32.3642 55.46 31.6258 55.46 30.89 55.41H30.62C30.34 55.41 30.07 55.41 29.84 55.35H29.35L28.59 55.25L28.17 55.19C27.83 55.19 27.51 55.07 27.17 55C26.83 54.93 26.44 54.84 26.11 54.76C24.9524 54.4591 23.8192 54.0713 22.72 53.6C22.45 53.49 22.18 53.37 21.94 53.25L21.79 53.18C21.1037 52.8576 20.436 52.4971 19.79 52.1H19.73L19.2 51.77C19.03 51.66 18.86 51.55 18.7 51.43L18.59 51.37C18.5436 51.3215 18.4896 51.2809 18.43 51.25C18.15 51.05 17.87 50.85 17.56 50.61C17.25 50.37 16.92 50.1 16.56 49.8C16.2 49.5 16.02 49.33 15.72 49.04L15.55 48.88L15.35 48.68L15 48.27L14.77 48C14.52 47.74 14.29 47.47 14.05 47.19V47.14C11.1739 43.7134 9.33571 39.5371 8.75134 35.1018C8.16696 30.6665 8.86072 26.1566 10.7511 22.102C12.6414 18.0474 15.6498 14.6166 19.4228 12.2128C23.1957 9.80899 27.5764 8.53206 32.05 8.53206C36.5236 8.53206 40.9043 9.80899 44.6772 12.2128C48.4501 14.6166 51.4585 18.0474 53.3489 22.102C55.2392 26.1566 55.933 30.6665 55.3486 35.1018C54.7643 39.5371 52.926 43.7134 50.05 47.14L50 47.12Z" />
            <path d="M47.1798 30.5003H33.4998V16.8203C33.4998 16.4225 33.3418 16.041 33.0605 15.7597C32.7792 15.4783 32.3976 15.3203 31.9998 15.3203C31.602 15.3203 31.2205 15.4783 30.9392 15.7597C30.6579 16.041 30.4998 16.4225 30.4998 16.8203V30.5003H16.8198C16.422 30.5003 16.0405 30.6583 15.7592 30.9397C15.4779 31.221 15.3198 31.6025 15.3198 32.0003C15.3198 32.3981 15.4779 32.7797 15.7592 33.061C16.0405 33.3423 16.422 33.5003 16.8198 33.5003H30.4998V47.1803C30.4998 47.5781 30.6579 47.9597 30.9392 48.241C31.2205 48.5223 31.602 48.6803 31.9998 48.6803C32.3976 48.6803 32.7792 48.5223 33.0605 48.241C33.3418 47.9597 33.4998 47.5781 33.4998 47.1803V33.5003H47.1798C47.5776 33.5003 47.9592 33.3423 48.2405 33.061C48.5218 32.7797 48.6798 32.3981 48.6798 32.0003C48.6798 31.6025 48.5218 31.221 48.2405 30.9397C47.9592 30.6583 47.5776 30.5003 47.1798 30.5003Z" />
          </svg>
          Add Task
        </button>
        <div
          ref={timeBoxRef}
          className="filter-item-icon"
          onClick={showFilterTimeHandler}
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 120.06"
            style={{ enableBackground: "new 0 0 122.88 120.06" }}
            xmlSpace="preserve"
          >
            <g>
              <path d="M69.66,4.05c0-2.23,2.2-4.05,4.94-4.05c2.74,0,4.94,1.81,4.94,4.05v17.72c0,2.23-2.2,4.05-4.94,4.05 c-2.74,0-4.94-1.81-4.94-4.05V4.05L69.66,4.05z M91.37,57.03c4.26,0,8.33,0.85,12.05,2.39c3.87,1.6,7.34,3.94,10.24,6.84 c2.9,2.9,5.24,6.38,6.84,10.23c1.54,3.72,2.39,7.79,2.39,12.05c0,4.26-0.85,8.33-2.39,12.05c-1.6,3.87-3.94,7.34-6.84,10.24 c-2.9,2.9-6.38,5.24-10.23,6.84c-3.72,1.54-7.79,2.39-12.05,2.39c-4.26,0-8.33-0.85-12.05-2.39c-3.87-1.6-7.34-3.94-10.24-6.84 c-2.9-2.9-5.24-6.38-6.84-10.24c-1.54-3.72-2.39-7.79-2.39-12.05c0-4.26,0.85-8.33,2.39-12.05c1.6-3.87,3.94-7.34,6.84-10.24 c2.9-2.9,6.38-5.24,10.23-6.84C83.04,57.88,87.1,57.03,91.37,57.03L91.37,57.03z M89.01,75.37c0-0.76,0.31-1.45,0.81-1.95l0,0l0,0 c0.5-0.5,1.19-0.81,1.96-0.81c0.77,0,1.46,0.31,1.96,0.81c0.5,0.5,0.81,1.19,0.81,1.96v14.74l11.02,6.54l0.09,0.06 c0.61,0.39,1.01,0.98,1.17,1.63c0.17,0.68,0.09,1.42-0.28,2.06l-0.02,0.03c-0.02,0.04-0.04,0.07-0.07,0.1 c-0.39,0.6-0.98,1-1.62,1.16c-0.68,0.17-1.42,0.09-2.06-0.28l-12.32-7.29c-0.43-0.23-0.79-0.58-1.05-0.99 c-0.26-0.42-0.41-0.91-0.41-1.43h0L89.01,75.37L89.01,75.37L89.01,75.37z M109.75,70.16c-2.4-2.4-5.26-4.33-8.43-5.64 c-3.06-1.27-6.42-1.96-9.95-1.96s-6.89,0.7-9.95,1.96c-3.17,1.31-6.03,3.24-8.43,5.64c-2.4,2.4-4.33,5.26-5.64,8.43 c-1.27,3.06-1.96,6.42-1.96,9.95c0,3.53,0.7,6.89,1.96,9.95c1.31,3.17,3.24,6.03,5.64,8.43c2.4,2.4,5.26,4.33,8.43,5.64 c3.06,1.27,6.42,1.96,9.95,1.96s6.89-0.7,9.95-1.96c3.17-1.31,6.03-3.24,8.43-5.64c4.71-4.71,7.61-11.2,7.61-18.38 c0-3.53-0.7-6.89-1.96-9.95C114.08,75.42,112.15,72.56,109.75,70.16L109.75,70.16z M13.45,57.36c-0.28,0-0.53-1.23-0.53-2.74 c0-1.51,0.22-2.73,0.53-2.73h13.48c0.28,0,0.53,1.23,0.53,2.73c0,1.51-0.22,2.74-0.53,2.74H13.45L13.45,57.36z M34.94,57.36 c-0.28,0-0.53-1.23-0.53-2.74c0-1.51,0.22-2.73,0.53-2.73h13.48c0.28,0,0.53,1.23,0.53,2.73c0,1.51-0.22,2.74-0.53,2.74H34.94 L34.94,57.36z M56.43,57.36c-0.28,0-0.53-1.23-0.53-2.74c0-1.51,0.22-2.73,0.53-2.73h13.48c0.28,0,0.53,1.22,0.53,2.72 c-1.35,0.84-2.65,1.76-3.89,2.75H56.43L56.43,57.36z M13.48,73.04c-0.28,0-0.53-1.23-0.53-2.74c0-1.51,0.22-2.74,0.53-2.74h13.48 c0.28,0,0.53,1.23,0.53,2.74c0,1.51-0.22,2.74-0.53,2.74H13.48L13.48,73.04z M34.97,73.04c-0.28,0-0.53-1.23-0.53-2.74 c0-1.51,0.22-2.74,0.53-2.74h13.48c0.28,0,0.53,1.23,0.53,2.74c0,1.51-0.22,2.74-0.53,2.74H34.97L34.97,73.04z M13.51,88.73 c-0.28,0-0.53-1.23-0.53-2.74c0-1.51,0.22-2.74,0.53-2.74h13.48c0.28,0,0.53,1.23,0.53,2.74c0,1.51-0.22,2.74-0.53,2.74H13.51 L13.51,88.73z M35,88.73c-0.28,0-0.53-1.23-0.53-2.74c0-1.51,0.22-2.74,0.53-2.74h13.48c0.28,0,0.53,1.23,0.53,2.74 c0,1.51-0.22,2.74-0.53,2.74H35L35,88.73z M25.29,4.05c0-2.23,2.2-4.05,4.94-4.05c2.74,0,4.94,1.81,4.94,4.05v17.72 c0,2.23-2.21,4.05-4.94,4.05c-2.74,0-4.94-1.81-4.94-4.05V4.05L25.29,4.05z M5.44,38.74h94.08v-20.4c0-0.7-0.28-1.31-0.73-1.76 c-0.45-0.45-1.09-0.73-1.76-0.73h-9.02c-1.51,0-2.74-1.23-2.74-2.74c0-1.51,1.23-2.74,2.74-2.74h9.02c2.21,0,4.19,0.89,5.64,2.34 c1.45,1.45,2.34,3.43,2.34,5.64v32.39c-1.8-0.62-3.65-1.12-5.55-1.49v-5.06h0.06H5.44v52.83c0,0.7,0.28,1.31,0.73,1.76 c0.45,0.45,1.09,0.73,1.76,0.73h44.71c0.51,1.9,1.15,3.75,1.92,5.53H7.98c-2.2,0-4.19-0.89-5.64-2.34C0.89,101.26,0,99.28,0,97.07 V18.36c0-2.2,0.89-4.19,2.34-5.64c1.45-1.45,3.43-2.34,5.64-2.34h9.63c1.51,0,2.74,1.23,2.74,2.74c0,1.51-1.23,2.74-2.74,2.74H7.98 c-0.7,0-1.31,0.28-1.76,0.73c-0.45,0.45-0.73,1.09-0.73,1.76v20.4H5.44L5.44,38.74z M43.07,15.85c-1.51,0-2.74-1.23-2.74-2.74 c0-1.51,1.23-2.74,2.74-2.74h18.36c1.51,0,2.74,1.23,2.74,2.74c0,1.51-1.23,2.74-2.74,2.74H43.07L43.07,15.85z" />
            </g>
          </svg>
          Timeing
          <div
            className={`time-filter-box ${
              setShow === true ? "time-filter-box-show" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="time-filter-input">
              <input
                type="number"
                placeholder="frist Time"
                name="stime"
                value={filter.stime}
                onChange={(e) =>
                  updateFilter(
                    e.target.name,
                    e.target.value !== "" ? parseInt(e.target.value, 10) : ""
                  )
                }
              />
              <input
                type="number"
                placeholder="secand Time"
                name="etime"
                value={filter.etime}
                onChange={(e) =>
                  updateFilter(
                    e.target.name,
                    e.target.value !== "" ? parseInt(e.target.value, 10) : ""
                  )
                }
              />
            </div>
            <select
              value={filter.period}
              onChange={(e)=>updateFilter(e.target.name,e.target.value)}
              name='period'
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="filter-item-icon">
          <div className="custom-select-display" onClick={() =>setOpen(!open)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-filter"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
            {filter.filterType === "all" ? "ALL Task" : "Today Task"}
            <span className="arrow">{open ? "▲" : "▼"}</span>
          </div>
          {open && (
            <div className="custom-select-options">
              {options.map((option) => (
                <div
                  key={option}
                  className="custom-select-option"
                  onClick={() => {
                    updateFilter("filterType", option);
                    setOpen(!open)
                  }}
                >
                  {option === "all" ? "ALL Task" : "Today Task"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div ref={menuRef} className="show-tasks">
        {tasks.length > 0 ? (
          tasks.map((ts, index) => (
            <div key={index} className="ts">
              {newEdit !== index ? (
                <>
                  <div className="icon-menu">
                    <div className="data-box-task ts-section-date">
                      {ts.data}
                    </div>
                    <div onClick={() => clickHandler(index)} className="menu">
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
                        <button
                          className="btn-icon-menu"
                          onClick={() => deleteBtnHandler(ts.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="ts-body">
                    <div className="ts-item">
                      <p className="ts-text">{ts.todo}</p>
                      <p className="ts-time">
                        <span>{ts.stime}</span>-<span>{ts.etime}</span>
                        <span>{ts.timeperiod}</span>
                      </p>
                    </div>
                  </div>
                  <button className="done" onClick={() => doneHandler(ts.id)}>
                    Done
                  </button>
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
  );
}
