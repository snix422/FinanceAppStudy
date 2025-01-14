import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignInPage.css"

interface SignInTypeInputs {
    email:string,
    password:string
}

const SignInPage = () => {
    const {register, handleSubmit,formState:{errors},reset} = useForm<SignInTypeInputs>();
    const [loginError, setLoginError] = useState("");
    const loginOptions = {
        email:{
            required:"Email jest wymagany"
        },
        password:{
            required:"Hasło jest wymagane"
        }
    }

    const navigate = useNavigate();

    const onSubmit : SubmitHandler<SignInTypeInputs> = async (formData:SignInTypeInputs) => {
        setLoginError("")
        try {
            const response = await fetch("http://localhost:5054/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email:formData.email,
                    password:formData.password  
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                setLoginError(errorData.message);
                return
            }
            const data = await response.json();
            const { token, name, role } = data;

            console.log(data);

            // Zapisz token i inne dane w localStorage jako JSON
            localStorage.setItem("authToken", token);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    name,
                    role,
                })
            );
            navigate("/")
            reset();
        } catch (error) {
            setLoginError("Wystąpił problem z logowaniem")
            console.log(error)
        }
       
        console.log(formData);
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