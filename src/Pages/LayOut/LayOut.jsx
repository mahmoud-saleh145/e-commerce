import React, { useContext, useEffect } from 'react'
import './LayOut.module.css'

import { Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import MainNavbar from './../../Components/Navbar/Navbar';


export default function LayOut() {

    const { setUserToken } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setUserToken(localStorage.getItem("userToken"))
        }
    }, [])



    return (
        <>
            <MainNavbar />
            <Outlet />
        </>
    )
}
