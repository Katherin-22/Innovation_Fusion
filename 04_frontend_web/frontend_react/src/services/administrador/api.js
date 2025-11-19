import axios from "axios";

const api_url = axios.create({
    baseURL: "http://localhost:8080"
});
export default api_url;