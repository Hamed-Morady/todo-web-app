import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./todo/Home";
import Login from "./todo/Login";
import Dashboard from "./todo/Dashboard";
import { TaskProvider } from "./todo/TaskContext";
import DashTask from './todo/Dashtask'

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashtask" element={<DashTask/>}/>
        </Routes>
      </Router>
    </TaskProvider>
  
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
