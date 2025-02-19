import "./Login.scss"
import { ChangeEvent, FormEvent, useState } from 'react'
import client from "../../client";
import { useNavigate } from "react-router-dom";

const Password = (props) =>
{
    const [open, setOpen] = useState(false);
    return (
    <div className="comp-password">
        <input value={props.value} onChange={props.onChange} type={open ? "text" : "password"} name="password" placeholder="Escribe tu contraseña" />
        <i onClick={ () => {setOpen(!open)} } 
        className={open ? "fa fa-eye-slash" : "fa fa-eye"} />
        <span>¿Olvidaste tu contraseña?</span>
    </div>
    );
}


function Login()
{
    const navegate = useNavigate();

    const [form, setForm] = useState({
        cedula: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };

    const handleSubmit = (event: FormEvent) =>
    {
        event.preventDefault();
        console.log(form);

        client.login(form).then(res => {
            if(res.status)
            {
                navegate("/dashboard");
                
            }
            else
                setErrorMessage(res.message as string);
        });
    }

    const error_message = <div className="error-message">{errorMessage}</div>

    return (
    <div className="comp-login">
        <h1>Bienvenido a GymMax</h1>
        <div className="login-card">
            <h2>Inciar sesion</h2>
            {errorMessage != "" ? error_message : ""}
            <form onSubmit={handleSubmit} action="" method="post">
                <input type="text" value={form.cedula} onChange={handleChange} name="cedula" placeholder="Escribe tu cedula" />
                <Password value={form.password} onChange={handleChange} />

                <button type="submit">Inciar sesion</button>

            </form>

        </div>

    </div>
    );
}

export default Login;