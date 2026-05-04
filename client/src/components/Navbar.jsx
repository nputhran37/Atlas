import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Atlas</Link>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/browse">Browse Items</Link></li>
                <li><Link to="/report-lost">Report Lost</Link></li>
                <li><Link to="/report-found">Report Found</Link></li>
                {user ? (
                    <>
                        <li style={{ color: 'var(--lime)', fontWeight: '600', marginLeft: '1rem' }}>Hi, {user.name.split(' ')[0]}</li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button onClick={logout} className="nav-cta nav-logout">Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login" className="nav-cta">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
