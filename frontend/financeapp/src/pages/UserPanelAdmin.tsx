import { Link, useParams } from "react-router-dom"
import BudgetsList from "../components/BudgetsList";
import useBudgets from "../hooks/useBudgets";
import "../styles/UserPanelAdmin.css"
import useBudgetsByUserId from "../hooks/useBudgetsByUserId";

const UserPanelAdmin = () => {
    const {id} = useParams();

    
    const {budgets, isLoading , error, removeBudget} = useBudgetsByUserId(Number(id))
    
    return(
        <main>
            
            { budgets && <BudgetsList budgets={budgets} isAdmin={true} deleteBudget={removeBudget} /> }
            <Link to={"/"}>Wróć</Link>
        </main>
    )
}

export default UserPanelAdmin