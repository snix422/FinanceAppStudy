import { Alert, Modal } from "@mui/material"
import { title } from "process";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import "../styles/BudgetModal.css"
import closeImg from "../assets/close.png"
import useBudget from "../hooks/useBudget";
import useBudgets from "../hooks/useBudgets";
import { useError } from "../hooks/useError";

interface BudgetModalInputs {
    title:string,
    price:string,
    startBudget:string,
    endBudget:string
}

interface BudgetModelProps {
    isOpen:boolean,
    closeModal: (type:boolean) => void
}

const BudgetModal : React.FC<BudgetModelProps> = (props:any) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm<BudgetModalInputs>();
    const {error, dispatchError} = useError();
    const { addBudget } = useBudgets();

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
        
        try {
            addBudget.mutateAsync({Title:formData.title,TotalAmount:Number(formData.price),
                StartDate:formData.startBudget,EndDate:formData.endBudget})
               
            reset();
            props.closeModal()
        } catch (error:any) {
            dispatchError(error.response?.data || "Wystąpił problem z dodaniem danych")
        }
       
    }

    return(
        <Modal className="modal-container" open={props.isOpen}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title",BudgetOptions.title)} placeholder="Wpisz nazwę budżetu" />
            {errors.title?.message && <Alert>{errors.title.message}</Alert>}
            <input type="text" {...register("price",BudgetOptions.price)} placeholder="Wpisz kwotę dostępnego budżetu" />
            {errors.price?.message && <Alert>{errors.price.message}</Alert>}
            <input type="date" {...register("startBudget",BudgetOptions.startBudget)} placeholder="Data zaczęcia budżetu" />
            {errors.startBudget?.message && <Alert>{errors.startBudget.message}</Alert>}
            <input type="date" {...register("endBudget",BudgetOptions.endBudget)}placeholder="Data zakończenia budżetu" />
            {errors.endBudget?.message && <Alert>{errors.endBudget.message}</Alert>}
            <button type="submit">Dodaj budżet</button>
            {error && <Alert>{error}</Alert>}
            <img className="close-img" src={closeImg} alt="close-icon" onClick={()=>props.closeModal(false)} />
        </form>
        </Modal>
    )
}

export default BudgetModal