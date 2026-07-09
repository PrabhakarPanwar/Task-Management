import { toast } from "react-toastify";

export function toastify(res, location) {
  if (res.data.success) {
    return toast.success(res.data.msg);
  }
  toast.error(res.data.error);
  if (location) {
    setTimeout(() => {
      window.location.href = location;
    }, 1000);
  }
}
