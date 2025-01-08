import BudgetItem from "./BudgetItem"


const BudgetsList = (props:any) => {
    return(
        <div>
            <h2>Lista budżetów:</h2>
            {props.budgets.map((b:any) => <BudgetItem title={b.name} id={b.id} isAdmin={props.isAdmin} deleteBudget={props.deleteBudget} /> )}
        </div>
    )
}

export default BudgetsList