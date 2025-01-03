import { Modal } from "@mui/material"
import { title } from "process";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"

interface BudgetModalInputs {
    title:string,
    price:string,
    startBudget:string,
    endBudget:string
}

const BudgetModal = (props:any) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm<BudgetModalInputs>();
    const [error,setError] = useState("")

    const BudgetOptions = {
        title:{
            required:"Email jest wymagany"
        },
        price:{
            required:"Hasło jest wymagane"
        },
        startBudget:{
            required:"Data rozpoczęcia budżetu jest wymagana"
        },
        endBudget:{
            required:"Data zakończenia budżetu jest wymagana"
        }
    }

    const onSubmit : SubmitHandler<BudgetModalInputs> = async (formData:BudgetModalInputs) => {
        setError("")
        try {
            const response = await fetch("http://localhost:5054/budget/create",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Dodanie tokena
                },
                body:JSON.stringify({
                   Title:formData.title,
                   TotalAmount:formData.price,
                   StartDate:formData.startBudget,
                   EndDate:formData.endBudget                  
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
        <Modal open={props.isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title",BudgetOptions.title)} placeholder="Wpisz nazwę budżetu" />
            <input type="text" {...register("price",BudgetOptions.price)} placeholder="Wpisz kwotę dostępnego budżetu" />
            <input type="date" {...register("startBudget",BudgetOptions.startBudget)} placeholder="Data zaczęcia budżetu" />
            <input type="date" {...register("endBudget",BudgetOptions.endBudget)}placeholder="Data zakończenia budżetu" />
            <button type="submit">Dodaj budżet</button>
        </form>
        </Modal>
    )
}

export default BudgetModal