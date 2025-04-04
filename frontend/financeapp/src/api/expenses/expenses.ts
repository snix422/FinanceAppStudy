import { axiosClient } from "../axiosClient"

export const getExpensesForBudget = async (budgetId:number) => {
    try {
        const { data } = await axiosClient.get(`/budgets/${budgetId}/expenses`);
        return data; 
    } catch (error) {
        throw error
    }
  
}

export const createExpense = async (budgetId:number, expense: {Description: string, Amount:number, Category:string}) => {
    try {
        const { data } = await axiosClient.post(`/budgets/${budgetId}/expenses`, expense);
        return data; 
    } catch (error) {
        throw error
    }
}

export const removeExpense = async (budgetId:number,expenseId:number) => {
    try {
        const { data } = await axiosClient.post(`/budgets/${budgetId}/expenses/${expenseId}`,);
        return data; 
    } catch (error) {
        throw error
    }
}