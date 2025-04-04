import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import BudgetsList from "../components/BudgetsList";
import useBudgets from "../hooks/useBudgets";

const UserPanelAdmin = () => {
    const {id} = useParams();

    const {budgets , isLoading , error, removeBudget} = useBudgets();
    
    return(
        <main>
            <BudgetsList budgets={budgets} isAdmin={true} deleteBudget={removeBudget} />
            <Link to={"/"}>Wróć</Link>
        </main>
    )
}

export default UserPanelAdmin