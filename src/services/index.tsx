import axios from "axios";

const api = axios.create({

  baseURL: "https://dev.daykart.com",
  headers: {
    "ngrok-skip-browser-warning": "6024"
  }
});

export const setAuthToken = (token: string | undefined) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.response.use(
  response=>response,
  error => {
    if (error.status === "401") {
      setAuthToken(undefined);
    }
    return Promise.reject(error);
  }
);


export default api;