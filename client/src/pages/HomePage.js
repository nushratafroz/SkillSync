import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Reuse Navbar component
import Footer from '../components/Footer'; // Reuse Footer component
import '../assets/css/style.css'; // Make sure to import your existing styles
import content from '../assets/img/content.png';
import graphics from '../assets/img/graphics.png';
import socialmedia from '../assets/img/socialmedia.png';
import techanddev from '../assets/img/techanddev.png';
import translator from '../assets/img/translator.png';
import virtual from '../assets/img/virtual.png';

const HomePage = () => {
    return (
        <div className='page-div'>
            {/* Reuse Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 hero-title">
                            <h1 className="text-center mb-4" style={{ color: '#ffffff' }}>
                                Find Jobs That Match Your Skills, Locally & Easily.</h1>
                                <form className="d-flex flex-column flex-lg-row gap-3">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Job Title or Keyword"
                                        aria-label="Search"
                                    />
                                    <div className="btn-group flex-grow-0">
                                        <button
                                            type="button"
                                            className="btn btn-primary dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Location
                    </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Dhaka
                        </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Rajshahi
                        </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Chittagong
                        </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Khulna
                        </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Barishal
                        </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">
                                                    Sylhet
                        </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Find Job
                  </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Categories Section */}
            <section className="job-catagories">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 job-title text-center mb-5">
                            <h2>Browse Job Categories</h2>
                            <span className="title-divider"></span>
                        </div>
                    </div>
                    {/* Row of Job Categories */}
                    <div className="row mb-4">
                        <div className="col-md-4 job-image mb-4">
                            <img src={content} alt="Content Creation" />
                            <h1>Writing & Content Creation</h1>
                        </div>
                        <div className="col-md-4 job-image mb-4">
                            <img src={graphics} alt="Content Creation" />
                           
                            <h1>Graphic Design & Digital Media</h1>
                        </div>
                        <div className="col-md-4 job-image mb-4">
                            <img src={socialmedia} alt="Content Creation" />
                            
                            <h1>Social Media Management</h1>
                        </div>
                    </div>
                    {/* Second Row of Job Categories */}
                    <div className="row mb-5">
                        <div className="col-md-4 job-image mb-4">
                            <img src={techanddev} alt="Content Creation" />
                            
                            <h1>Tech & Development</h1>
                        </div>
                        <div className="col-md-4 job-image mb-4">
                            <img src={translator} alt="Content Creation" />
                            
                            <h1>Translation & Transcription</h1>
                        </div>
                        <div className="col-md-4 job-image mb-4">
                            <img src={virtual} alt="Content Creation" />
                            
                            <h1>Virtual Assistance & Admin Support</h1>
                        </div>
                    </div>
                    {/* Browse All Categories Button */}
                    <div className="row">
                        <button className="btn-one" onClick={() => navigate("/findjobs")}>
                                Browse All Categories
                        </button>
                    </div>
                </div>
            </section>

            {/* Upload CV Section */}
            <section className="upload-cv">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="upload-title">
                                <h3>Get Discovered by Top Employers</h3>
                                <h1>Join 50,000+ freelancers and students already hired remotely</h1>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Jobs Section */}
            <section className="recent-jobs py-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-md-8 offset-md-2 text-center">
                            <span>Recent Jobs</span>
                            <h2>Featured Jobs</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div id="jobsCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {/* Job 1 */}
                                    <div className="carousel-item active">
                                        <div className="row justify-content-center">
                                            <div className="col-md-8">
                                                <div className="card job-card">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                                            <h3 className="card-title">Digital Marketer</h3>
                                                            <span className="badge bg-primary">Full Time</span>
                                                        </div>
                                                        <div className="job-meta mb-3">
                                                            <span className="text-muted me-3">
                                                                <i className="fa fa-building"></i> Creative Agency
                              </span>
                                                            <span className="text-muted me-3">
                                                                <i className="fa fa-map-marker"></i> Athens, Greece
                              </span>
                                                            <span className="text-success">
                                                                <i className="fa fa-money"></i> $3500 - $4000
                              </span>
                                                        </div>
                                                        <p className="card-text">
                                                            Seeking experienced digital marketer with expertise in SEO and social media management.
                            </p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <small className="text-muted">Posted 7 hours ago</small>
                                                            <button className="btn btn-primary">Apply Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Add more jobs here */}
                                </div>

                                {/* Carousel Controls */}
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#jobsCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#jobsCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
