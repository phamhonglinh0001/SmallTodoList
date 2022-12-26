import axios from 'axios';
import Contants from "../contants";

export async function checkLogin(data) {
    try {
        const response = await axios.post(Contants.API.BASE_URL + Contants.API_PATH.LOGIN, {data});
        return response
    } catch (error) {
        console.error(error);
    }
}
