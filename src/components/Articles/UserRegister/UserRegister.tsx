import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./UserRegister.scss"
import client from "../../../client";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const ProfileImage = ({onSelect}) =>
{
    const [image, setImage] = useState("/default.png")
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        if(event.target.files && event.target.files.length > 0)
        {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onload = (e : ProgressEvent<FileReader>) =>
            {
                setImage(e.target?.result);
                onSelect(e.target?.result);
            }
            
    
            reader.readAsDataURL(file)
        }else
        {
            setImage("/default.png");
            onSelect("");
        }
    }

    return (
        <label className="profile-image">
            <div className="preview">
                <img src={image} alt="" />
                <p>Tomar imagen de perfil</p>
            </div>
            <input type="file" onChange={handleChange} name="" id="" />
        </label>
    );
}

const Form = ({setMode, onChange, values, onSelectImage}) => 
{
    return (
        <>
            <div className="form-row">
                <div className="form-col">
                    <input type="text" value={values.cedula} onChange={onChange} name="cedula" placeholder="Ingresar cedula" />
                    <input type="text" value={values.nombre} onChange={onChange}  name="nombre" placeholder="Ingresar nombre" />
                    <input type="text" value={values.apellido} onChange={onChange}  name="apellido" placeholder="Ingresar apellido" />
                    <input type="text" value={values.correo} onChange={onChange}  name="correo" placeholder="Ingresar correo" />
                </div>
                <div className="form-col between">
                    <button onClick={setMode} className="green">Asignar Membresia</button>

                    <button type="submit" className="blue">Registrar Usuario</button>
                </div>
            </div>
            <div className="form-row">
                <div className="form-col">
                    <ProfileImage onSelect={onSelectImage} />
                </div>
                <div className="form-col">
                
                </div>
            </div>
        </>
    );
}

const Table = ({onSelect}) =>
{
    const [membresias, setMembresias] = useState([]);

    useEffect(() =>  {
        client.getMembresias().then(res => 
            {
                if(res.status)
                    setMembresias(res.data);
            }
        )
    }, []);

    const list = (membresias.map(mem => (
        <tr key={mem.id}>
            <td className="text-center">{mem.id}</td>
            <td>{mem.nombre}</td>
            <td>{mem.plazo} días</td>
            <td>{mem.precio}$</td>
            <td>{mem.entrenamiento != 0 ? `${mem.entrenamiento} horas` : "No"}</td>
            <td>{mem.sauna ? "Sí" : "No"}</td>
            <td>{mem.familiar ? "Sí" : "No"}</td>
            <td>
                <button onClick={() => onSelect(mem.id)} className="membresia">
                    Suscribir
                </button>
            </td>
        </tr>
    )));


    return (
        <table>
            <thead>
                <tr>
                    <th className="text-center">ID</th>
                    <th>Nombre</th>
                    <th>Plazo</th>
                    <th>Precio</th>
                    <th>Entrenamiento</th>
                    <th>Sauna</th>
                    <th>Familiar</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    );
}

function UserRegister()
{
    const [mode, setMode] = useState(0);

    const navegate = useNavigate();

    const [formData, setFormData] = useState({
        membresia: 0,
        correo: "",
        cedula: "",
        nombre: "",
        apellido: "",
        image: ""
    })

    const setTable = () => setMode(1);

    const handleSelectMembresia = (id_mem) =>
    {
        console.log(id_mem);
        setFormData({...formData, membresia: id_mem});
        setMode(0);
    }

    const handleSelectImage = image =>
    {
        setFormData({...formData, image});
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event : FormEvent) =>
    {
        event.preventDefault();
        console.log(formData);
        client.userRegister(formData).then(res =>
            {
                if(res.status)
                {
                    alert(`Usuario registrado con la contraseña temporal : ${res.data.temp_pass}`)
                    navegate("/dashboard/usuarios");
                }
                else if(res.message)
                {
                    console.log(res.message);
                    alert(res.message);
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="comp-user-register">
               { mode ?
                <Table onSelect={handleSelectMembresia}/> :
                <Form values={formData} onSelectImage={handleSelectImage} onChange={handleChange} setMode={setTable}/>
               }
            </div>
        </form>
    );
}

export default UserRegister;