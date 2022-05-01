import axios from "axios";
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS",
    "x-access-token": token,
  },
});
