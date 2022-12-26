import axios from 'axios';
import Contants from "../contants";

export async function getAll(data) {
    try {
        const response = await axios.post(Contants.API.BASE_URL + Contants.API_PATH.GET_ALL, {data});
        return response
    } catch (error) {
        console.error(error);
    }
}
export async function deleteItem(data) {
    try {
        const response = await axios.post(Contants.API.BASE_URL + Contants.API_PATH.DELETE, {data});
        return response
    } catch (error) {
        console.error(error);
    }
}

export async function complete(data) {
    try {
        const response = await axios.post(Contants.API.BASE_URL + Contants.API_PATH.COMPLETE, {data});
        return response
    } catch (error) {
        console.error(error);
    }
}

export async function add(data) {
    try {
        const response = await axios.post(Contants.API.BASE_URL + Contants.API_PATH.ADD, {data});
        return response
    } catch (error) {
        console.error(error);
    }
}
