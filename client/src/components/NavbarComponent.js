import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../services/authorize';

const NavbarComponent = ({ history }) => {
    const navigate = useNavigate(); // ใช้ useNavigate แทน withRouter

    return (
        <nav className="">
            <ul className="nav nav-tabs">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item pr-3 pt-3 pb-3">
                    <a className="nav-link" href="/create">NewTopic</a>
                </li>

                {
                    !getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    )
                }
                {
                    getUser() && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <button className="nav-link" onClick={() => logout(() => navigate("/"))}>Logout</button>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default NavbarComponent;