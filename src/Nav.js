import {NavLink} from 'react-router-dom';


function Nav () {
    
    return(
        <nav className="main-nav">
            <ul>
                <li><NavLink exact to='/'>Recent</NavLink></li>
                <li><NavLink to='/cars'>Cars</NavLink></li>
                <li><NavLink to='/cats'>Cats</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav