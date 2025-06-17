const NavbarComponent = () => {

    return (
        <nav className="">
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3"> 
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item pr-3 pt-3 pb-3"> 
                    <a className="nav-link" href="/create">NewTopic</a>
                </li>
                <li className="nav-item pr-3 pt-3 pb-3"> 
                    <a className="nav-link" href="/login">Login</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarComponent;