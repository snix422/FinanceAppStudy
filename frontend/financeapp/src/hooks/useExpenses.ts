import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createExpense, getExpensesForBudget, removeExpense } from "../api/expenses/expenses"

const useExpenses = (budgetId :number) => {
    const queryClient = useQueryClient();
    const {data : expenses = [] , isLoading , error} = useQuery({
        queryKey:['expenses',budgetId],
        queryFn: () => getExpensesForBudget(budgetId),
        enabled: !!budgetId
    })

    const addExpenseMutation = useMutation({
        mutationFn: ( expense : { Description: string; Amount: number; Category: string } ) => createExpense(budgetId,expense),
        onSuccess: (newExpense) => {
            console.log(newExpense,'new expense')
            queryClient.setQueryData(['expenses', budgetId], (oldData: any) => {
                return [...oldData, newExpense]; 
            });
            queryClient.refetchQueries({ queryKey: ['expenses', budgetId] });
        },
    })

    const removeExpenseMutation = useMutation({
        mutationFn:(expenseId:number) => removeExpense(budgetId, expenseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses', budgetId] });
           
        },
    })

    return {
        expenses,
        isLoading,
        error,
        addExpense: addExpenseMutation,
        removeExpense: removeExpenseMutation
    }
}

export default useExpenses