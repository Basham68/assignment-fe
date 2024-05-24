import axios from "axios";

export const authAxios = axios.create({
  baseURL: "http://localhost:8800/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
