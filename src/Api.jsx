import axios from "axios";

export const api = axios.create({
  baseURL: "https://orozmat.mirzabekov.fvds.ru/api/",
});