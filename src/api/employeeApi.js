import axiosInstance from "./axiosInstance"

//............Employees API (CRUD)
export const getEmployees = () =>{
  return axiosInstance.get("/employees");
};

export const getEmployeeId = (id) =>{
    return axiosInstance.get(`/employees/${id}`)
}

export const  addEmployee = (data) =>{
return axiosInstance.post("/employees",data)
}

export const updateEmployee = (id,data) =>{
    return axiosInstance.put(`/employees/${id}`,data)
}

export const deleteEmployee = (id) =>{
    return axiosInstance.delete(`/employees/${id}`)
}