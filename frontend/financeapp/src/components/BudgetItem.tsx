import { Button, Card } from "@mui/material"
import { Link } from "react-router-dom"

const BudgetItem = (props:any) => {
    console.log(props)
    return(
        <Card>
            <h2>{props.title}</h2>
            <Link to={`/budget/${props.id}`}><Button>P0każ szczegóły</Button></Link>
        </Card>
    )
}

export default BudgetItem