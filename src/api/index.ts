import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.jsonserver.io/",
  headers: { "X-Jsio-Token": "e6b4d45a73a7e8d027a4da80ba5d4778" },
});