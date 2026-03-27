import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import EmployeesPage from "../pages/EmployeesPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";


export default function AppRoutes() {
  return (
    <BrowserRouter>
   <Routes>
    <Route path="/" element={<DashboardPage/>}></Route>
    <Route path="/dashboard" element={<DashboardPage/>}></Route>
    <Route path="/employees" element={<EmployeesPage/>}></Route>
    <Route path="/projects" element={<ProjectsPage/>}></Route>
    <Route path="/tasks" element={<TasksPage/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}
