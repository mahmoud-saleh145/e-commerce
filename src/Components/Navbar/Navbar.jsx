import React, { useContext, useEffect, useState } from 'react'
import './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function MainNavbar() {

    const { userToken, setUserToken } = useContext(UserContext)
    const { numOfCartItems } = useContext(CartContext)

    let navigate = useNavigate()

    function logOut() {
        localStorage.removeItem("userToken")
        setUserToken(null)
        navigate('Signin')
    }

    return (
        <>
            <Navbar expand="lg" className="navbar-expand-lg bg-body-tertiary mb-5" fixed='top'>
                <Container>
                    <Navbar.Brand className=''> <Link to={'/'} className="navbar-brand fs-2 fw-semibold"> <i className="fa-solid fa-cart-shopping text-main fs-2"></i>
                        fresh cart</Link>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav " />

                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="m-md-auto ">
                            {userToken && (
                                <ul className="navbar-nav  mb-2 mb-lg-0 text-center me-5">
                                    <li className="nav-item">
                                        <Link to={'/'} className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Cart'} className="nav-link">Cart</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/wishList'} className="nav-link">Wish list</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Product'} className="nav-link">Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Catagories'} className="nav-link">Catagories</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Brands'} className="nav-link">Brands</Link>
                                    </li>
                                </ul>)}
                        </Nav>
                        <ul className="navbar-nav mb-2 mb-lg-0 " >
                            {userToken ? (

                                <li className="nav-item d-flex align-items-center">
                                    <Link to={'/Cart'} className='position-relative '>
                                        <i out className="fa-solid fa-cart-shopping fs-2 me-3"></i>
                                        <span className='position-absolute top-0 start-50 translate-middle bg-main text-light rounded fw-bold p-1 cart-number'>{numOfCartItems}</span>
                                    </Link>
                                    <span onClick={() => {
                                        logOut()
                                    }
                                    }
                                        className="nav-link cursor-pointer">log out</span>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item ">
                                        <Link to={'/register'} className="nav-link">register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/Signin'} className="nav-link">log in</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
