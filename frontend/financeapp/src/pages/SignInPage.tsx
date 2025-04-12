import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../styles/SignInPage.css"
import { useAuth } from "../hooks/useAuth";
import { useError } from "../hooks/useError";


interface SignInTypeInputs {
    email:string,
    password:string
}

const SignInPage = () => {
    const {register, handleSubmit,formState:{errors},reset} = useForm<SignInTypeInputs>();
    const [loginError, setLoginError] = useState("");
    const { loginUser } = useAuth();
    const { error, dispatchError } = useError(); 
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
            await loginUser({email:formData.email, password:formData.password})
            reset();
        } catch (error:any) {
            console.log(error,"asdad")
            dispatchError(error.response?.data || 'Wystąpił błąd przy logowaniu' )
        }
        
       
    }

   
    return(
        <main className="login-page">
            <h1 className="login-title">Logowanie</h1>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input className="input-field" type="text" {...register("email",loginOptions.email)} placeholder="Wpisz swój email..." />
                {errors.email?.message ? <span className="error-message">{errors.email.message}</span>:null}
                <input className="input-field" type="password" {...register("password",loginOptions.password)} placeholder="Wpisz swoje hasło..." />
                {errors.password?.message ? <span className="error-message">{errors.password.message}</span>:null}
                <button className="submit-button" type="submit">Zaloguj się</button>
                {loginError == "Invalid email or password." && <span className="error-message">Nieprawidłowe dane logowania</span>}
                {error && <span className="error-message">{error}</span>}
            </form>
            <Link className="back-link" to={"/"}>Powrót na stronę główną</Link>
        </main>
    )
}

export default SignInPage