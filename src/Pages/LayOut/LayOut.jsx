import React, { useContext, useEffect } from 'react'
import './LayOut.module.css'
import Navbar from './../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export default function LayOut() {

    const { setUserToken } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setUserToken(localStorage.getItem("userToken"))
        }
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />

        </>
    )
}
