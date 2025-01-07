import UserItem from "./UserItem"

const UsersList = (props:any) => {
    return(
        <div>
            {props.users.map((u:any)=> <UserItem data={u} />)}
        </div>
    )
}

export default UsersList