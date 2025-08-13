import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Interceptor simple por si el backend envía errores en un envoltorio común
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg =
      err?.response?.data?.message ??
      err?.message ??
      "Error desconocido llamando a la API";
    return Promise.reject(new Error(msg));
  }
);
