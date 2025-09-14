import axios from "axios";
import "../todo.css";
import { useTasks } from "./TaskContext";
export default function SeyTask() {
  const {
    weekDates,
    selectedData,
    setSelectedData,
    form,
    setForm,
    getValueHandler,
    setRefreshTasks,
    apiUser,
  } = useTasks();
  const addTaskHandler = async (e) => {
    e.preventDefault();
    try {
      const deploy = {
        form,
        data: selectedData,
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${apiUser}/add-task`, deploy, config);
      setRefreshTasks((prev) => !prev);
      setForm({ todo: "", ftime: "", sctime: "", timePeriod: "" });
    } catch (error) {
      console.log(error);
    }
  };
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
      <div className="task">
        <form className="task-add-sys" onSubmit={addTaskHandler}>
          <div className="form-body">
            <div className="data-box-task dashtask-box-task">
              {selectedData}
            </div>
            <div className="form-item-input">
              <div className="input-task">
                <label>Task</label>
                <input
                  name="todo"
                  placeholder="Task"
                  value={form.todo}
                  onChange={getValueHandler}
                />
              </div>
              <div className="inputs-task">
                <label>Time</label>
                <div className="input-time">
                  <input
                    type="number"
                    value={form.ftime}
                    name="ftime"
                    onChange={getValueHandler}
                  />
                  <input
                    type="number"
                    value={form.sctime}
                    name="sctime"
                    onChange={getValueHandler}
                  />
                  <select
                    value={form.timePeriod}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        timePeriod: e.target.value,
                      }))
                    }
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  {/* <span>AM</span>
                  <span>PM</span> */}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-task-send">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}