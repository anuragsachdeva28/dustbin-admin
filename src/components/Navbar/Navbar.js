import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => (
    <nav className="nav-bar">
        <h4 className="nav-title">Nagar Nigam</h4>
        <Link to="/" className="nav-link">
            Home
        </Link>
    </nav>
);

export default Navbar;
