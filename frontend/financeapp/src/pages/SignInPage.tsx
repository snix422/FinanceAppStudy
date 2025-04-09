import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../styles/SignInPage.css"
import { useAuth } from "../hooks/useAuth";


interface SignInTypeInputs {
    email:string,
    password:string
}

const SignInPage = () => {
    const {register, handleSubmit,formState:{errors},reset} = useForm<SignInTypeInputs>();
    const [loginError, setLoginError] = useState("");
    const context = useAuth();
    const loginOptions = {
        email:{
            required:"Email jest wymagany"
        },
        password:{
            required:"Hasło jest wymagane"
        }
    }
    
    const onSubmit : SubmitHandler<SignInTypeInputs> = async (formData:SignInTypeInputs) => {
        setLoginError("")
        try {
            context.loginUser({email:formData.email, password:formData.password})
        } catch (error) {
            console.log(error)
        }
        
       
    }

    console.log(loginError)

    return(
        <main className="login-page">
            <h1 className="login-title">Logowanie</h1>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input className="input-field" type="text" {...register("email",loginOptions.email)} placeholder="Wpisz swój email..." />
                {errors.email?.message ? <span className="error-message">{errors.email.message}</span>:null}
                <input className="input-field" type="text" {...register("password",loginOptions.password)} placeholder="Wpisz swoje hasło..." />
                {errors.password?.message ? <span className="error-message">{errors.password.message}</span>:null}
                <button className="submit-button" type="submit">Zaloguj się</button>
                {loginError == "Invalid email or password." ? <span className="error-message">Nieprawidłowe dane logowania</span> : null}
            </form>
            <Link className="back-link" to={"/"}>Powrót na stronę główną</Link>
        </main>
    )
}

export default SignInPage