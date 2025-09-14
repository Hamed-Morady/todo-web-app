import axios from "axios";
import "../todo.css";
import { useTasks } from "./TaskContext";

export default function Taskedit() {
  const { form, setForm, getValueHandler, cancelBtnHandler,getTasksHandler,getTodyTasks,apiUser} = useTasks();

  const editTodoHandler = async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token')
    try {
       const res =await axios.post(`${apiUser}/edit`,form,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Response:', res.data);
      cancelBtnHandler()
      getTasksHandler()
      getTodyTasks()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="edit-section">
      <form onSubmit={editTodoHandler}>
        <div className="form-item-input edit-form-item-input ">
          <div className="input-task input-edit-section">
            <input
              name="todo"
              onChange={getValueHandler}
              placeholder="Task"
              value={form.todo}
            />
          </div>
          <div className="inputs-task">
            <div className="input-time edit-input-time">
              <input
                type="number"
                name="ftime"
                value={form.ftime}
                onChange={getValueHandler}
              />
              <input
                type="number"
                onChange={getValueHandler}
                name="sctime"
                value={form.sctime}
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
            </div>
          </div>
        </div>
        <div className="btns-section-edit">
          <button type="submit">Edit</button>
          <button onClick={cancelBtnHandler}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
