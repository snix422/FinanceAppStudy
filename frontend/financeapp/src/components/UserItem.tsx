import { Link } from "react-router-dom"
import "../styles/BudgetItem.css"

const UserItem = (props:any) => {
    return(
        <div className="budget-card">
            <h2 className="budget-title">{props.data.email}</h2>
            <Link className="button-delete" to={`/user/${props.data.id}`}>Pokaż budżety</Link>
        </div>
    )
}

export default UserItem