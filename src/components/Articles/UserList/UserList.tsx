import { useEffect, useState } from 'react';
import './UserList.scss'
import UserListItem from './UserListItem';
import client from '../../../client';

function UserList()
{
    const [users, setUsers] = useState([]);
    const [changes, setChanges] = useState(0);

    useEffect(() => {

        client.getMiembros().then(res => {
            console.log(res);
            if(res.status)
            {
                setUsers(res.data);
            }else
            {
                alert("no se pudo optener datos");
            }
        });

    }, [changes]);

    const handleDelete = (id) =>
    {
        if(confirm("¿Desea eliminar el usuario con el id : " + id + "?"))
        {
            client.deleteUser(id).then(r => {
                if(r)
                {
                    setChanges(changes + 1);
                }else
                {
                    alert("no se pudo eliminar");
                }
            });
        }
    }


    const users_list = users.map(
        user => <UserListItem 
        key={user.id}
        id={user.id} 
        img={user.image}
        cedula={user.cedula}
        nombre={user.nombre}
        email={user.correo}
        suscripcion={user.suscripcion}
        onDelete={handleDelete}
        />
    );

    return (
        <div className='comp-user-list'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Suscripcion</th>
                        <th>Correo</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users_list}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;