import { useMutation, useQuery } from "@tanstack/react-query"
import { getUsers, login,register } from "../api/auth/auth"

const useAuth = () => {
    const {data: users, isLoading , error } = useQuery({
        queryKey:['auth'],
        queryFn:getUsers
    })

    const loginMutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) => login(credentials),
        onSuccess: (data:any) => {
            console.log(data);
            localStorage.setItem("token",data.token)
        }
    });

    const registerMutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) => register(credentials),
        onSuccess: (data:any) => {
            console.log(data);
        }
    });

    const logOut = () => {
        localStorage.removeItem("token")
    }

   return {
    users,
    isLoading,
    error,
    login:loginMutation,
    reigster:registerMutation,
    logOut
   }
}

export default useAuth