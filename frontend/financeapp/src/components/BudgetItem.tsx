import { Button, Card } from "@mui/material"
import { Link } from "react-router-dom"
import "../styles/BudgetItem.css"

interface BudgetItemProps {
    title:string,
    deleteBudget: any,
    id:number,
    isAdmin:boolean
}

const BudgetItem : React.FC<BudgetItemProps> = ({title,deleteBudget,id,isAdmin}) => {
    console.log(id)
    const handleDeleteBudget = () => deleteBudget.mutateAsync(id)
    return(
        <div className="budget-card">
            <h2 className="budget-title">{title}</h2>
            {isAdmin ? <button className="delete-button" onClick={handleDeleteBudget}>Usuń</button> : 
            <Link className="button-details" to={`/budget/${id}`}><Button>P0każ szczegóły</Button></Link>}
        </div>
    )
}

export default BudgetItem