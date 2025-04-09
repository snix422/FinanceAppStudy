import { useQuery } from "@tanstack/react-query"
import { getBudgetById } from "../api/budgets/budgets"

const useBudget = (id:number) => {
    const {data : budget, isLoading, error } = useQuery({
        queryKey:['budget',id],
        queryFn: () => getBudgetById(id),
        enabled: !!id
    })

    return{
        budget,
        isLoading,
        error
    }
}

export default useBudget