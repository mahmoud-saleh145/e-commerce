import React, { useState } from 'react'
import './ForgetPassword.module.css'
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import axios from 'axios';
import VerifyPage from '../../Components/VerifyPage/VerifyPage';
import { RotatingLines } from 'react-loader-spinner';


export default function ForgetPassword() {
    const [error, setError] = useState(null);
    const [verifyPage, setVerifyPage] = useState(false);
    const [userEmail, setUserEmail] = useState(false);
    const [loader, setLoader] = useState(false)

    async function verifyEmail(values) {
        setLoader(true)
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
            {
                email: values.email
            }).catch((error) => {
                setLoader(false);
                setError(error.response.data.message);
            });
        setUserEmail(values.email);
        if (data.statusMsg === "success") {
            setVerifyPage(true);
        }
        setLoader(false)
    }

    function validation(values) {
        let errors = {};
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (values.email === "") {
            errors.email = "email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "email pattern is inavalid";
        }

        return errors;
    }

    let formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: validation,
        onSubmit: verifyEmail
    });



    return (
        <>

            {verifyPage ? <VerifyPage email={userEmail} /> :
                <div className=' container my-5'>
                    <Helmet>
                        <title>forget password</title>
                    </Helmet>
                    <h2 className='my-3 pt-3'>please enter your email to receive verification code</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-1">
                            <input
                                autoComplete='off'
                                placeholder='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} type='email' name='email' className='form-control py-3'></input>
                            {formik.errors.email && formik.touched.email && (<div className="alert alert-danger mt-3">{formik.errors.email}</div>)}
                        </div>

                        <div className="d-flex justify-content-end">
                            <button disabled={!formik.isValid} className="btn btn-outline-success mt-3 px-3 py-2 fs-5  " type='submit'>
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
                        </div>
                    </form>
                </div>
            }

        </>

    )



}
