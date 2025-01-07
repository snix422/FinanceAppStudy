import { Link } from "react-router-dom"

const UserItem = (props:any) => {
    return(
        <div>
            <h2>{props.data.email}</h2>
            <Link to={`/user/${props.data.id}`}>Pokaż budżety</Link>
        </div>
    )
}

export default UserItem