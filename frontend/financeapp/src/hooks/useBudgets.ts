import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createBudget, getAllBudgets, removeBudget } from "../api/budgets/budgets"

const useBudgets = () => {
    const queryClient = useQueryClient();
    const {data: budgets, isLoading , error} = useQuery({
        queryKey:['budgets'],
        queryFn:getAllBudgets
    })

    const addBudgetMutation = useMutation({
        mutationFn:(budget: {Title: string, TotalAmount:number, StartDate:string, EndDate:string }) => createBudget(budget),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
          },
    })

    const removeBudgetMutation = useMutation({
        mutationFn:(id:number) => removeBudget(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
          },
    })

    return {budgets, isLoading, error, addBudget: addBudgetMutation, removeBudget: removeBudgetMutation}
}

export default useBudgets