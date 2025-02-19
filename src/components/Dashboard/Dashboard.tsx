import './Dashboard.scss'
import Header from '../Header/Header';
import Bar from '../Bar/Bar';
import UserList from '../Articles/UserList/UserList';
import { useParams } from 'react-router-dom';
import UserRegister from '../Articles/UserRegister/UserRegister';
import UserEdit from '../Articles/UserEdit/UserEdit';

function Dashboard()
{
    let {article, id} = useParams();
    article = article || "usuarios";

    let title, component;

    switch (article) {
        case 'usuarios':
            title = "Lista de usuarios";
            component = <UserList />;
            break;
        case 'registro':
            title = "Registro";
            component = <UserRegister />;
            break;
        case 'editar':
            title = "Editar Usuario";
            component = <UserEdit userid={id} />;
            break;
    
        default:
            title = "Lista de usuarios";
            component = <UserList />;
            break;
    }

    console.log(article);
    return (
        <main className='comp-dashboard'>
            <Header />
            <Bar />
            <article>
                <div className="title-article">
                    <h2>{title}</h2>
                    <button>
                        Filtrar
                        <i className="fa fa-filter"></i>
                    </button>
                </div>

                {component}
                
            </article>
        </main>
    );
}

export default Dashboard;