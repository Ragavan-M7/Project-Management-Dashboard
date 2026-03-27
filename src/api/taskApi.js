import axiosInstance from "./axiosInstance"

//............Task API (CRUD)
export const getTasks =()=>{
    return axiosInstance.get("/tasks")
}
export const getTasksId =(id)=>{
    return axiosInstance.get(`/tasks/${id}`)
}
export const createTasks =(data)=>{
    return axiosInstance.post("/tasks",data)
}
export const updateTasks =(id,data)=>{
    return axiosInstance.put(`/tasks/${id}`,data)
}
export const deleteTasks =(id)=>{
    return axiosInstance.delete(`/tasks/${id}`)
}