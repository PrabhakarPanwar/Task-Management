import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "./api";

export async function sendData(url, data) {
  const res = await axios.post(url, data);
  if (!res.data.success) {
    return toast.error(res.data.error);
  }
  if (res.data.token) {
    const token = res.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("username", res.data.userName);
  }
  toast.success(res.data.msg);
  setTimeout(() => {
    window.location.href = res.data.location;
  }, 1000);
}

export async function sendVerify() {
  const currentToken = localStorage.getItem("token");
  if (!currentToken) {
    window.alert("Access denied. Please Login.");
    window.location.href = "/login";
    return;
  }
  try {
    const res = await axios.get(`${API_URL}/api/dashboard`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.data.success) {
      window.alert(res.data.error);
      window.location.href = "/login";
    }
  } catch {
    window.alert("Something went wrong. Please Login again.");
    window.location.href = "/login";
  }
}

export async function taskList() {
  const currentToken = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });
    if (!res.data.success) {
      return toast.error(res.data.error);
    }
    return res.data.task;
  } catch {
    toast.error("DB not responding.");
  }
}
