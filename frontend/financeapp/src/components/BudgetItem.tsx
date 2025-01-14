import { Button, Card } from "@mui/material"
import { Link } from "react-router-dom"
import "../styles/BudgetItem.css"

const BudgetItem = (props:any) => {
    console.log(props)
    return(
        <div className="budget-card">
            <h2 className="budget-title">{props.title}</h2>
            {props.isAdmin ? <button className="button-delete" onClick={()=>props.deleteBudget(props.id)}>Usuń</button> : <Link className="button-details" to={`/budget/${props.id}`}><Button>P0każ szczegóły</Button></Link>}
        </div>
    )
}

export default BudgetItem