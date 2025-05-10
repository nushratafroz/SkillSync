// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/img/logo.png';
// import * as jose from 'jose'; 

// const authToken = localStorage.getItem('authToken');
// const decodedToken = authToken ? jose.decodeJwt(authToken) : null;

// const Navbar = ({ isHeroNav = false }) => {
//     return (
//         <nav className={`navbar navbar-expand-lg navbar-dark ${isHeroNav ? 'bg-transparent-black' : 'bg-dark'} fixed-top`}>
//             <div className="container">
//                 <Link className="navbar-brand" to="/">
//                     <img
//                         src={logo}
//                         alt="SkillSync Logo"
//                         className="img-fluid"
//                         style={{ height: '70px', width: '70px' }}   
//                     />
//                 </Link>

//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarResponsive"
//                 >
//                     <i className="fas fa-bars"></i>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarResponsive">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link active" to="/">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/findjobs">Find Jobs</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/postjob">Post Job</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/contact">Contact</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/myprofile">My Profile</Link> {/* Fixed text */}
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/employer">Employer Dashboard</Link> {/* Fixed text */}
//                         </li>
//                     </ul>

//                     <div className="d-flex align-items-center gap-3">
//                         <form className="d-flex">
//                             <input
//                                 className="form-control me-2"
//                                 type="search"
//                                 placeholder="Find Jobs"
//                                 aria-label="Search"
//                             />
//                             <button className="btn btn-outline-light" type="submit">Search</button>
//                         </form>
//                         <Link to="/register" className="btn btn-primary">Register</Link> {/* Changed to match App.js */}
//                         <Link to="/login" className="btn btn-outline-light">Login</Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import * as jose from 'jose';

const Navbar = ({ isHeroNav = false }) => {
    const navigate = useNavigate();

    const authToken = localStorage.getItem('authToken');
    const decodedToken = authToken ? jose.decodeJwt(authToken) : null;

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const isGuest = !decodedToken;

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
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>

                        {!isGuest && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/findjobs">Find Jobs</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/postjob">Post Job</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myprofile">Employee</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/employer">Employer</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {!isGuest && (
                            <>
                                <span className="text-white">Hello, {decodedToken?.fullName || 'User'}</span>
                                <button className="btn btn-outline-light" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        )}
                        {isGuest && (
                            <>
                                <Link to="/register" className="btn btn-primary">Register</Link>
                                <Link to="/login" className="btn btn-outline-light">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
