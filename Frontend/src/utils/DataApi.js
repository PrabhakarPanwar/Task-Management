import { toast } from "react-toastify";
import api from "./api"; // API_URL no longer needed here
import axios from "axios";
import { toastify } from "./toast";

export async function sendData(url, data) {
  try {
    const res = await axios.post(url, data);
    if (!res.data.success) {
      return toast.error(res.data.error);
    }
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.userName);
    }
    toast.success(res.data.msg);
    setTimeout(() => {
      window.location.href = res.data.location || "/dashboard";
    }, 800);
  } catch (err) {
    toast.error(
      err.response?.data?.error || "Something went wrong. Please try again.",
    );
  }
}

export async function sendVerify() {
  const res = await api.get("/api/dashboard");
  toastify(res, "/login");
  return res.data;
}

export async function taskList() {
  try {
    const res = await api.get("/api/tasks");
    return res.data.task;
  } catch {
    toast.error("DB not responding.");
  }
}
