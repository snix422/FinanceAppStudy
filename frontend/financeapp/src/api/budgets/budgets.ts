import { axiosClient } from "../axiosClient"

export const getAllBudgets = async  () => {
    try {
        const {data} = await axiosClient.get("/budgets")
        return data;
    } catch (error) {
        throw error
    }
}

export const getAllBudgetsByUserId = async  (userId: number) => {
    try {
        const {data} = await axiosClient.get(`/user/${userId}/budgets`)
        return data;
    } catch (error) {
        throw error
    }
}

export const getBudgetById = async (id:number) => {
    try {
        const {data} = await axiosClient.get(`/budgets/${id}`)
        return data;
    } catch (error) {
        throw error
    }
}

export const createBudget = async (budget: {Title: string, TotalAmount:number, StartDate:string, EndDate:string }) => {
    try {
        const {data} = await axiosClient.post(`/budgets/`,budget)
        return data;
    } catch (error) {
        throw error
    }
}

export const removeBudget = async (id:number) => {
    try {
        const {data} = await axiosClient.delete(`/budgets/${id}`)
        return data;
    } catch (error) {
        throw error
    }
}