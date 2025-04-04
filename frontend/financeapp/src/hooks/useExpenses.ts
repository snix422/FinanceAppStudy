import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createExpense, getExpensesForBudget, removeExpense } from "../api/expenses/expenses"

const useExpenses = (budgetId :number) => {
    const queryClient = useQueryClient();
    const {data : expenses , isLoading , error} = useQuery({
        queryKey:['expenses'],
        queryFn: () => getExpensesForBudget(budgetId),
        enabled: !!budgetId
    })

    const addExpenseMutation = useMutation({
        mutationFn: ({ budgetId, expense }: { budgetId: number; expense: { Description: string; Amount: number; Category: string } }) => createExpense(budgetId,expense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    })

    const removeExpenseMutation = useMutation({
        mutationFn:({budgetId, expenseId} : {budgetId:number , expenseId:number}) => removeExpense(budgetId,expenseId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
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