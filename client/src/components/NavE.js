import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const NavE = ({ isHeroNav = false }) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark ${isHeroNav ? 'bg-transparent-black' : 'bg-dark'} fixed-top`}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="SkillSync Logo"
                        className="img-fluid"
                        style={{ height: '70px', width: '70px' }}
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/findjobs">Find Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/postjob">Post Job</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/employer">My Profile</Link> {/* Fixed text */}
                        </li>
                    </ul>

                    
                </div>
            </div>
        </nav>
    );
};

export default NavE;