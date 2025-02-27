import React, { useState, useContext } from 'react'
import './Signin.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'



export default function Signin() {

    let { setUserToken } = useContext(UserContext)

    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false)

    const showPassword = () => {
        setShow(!show)
    }

    let navigate = useNavigate();
    async function submitSignin(values) {
        setLoader(true)

        let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            values).catch((err) => {
                setLoader(false);
                setError(err.response.data.message)
            });

        if (data.message === "success") {
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            setError(null)
            navigate("/")

        }
        setLoader(false)
    }

    function validation(values) {
        let errors = {};
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

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

        return errors;
    }


    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        validation,
        onSubmit: submitSignin
    });

    return (
        <div className=' container my-5 px-4'>
            <Helmet>
                <title>Log in</title>
            </Helmet>
            <h2 className='my-3 pt-3'>login now</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={formik.handleSubmit}>


                <div className="mb-1">
                    <label htmlFor='email' className='form-label'>Email :</label>
                    <input
                        autoComplete='off'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} type='email' name='email' className='form-control'></input>
                    {formik.errors.email && formik.touched.email && (<div className="alert p-0 alert-danger mt-3">{formik.errors.email}</div>)}

                </div>
                <div className="mb-1">
                    <label htmlFor='password' className='form-label'>Password :</label>
                    <div className="position-relative">
                        <input
                            autoComplete='off'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={show ? "" : "password"} name='password' className='form-control'></input>
                        <div className='position-absolute top-50 end-0 translate-middle show-password cursor-pointer ' onClick={showPassword}><i className="fa-solid fa-eye"></i></div>
                    </div>
                    {formik.errors.password && formik.touched.password && (<div className="alert alert-danger mt-3">{formik.errors.password}</div>)}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to={'/Forgetpassword'} className=' fs-6 '>forget your password ?</Link>
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
                            "sign in"
                        )}
                    </button>
                </div>
            </form >
        </div>
    )
}
