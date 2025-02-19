import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./UserEdit.scss"
import client from "../../../client";
import { useNavigate } from "react-router-dom";

const ProfileImage = ({img, onSelect}) =>
{
    const [image, setImage] = useState(`/default.png`);

    useEffect(() => {

        if(image == "/default.png" && img != "")
        {
            setImage(`/photos/${img}`);
            console.log("aqui");
        }

    }, [img]);

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


function UserEdit({userid})
{

    const navegate = useNavigate();

    if(!userid)
    {
        navegate("./usuarios");
    }

    const [formData, setFormData] = useState({
        id: userid,
        correo: "",
        cedula: "",
        nombre: "",
        apellido: "",
        image: ""
    })

    useEffect(() => {
        client.getUser(userid).then(r => {
            if(r.status)
            {
                setFormData(r.data)
            }
        });
    }, []);


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

        client.updateUser(formData).then(r => {
            console.log(r)
            if(r)
            {
                alert("Usuario editado");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="comp-user-register">
                <div className="form-row">
                    <div className="form-col">
                        <input type="text" value={formData.cedula} onChange={handleChange} name="cedula" placeholder="Ingresar cedula" />
                        <input type="text" value={formData.nombre} onChange={handleChange}  name="nombre" placeholder="Ingresar nombre" />
                        <input type="text" value={formData.apellido} onChange={handleChange}  name="apellido" placeholder="Ingresar apellido" />
                        <input type="text" value={formData.correo} onChange={handleChange}  name="correo" placeholder="Ingresar correo" />
                    </div>
                    <div className="form-col between">


                        <button type="submit" className="blue">Editar Usuario</button>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col">
                        <ProfileImage img={formData.image} onSelect={handleSelectImage} />
                    </div>
                    <div className="form-col">
                    
                    </div>
                </div>
            </div>
        </form>
    );
}

export default UserEdit;