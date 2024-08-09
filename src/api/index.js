import Axios from "axios"

let mineAxios = Axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
})
export default mineAxios