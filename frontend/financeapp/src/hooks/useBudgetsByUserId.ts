import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllBudgetsByUserId, removeBudget } from "../api/budgets/budgets"

const useBudgetsByUserId = (userId:number) => {
    const queryClient = useQueryClient();
    const { data : budgets, isLoading , error } = useQuery({
        queryKey:['budgetsByUserId'],
        queryFn: () => getAllBudgetsByUserId(userId)
    }) 

    const removeBudgetMutation = useMutation({
        mutationFn:(id:number) => removeBudget(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgetsByUserId'] });
          },
    })

    return {
        budgets,
        isLoading,
        error,
        removeBudget:removeBudgetMutation
    }
}

export default useBudgetsByUserId