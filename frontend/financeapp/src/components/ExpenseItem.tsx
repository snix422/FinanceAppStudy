const ExpenseItem = (props:any) => {
    return(
        <div>
            <h2>{props.data.description}</h2>
            <h3>{props.data.amount}</h3>
            <button>Delete</button>
        </div>
    )
}

export default ExpenseItem