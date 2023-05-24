import { toast } from "react-toastify";
import { Slide } from "react-toastify";
export const ToastSuccess = (message, time) => {
  toast["success"](message || "success", {
    position: "top-right",
    autoClose: time || 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: false,
    closeButton: true,
    transition: Slide,
    progress: undefined,
    closeOnClick: false,
    theme: "light",
  });
};

export const ToastError = (message, time) => {
  toast["error"](message || "error", {
    position: "top-right",
    autoClose: time || 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: false,
    closeButton: true,
    transition: Slide,
    progress: undefined,
    closeOnClick: false,
    theme: "light",
  });
};

export const ToastLoading = (message, time) => {
  toast["loading"](message || "loading", {
    position: "top-right",
    autoClose: time || 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
