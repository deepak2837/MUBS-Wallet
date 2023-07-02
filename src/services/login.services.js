import axios from "axios"
const baseURL = "https://seashell-app-cthwc.ondigitalocean.app/"

export const instance = axios.create({
    baseURL: baseURL
});

export const LoginService = async (data) =>{
    try{
        const response =  await instance.post("api-token-auth/",data)
        return {
            token : response?.data?.token
        }
    }catch(error){
        console.log(error, "error at LoginSerivce")
        return error;
    }
}