import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
const apiUser = process.env.REACT_APP_API_URL;
const TaskContext = createContext();
export function TaskProvider({ children }) {
  const [task, setTasks] = useState([]);
  const [tasks, setNewTasks] = useState([]);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const today = new Date();
  const [selectedData, setSelectedData] = useState(today.getDate());
  const [weekDates, setWeekDates] = useState([]);
  const [setShow, setNewShow] = useState(false);
  const [setShowFilter, setNewShowFilter] = useState(false);
  const [newClick, setNewClick] = useState(null);
  const [form, setForm] = useState({
    todo: "",
    ftime: "",
    sctime: "",
    timePeriod: "AM",
  });
  const [newEdit, setEdit] = useState(null);

  useEffect(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const data = new Date();
      data.setDate(today.getDate() + i);
      return data;
    });
    setWeekDates(days);
  }, []);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };
  const cancelBtnHandler = () => {
    setEdit(null);
    setNewClick(null);
  };
  const getValueHandler = (e) => {
    const { name, value } = e.target;
    if (name === "ftime" || name === "sctime") {
      const num = parseInt(value, 10);
      if (value === "" || (!isNaN(num) && num >= 0 && num <= 23)) {
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const timeBoxRef = useRef(null);
  const filterBoxRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (timeBoxRef.current && !timeBoxRef.current.contains(e.target)) {
        setNewShow(false);
      }
      if (filterBoxRef.current && !filterBoxRef.current.contains(e.target)) {
        setNewShowFilter(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setNewClick(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const data = today.getDate();
  const getTodyTasks = async () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${apiUser}/tody-task`,
        { todayData: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTasks(response.data.todyTask);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // delete btn
  const deleteBtnHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${apiUser}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getTodyTasks();
        getTasksHandler();
        setRefreshTasks((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  const getTasksHandler = async () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${apiUser}/get-tasks`,
        { selectedData: selectedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setNewTasks(res.data.getTask);
      })
      .catch((error) => console.log(error));
  };
  const getCompletedTasksHandler = async () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${apiUser}/get-completed-tasks`,
        { selectedData: selectedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCompletedTasks(res.data.getTask);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (selectedData) {
      getTasksHandler();
    }
  }, [selectedData]);

  const doneHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${apiUser}/done-task/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getTodyTasks();
        getTasksHandler();
        setRefreshTasks((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  const unDoneHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${apiUser}/undo-task/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getTodyTasks();
        getTasksHandler();
        getCompletedTasksHandler();
        setRefreshTasks((prev) => !prev);
      })
      .catch((error) => console.log(error));
  };
  return (
    <TaskContext.Provider
      value={{
        task,
        addTask,
        deleteTask,
        weekDates,
        selectedData,
        setSelectedData,
        form,
        setForm,
        newEdit,
        setEdit,
        getValueHandler,
        setShow,
        setNewShow,
        setShowFilter,
        setNewShowFilter,
        newClick,
        setNewClick,
        timeBoxRef,
        filterBoxRef,
        menuRef,
        cancelBtnHandler,
        getTodyTasks,
        refreshTasks,
        setRefreshTasks,
        data,
        deleteBtnHandler,
        tasks,
        setNewTasks,
        getTasksHandler,
        doneHandler,
        getCompletedTasksHandler,
        completedTasks,
        unDoneHandler,
        apiUser,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
