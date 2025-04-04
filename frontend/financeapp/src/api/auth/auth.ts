import { axiosClient } from "../axiosClient"

export const register = async (newUser : {email:string,password:string}) => {
    try {
        const {data} = await axiosClient.post("/auth/register", newUser);
        return data
    } catch (error) {
        throw error
    }
}

export const login = async (user : {email:string, password:string}) => {
    try {
        const {data} = await axiosClient.post("/auth/login", user);
        return data
    } catch (error) {
        throw error
    }
}

export const getUsers = async () => {
    try {
        const {data } = await axiosClient.get("/auth/users");
        return data;
    } catch (error) {
        throw error;
    }
}

export const logOut = () => {
    localStorage.removeItem("token")
}