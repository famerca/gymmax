import './Bar.scss'
import UserItem from '../UserItem/UserItem';
import { Link } from 'react-router-dom';
function Bar()
{
    return (
        <nav className='comp-bar'>
            <UserItem nombre={"fabian"} rol={0} />

            <ul>
                <li>
                    <Link to={"./usuarios"}>
                        <i className="fa fa-user"></i>
                        <span>Usuarios</span>
                    </Link>
                </li>
                <li>
                    <a href="">
                        <i className="fa fa-check"></i>
                        <span>Check-In</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className="fa fa-arrow-circle-left"></i>
                        <span>Check-out</span>
                    </a>
                </li>
                <li>
                   
                    <Link to={"./registro"}>
                        <i className="fa fa-plus-circle"></i>
                        <span>Registrar</span>
                    </Link>
                    
                </li>
            </ul>
            <button className='close-sesion'>
                    <i className="fa fa-times-circle"></i>
                    <span>Salir</span>
            </button>
        </nav>
    )
}

export default Bar;