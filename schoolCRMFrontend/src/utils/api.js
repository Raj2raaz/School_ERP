import axios from 'axios';

const API_URL = "http://localhost:5000/api/users/signup"; // Replace with your backend URL

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData);
    return response.data; // You can use the response data as needed
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
};


export const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };
  