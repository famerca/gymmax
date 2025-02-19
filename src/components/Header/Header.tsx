import './Header.scss'

function Header()
{
    return (
        <header className='comp-header'>
            <div className="search-container">
                <i className="fa fa-search"></i>
                <input type="text" placeholder='Buscar' />
            </div>
            <h1>GymMax</h1>
        </header>
    );
}
export default Header;