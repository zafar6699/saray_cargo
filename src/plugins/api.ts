import axios from "axios";
import router from "../router/index";
const $axios = axios.create({
  baseURL: "https://sarayexpress.uz/",
});

$axios.interceptors.request.use(
  (config): any => {
    const token = localStorage.getItem("access_token");
    config.headers["Accept"] = "application/json";
    if (token) {
      config.headers["AUTHORIZATION"] = `Bearer ${token}`;
    }
    return config;
  },
  (error): any => {
    return Promise.reject(error);
  }
);
$axios.interceptors.response.use(
  (response): any => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error): any => {
    console.log(error);
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          // 400 page
          break;
        case 401:
          // 401 page
          break;
        case 403:
          router.push({
            name: "login",
            query: { redirect: router.currentRoute.value.fullPath },
          });
          break;
        case 404:
          // not found page
          break;
        case 502:
          setTimeout(() => {
            router.push({
              name: "login",
              query: { redirect: router.currentRoute.value.fullPath },
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);
export default $axios;
