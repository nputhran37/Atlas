import React from 'react';

const Navbar = () => {
  return (
    <nav>
        <div className="logo">Found<span>It</span></div>
        <ul>
            <li><a href="#">Browse Items</a></li>
            <li><a href="#">Report Lost</a></li>
            <li><a href="#">Report Found</a></li>
            <li><a href="#" className="nav-cta">My Claims</a></li>
        </ul>
    </nav>
  );
};

export default Navbar;
