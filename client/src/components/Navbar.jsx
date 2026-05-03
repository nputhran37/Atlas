import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">Found<span>It</span></Link>
            <ul>
                <li><Link to="/browse">Browse Items</Link></li>
                <li><Link to="/report-lost">Report Lost</Link></li>
                <li><Link to="/report-found">Report Found</Link></li>
                <li><Link to="/claims" className="nav-cta">My Claims</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
