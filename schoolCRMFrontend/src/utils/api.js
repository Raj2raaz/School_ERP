// // src/utils/api.js
// import axios from 'axios';

// // Base URL for your backend API (you can adjust it as per your backend URL)
// const API_URL = 'http://localhost:5000';

// // Utility function to handle POST requests
// export const postData = async (url, data) => {
//   try {
//     const response = await axios.post(`${API_URL}${url}`, data);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Something went wrong!";
//   }
// };

// // Utility function to handle GET requests
// export const getData = async (url) => {
//   try {
//     const response = await axios.get(`${API_URL}${url}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Something went wrong!";
//   }
// };

// // Utility function to handle PUT requests
// export const putData = async (url, data) => {
//   try {
//     const response = await axios.put(`${API_URL}${url}`, data);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Something went wrong!";
//   }
// };

// // Utility function to handle DELETE requests
// export const deleteData = async (url) => {
//   try {
//     const response = await axios.delete(`${API_URL}${url}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.error || "Something went wrong!";
//   }
// };

// // API calls for Admin
// export const addAdmin = async (data) => {
//   return await postData("/admin/add", data);
// };

// export const getAdmins = async () => {
//   return await getData("/admin");
// };

// export const updateAdmin = async (id, data) => {
//   return await putData(`/admin/update/${id}`, data);
// };

// // API calls for Teachers
// export const addTeacher = async (data) => {
//   return await postData("/teachers/add", data);
// };

// export const getTeachers = async () => {
//   return await getData("/teachers");
// };

// export const updateTeacher = async (id, data) => {
//   return await putData(`/teachers/update/${id}`, data);
// };

// // API calls for Students
// export const addStudent = async (data) => {
//   return await postData("/students/signup", data);
// };

// export const getStudents = async () => {
//   return await getData("/students");
// };

// export const updateStudent = async (id, data) => {
//   return await putData(`/students/update/${id}`, data);
// };

// // API calls for Classes
// export const addClass = async (data) => {
//   return await postData("/classes/add", data);
// };

// export const getClasses = async () => {
//   return await getData("/classes");
// };

// export const updateClass = async (id, data) => {
//   return await putData(`/classes/update/${id}`, data);
// };

// export const deleteClass = async (id) => {
//   return await deleteData(`/classes/delete/${id}`);
// };


import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Base URL for your backend API

// Student APIs
export const addStudent = (studentData) => axios.post(`${API_BASE_URL}/students/add`, studentData);
export const getStudents = () => axios.get(`${API_BASE_URL}/students/all`);
export const updateStudent = (id, updatedData) => axios.put(`${API_BASE_URL}/students/update/${id}`, updatedData);
export const deleteStudent = (id) => axios.delete(`${API_BASE_URL}/students/delete/${id}`);
export const signupStudent = (studentData) => axios.post(`${API_BASE_URL}/students/signup`, studentData);
export const loginStudent = (loginData) => axios.post(`${API_BASE_URL}/students/login`, loginData);

// Teacher APIs
export const addTeacher = (teacherData) => axios.post(`${API_BASE_URL}/teachers/add`, teacherData);
export const getTeachers = () => axios.get(`${API_BASE_URL}/teachers/all`);
export const updateTeacher = (id, updatedData) => axios.put(`${API_BASE_URL}/teachers/update/${id}`, updatedData);
export const deleteTeacher = (id) => axios.delete(`${API_BASE_URL}/teachers/delete/${id}`);
export const signupTeacher = (teacherData) => axios.post(`${API_BASE_URL}/teachers/signup`, teacherData);
export const loginTeacher = (loginData) => axios.post(`${API_BASE_URL}/teachers/login`, loginData);

// Class APIs
export const addClass = (classData) => axios.post(`${API_BASE_URL}/classes/add`, classData);
export const getClasses = () => axios.get(`${API_BASE_URL}/classes/all`);
export const updateClass = (id, updatedData) => axios.put(`${API_BASE_URL}/classes/update/${id}`, updatedData);
export const deleteClass = (id) => axios.delete(`${API_BASE_URL}/classes/delete/${id}`);

// Admin APIs
export const addAdmin = (adminData) => axios.post(`${API_BASE_URL}/admins/add`, adminData);
export const getAdmins = () => axios.get(`${API_BASE_URL}/admins/all`);
export const updateAdmin = (id, updatedData) => axios.put(`${API_BASE_URL}/admins/update/${id}`, updatedData);
export const deleteAdmin = (id) => axios.delete(`${API_BASE_URL}/admins/delete/${id}`);
export const loginAdmin = (loginData) => axios.post(`${API_BASE_URL}/admins/login`, loginData);
