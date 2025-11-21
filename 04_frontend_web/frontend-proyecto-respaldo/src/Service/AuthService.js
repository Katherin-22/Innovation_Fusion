import axios from "axios";

export const login = async (data) => {
    return await axios.post("http://localhost:9090/api/v1.0/login", data);
}