import axios from "axios"
const baseURL = "https://seashell-app-cthwc.ondigitalocean.app/"

export const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Authorization": localStorage.getItem("token") ? `token ${localStorage.getItem("token")}` : "",
    }
});

export const getAttandants = async () =>{
    try{
        const response =  await instance.get("api/v1/attendants/")
        return {
            response: response?.data
        }
    }catch(error){
        console.log(error, "error at getAttandants")
        return {
			error: error,
		};
    }
}

export const getAttandantData = async (id) =>{
    try{
        const response =  await instance.get(`api/v1/attendants/${id}/`)
        return {
            response: response?.data
        }
    }catch(error){
        console.log(error, "error at getAttandantData")
        return {
			error: error,
		};
    }
}

export const deleteAttandantData = async (id) =>{
    try{
        const response =  await instance.delete(`api/v1/attendant/${id}/`)
        return {
            response: response?.data
        }
    }catch(error){
        console.log(error, "error at getAttandantData")
        return {
			error: error,
		};
    }
}

export const putAttandantData = async (id, data) =>{
    try{
        const response =  await instance.put(`api/v1/attendant/${id}/`,data)
        return {
            response: response?.data
        }
    }catch(error){
        console.log(error, "error at getAttandantData")
        return {
			error: error,
		};
    }
}

export const createAttandantData = async (data) =>{
    try{
        const response =  await instance.post(`api/v1/createAttendant/`,data)
        return {
            response: response?.data
        }
    }catch(error){
        console.log(error, "error at getAttandantData")
        return {
			error: error,
		};
    }
}