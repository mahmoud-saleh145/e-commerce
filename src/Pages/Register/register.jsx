import React, { useContext, useState } from 'react'
import './register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import Loader from '../../Loader/Loader'

export default function Register() {
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false)

    const [isLoading, setIsLoader] = useState(false)
    let navigate = useNavigate();

    async function submitForm(values) {
        setLoader(true)
        setIsLoader(true)
        let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signup",
            values).catch((err) => {
                setLoader(false);
                setError(err.response.data.message)

            });
        if (data.message === "success") {
            setLoader(false)
            setIsLoader(false)
            setError(null)
            navigate("/Signin")
        }
    }

    function validation(values) {
        let errors = {};
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        let passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        if (values.name === "") {
            errors.name = "name is required";
        } else if (values.name.length < 3) {
            errors.name = "name min length is 3";
        }

        if (values.email === "") {
            errors.email = "email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "email pattern is inavalid";
        }


        if (values.password === "") {
            errors.password = "password is required";
        } else if (!passRegex.test(values.password)) {
            errors.password = "must be * Start with a letter(either uppercase or lowercase).* Be between 6 and 9 characters in total.Can only contain letters(A - Z or a - z) and numbers(0 - 9)";
        }

        if (values.rePassword === "") {
            errors.rePassword = "re-Password is required";
        } else if (values.rePassword !== values.password) {
            errors.rePassword = "re-Password pattern is invalid";
        }

        if (!values.phone) {
            errors.phone = "phone is required"
        } else if (!phoneRegex.test(values.phone)) {
            errors.phone = "invalid Phone"
        }
        return errors;
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        validate: validation,
        onSubmit: submitForm
    });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className=' container my-5'>
                    <Helmet>
                        <title>Register</title>
                    </Helmet>

                    <h2 className='my-3 pt-3'>register now</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={formik.handleSubmit}>

                        <div className="mb-1">
                            <label htmlFor='name' className='form-label'>Name :</label>
                            <input
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text' name='name' className='form-control'></input>
                            {formik.errors.name && formik.touched.name && (<div className="alert alert-danger mt-3">{formik.errors.name}</div>)}
                        </div>
                        <div className="mb-1">
                            <label htmlFor='email' className='form-label'>Email :</label>
                            <input
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} type='email' name='email' className='form-control'></input>
                            {formik.errors.email && formik.touched.email && (<div className="alert alert-danger mt-3">{formik.errors.email}</div>)}

                        </div>
                        <div className="mb-1">
                            <label htmlFor='password' className='form-label'>Password :</label>
                            <input
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='password' name='password' className='form-control'></input>
                            {formik.errors.password && formik.touched.password && (<div className="alert alert-danger mt-3">{formik.errors.password}</div>)}

                        </div>
                        <div className="mb-1">
                            <label htmlFor='rePassword' className='form-label'>Re-password :</label>
                            <input
                                value={formik.values.rePassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='password' name='rePassword' className='form-control'></input>
                            {formik.errors.rePassword && formik.touched.rePassword && (<div className="alert alert-danger mt-3">{formik.errors.rePassword}</div>)}

                        </div>
                        <div className="mb-1">
                            <label htmlFor='phone' className='form-label'>phone :</label>
                            <input
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} type='text' name='phone' className='form-control'></input>
                            {formik.errors.phone && formik.touched.phone && (<div className="alert alert-danger mt-3">{formik.errors.phone}</div>)}
                        </div>
                        <button disabled={!formik.isValid} className="btn btn-success mt-3 px-3 py-2 fs-5 " type='submit'>
                            {loader ? (
                                <RotatingLines
                                    height="50"
                                    width="40"
                                    color="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    ariaLabel="rotating-lines-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            ) : (
                                "register now"
                            )}
                        </button>
                    </form >
                </div>
            )}</>
    )
}
