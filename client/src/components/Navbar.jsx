import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Atlas</Link>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink></li>
                <li><NavLink to="/browse" className={({ isActive }) => isActive ? "active-link" : ""}>Browse Items</NavLink></li>
                <li><NavLink to="/report-lost" className={({ isActive }) => isActive ? "active-link" : ""}>Report Lost</NavLink></li>
                <li><NavLink to="/report-found" className={({ isActive }) => isActive ? "active-link" : ""}>Report Found</NavLink></li>
                {user ? (
                    <>
                        <li style={{ color: 'var(--lime)', fontWeight: '600', marginLeft: '1rem' }}>Hi, {user.name.split(' ')[0]}</li>
                        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink></li>
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
