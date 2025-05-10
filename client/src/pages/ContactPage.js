import React from 'react';
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap';
import '../assets/css/style.css';
import slide1 from '../assets/img/slide1.jpg';
import slide2 from '../assets/img/slide2.jpg';
import slide3 from '../assets/img/slide3.jpg';


const ContactPage = () => {
    return (
        <div className="contact-hero">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} className="contact-carousel">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={slide1} alt="Slide 1"
                                    alt="Slide 1"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={slide2} alt="Slide 2" 
                                    alt="Slide 2"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={slide3} alt="Slide 3"
                                    alt="Slide 3"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>

                    <Col md={6} className="contact-form-wrapper">
                        <h2 className="contact-form-heading">Get a Job / Employee!</h2>
                        <p>Enter your details below</p>
                        <Form>
                            <Form.Control
                                className="contact-form-control"
                                type="text"
                                placeholder="Your Name"
                            />
                            <Form.Control
                                className="contact-form-control"
                                type="number"
                                placeholder="Contact Number"
                            />
                            <Form.Control
                                className="contact-form-control"
                                type="email"
                                placeholder="Email Address"
                            />
                            <Form.Control
                                as="textarea"
                                rows={4}
                                className="contact-form-control"
                                placeholder="Enter your description here..."
                            />
                            <Button type="submit" className="contact-submit w-100 mt-3">
                                Submit Now
              </Button>
                        </Form>
                    </Col>
                </Row>

                <section className="getintouch-section mt-5">
                    <h2>Get in Touch</h2>
                    <div className="social-icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-google"></i>
                        <i className="fab fa-linkedin-in"></i>
                    </div>
                    <p className="mt-3">Subscribe to our newsletter to stay updated with what’s new</p>
                    <Form className="d-flex justify-content-center gap-2 mt-3">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            className="subscribe-email"
                        />
                        <Button type="submit" className="subscribe-btn">
                            Subscribe
            </Button>
                    </Form>
                </section>
            </Container>
        </div>
    );
};

export default ContactPage;