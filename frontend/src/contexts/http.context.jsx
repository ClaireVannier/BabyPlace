import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const HttpContext = createContext();

export const useHttp = () => {
  return useContext(HttpContext);
};

export const HttpProvider = ({ children }) => {
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

  const [httpToken, setHttpToken] = useState("");
  const [get, setGet] = useState(() => () => { });
  const [post, setPost] = useState(() => () => { });
  const [put, setPut] = useState(() => () => { });

  const getConfig = () => {
    const config = { headers: {} };
    if (httpToken) {
      config.headers.Authorization = `Bearer ${httpToken}`;
    }
    return config;
  };

  const getWithoutToken = (url) => {
    return axios.get(`${baseUrl}/${url}`);
  }
  const postWithoutToken = (url, content) => {
    return axios.post(`${baseUrl}/${url}`, content);
  }

  useEffect(() => {
    setGet(() => (url) => axios.get(`${baseUrl}/${url}`, getConfig()));
    setPost(() => (url, content) => axios.post(`${baseUrl}/${url}`, content, getConfig()));
    setPut(() => (url, content) => axios.put(`${baseUrl}/${url}`, content, getConfig()));
  }, [httpToken]);

  return (
    <HttpContext.Provider value={{ setHttpToken, get, post, put, getWithoutToken, postWithoutToken }}>
      {children}
    </HttpContext.Provider>
  );
};

export default HttpContext;
