import axios from "axios"
const baseURL = "https://seashell-app-cthwc.ondigitalocean.app/"

export const instance = axios.create({
    baseURL: baseURL
});

export const getChats = async () =>{
    try{
        const response =  await instance.get("api/v1/chat/")
        return {
            response : response?.data
        }
    }catch(error){
        console.log(error, "error at ChatService")
        return error;
    }
}