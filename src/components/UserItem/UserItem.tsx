import "./UserItem.scss"

function UserItem({nombre, rol})
{
    let perfil = "perfil";
    switch (rol) {
        case 0:
            perfil = "Administrador";
            break;
        case 1:
            perfil = "Recepcionista";
            break;
    
        default:
            break;
    }
    return (
        <div className="comp-user-item">
            <img src="/photos/00044-1069192055-Close portrai___.png" alt="User photo" />
            <div>
                <h3>{nombre}</h3>
                <span>{perfil}</span>
            </div>
        </div>
    );
}

export default UserItem;