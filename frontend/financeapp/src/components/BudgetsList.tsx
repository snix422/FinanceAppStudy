import BudgetItem from "./BudgetItem"
import "../styles/BudgetsList.css"


const BudgetsList = (props:any) => {
    return(
        <div className="budgets-container">
            <h2 className="budget-title">Lista budżetów:</h2>
            <div className="budgets-list">
            {props.budgets.map((b:any) => <BudgetItem title={b.title} id={b.id} isAdmin={props.isAdmin} deleteBudget={props.deleteBudget} /> )}
            </div>
        </div>

    )
}

export default BudgetsList