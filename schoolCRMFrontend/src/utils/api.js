import axios from "axios";

const API_BASE_URL = "https://school-erp-cyil.onrender.com"; // Base URL for your backend API

// Student APIs
export const addStudent = (studentData) =>
  axios.post(`${API_BASE_URL}/students/add`, studentData);
export const getStudents = () => axios.get(`${API_BASE_URL}/students/all`);
export const updateStudent = (id, updatedData) =>
  axios.put(`${API_BASE_URL}/students/update/${id}`, updatedData);
export const deleteStudent = (id) =>
  axios.delete(`${API_BASE_URL}/students/delete/${id}`);
export const signupStudent = (studentData) =>
  axios.post(`${API_BASE_URL}/students/signup`, studentData);
export const loginStudent = (loginData) =>
  axios.post(`${API_BASE_URL}/students/login`, loginData);

// Teacher APIs
export const addTeacher = (teacherData) =>
  axios.post(`${API_BASE_URL}/teachers/add`, teacherData);
export const getTeachers = () => axios.get(`${API_BASE_URL}/teachers/all`);
export const updateTeacher = (id, updatedData) =>
  axios.put(`${API_BASE_URL}/teachers/update/${id}`, updatedData);
export const deleteTeacher = (id) =>
  axios.delete(`${API_BASE_URL}/teachers/delete/${id}`);
export const signupTeacher = (teacherData) =>
  axios.post(`${API_BASE_URL}/teachers/signup`, teacherData);
export const loginTeacher = (loginData) =>
  axios.post(`${API_BASE_URL}/teachers/login`, loginData);

// Class APIs
export const addClass = (classData) =>
  axios.post(`${API_BASE_URL}/classes/add`, classData);
export const getClasses = () => axios.get(`${API_BASE_URL}/classes/all`);
export const updateClass = (id, updatedData) =>
  axios.put(`${API_BASE_URL}/classes/update/${id}`, updatedData);
export const deleteClass = (id) =>
  axios.delete(`${API_BASE_URL}/classes/delete/${id}`);

// Admin APIs
export const addAdmin = (adminData) =>
  axios.post(`${API_BASE_URL}/admins/add`, adminData);
export const getAdmins = () => axios.get(`${API_BASE_URL}/admins/all`);
export const updateAdmin = (id, updatedData) =>
  axios.put(`${API_BASE_URL}/admins/update/${id}`, updatedData);
export const deleteAdmin = (id) =>
  axios.delete(`${API_BASE_URL}/admins/delete/${id}`);
export const loginAdmin = (loginData) =>
  axios.post(`${API_BASE_URL}/admins/login`, loginData);
