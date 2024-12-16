import { Alert, Modal } from "@mui/material"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface ExpenseInputs {
    description:string,
    amount:string,
    category:string
}

const ExpenseModal = () => {
    const {register,handleSubmit,formState:{errors},reset} = useForm<ExpenseInputs>()
    const [error,setError] = useState("")

    const ExpenseOptions = {
        description:{
            required:"Email jest wymagany"
        },
        amount:{
            required:"Hasło jest wymagane"
        },
        category:{
            required:"Data rozpoczęcia budżetu jest wymagana"
        },
    }

    const onSubmit : SubmitHandler<ExpenseInputs> = async (formData:ExpenseInputs) => {
        setError("")
        const amount = parseFloat(formData.amount.replace(",", "."));
    if (isNaN(amount)) {
        setError("Invalid amount format.");
        return;
    }
        try {
            const response = await fetch(`http://localhost:5054/api/${4}/expense/create`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                   Description:formData.description,
                   Amount:amount,
                   Category:formData.category
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                setError(errorData);
                return
            }
            const data = await response.json();
            console.log(data);
            localStorage.setItem("authToken",data)
            reset();
        } catch (error) {
            setError("Wystąpił problem z logowaniem")
            console.log(error)
        }
       
        console.log(formData);
    }
    return(
        <Modal open={false}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("description",ExpenseOptions.description)} placeholder="Wpisz opis wydatku" />
            {errors.description?.message ? <Alert>{errors.description.message}</Alert> : null}
            <input type="text" {...register("amount",ExpenseOptions.amount)} placeholder="Wpisz kwotę wydatku" />
            {errors.amount?.message ? <Alert>{errors.amount.message}</Alert> : null}
            <select {...register("category",ExpenseOptions.category)}>
                <option value={"kredyt"}>kredyt</option>
                <option value={"rachunki"}>rachunki</option>
                <option value={"zakupy"}>zakupy</option>
                <option value={"paliwo"}>paliwo</option>
            </select>
            {errors.category?.message ? <Alert>{errors.amount?.message}</Alert> : null}
            <button type="submit">Dodaj wydatek</button>
        </form>
        </Modal>
    )
}

export default ExpenseModal