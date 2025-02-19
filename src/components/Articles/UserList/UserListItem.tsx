import { useNavigate } from "react-router-dom";
import "./UserListItem.scss";

function UserListItem({id, img, cedula, nombre, suscripcion, email, onDelete})
{
    const navegate = useNavigate();

    const editUser = id => 
    {
        navegate(`./editar/${id}`);
    }

    return (
        <tr className="comp-user-list-item">
            <td >
                <div className="img-cell">
                    <img src={`/photos/${img}`} alt="" />
                </div>
            </td>
            <td>
                {cedula}
            </td>
            <td>{nombre}</td>
            <td>{suscripcion}</td>
            <td>{email}</td>
            <td>
                <div className="actions">
                    <button className="gray">
                        <i className="fa fa-check-circle"></i>
                    </button>
                    <button className="gray">
                        <i className="fa fa-arrow-circle-left"></i>
                    </button>
                    <button onClick={() => editUser(id)} className="green">
                        <i className="fa fa-pen"></i>
                    </button>
                    <button onClick={() => onDelete(id)} className="red">
                        <i className="fa fa-times-circle"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default UserListItem;