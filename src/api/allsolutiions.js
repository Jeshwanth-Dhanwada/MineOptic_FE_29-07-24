import axios from "axios";
import { BASE_URL } from "../constants/apiConstants";

export const getAllSoultions = () => {
    const apiUrl = `${BASE_URL}/api/AllExecutions`
    // return
        return new Promise((resolve, reject) => {
            axios.get(apiUrl)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error, "Error ");
                reject(error)
            });
        })
}