import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 500, // 500ms
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
};

//response interceptor to refresh token on receiving token expired error

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // const headers = { ...originalRequest.headers };

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        await refreshToken();
        console.log(error.response.status + " " + originalRequest._retry);
        originalRequest._retry = true;
        return axios.request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
