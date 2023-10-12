import {Link} from 'react-router-dom';
import image from '../img/logo_blanc_recadre.png';

const Nav = () => {
    return (
        <nav className='menu_navigation'>
            <img className='mon_image' src={image}></img>
            <ul>
                <li><Link to="/admin">Administration du chat</Link></li>

            </ul>
        </nav>
    );
};

export default Nav;