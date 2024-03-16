import axios from "axios";

export const api = axios.create({
  baseURL: "http://62.109.17.80/api",
});