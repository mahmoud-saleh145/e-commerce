import { Formik, useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner';

export default function ResetPassword(email) {

    const [error, setError] = useState(null);
    const [show, setShow] = useState(false)
    const [loader, setLoader] = useState(false)
    let navigate = useNavigate();

    const showPassword = () => {
        setShow(!show)
    }


    async function submitResetPassword(values) {
        setLoader(true)

        let { data } = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            {
                "email": email.email.email,
                "newPassword": values.password,
            }
        ).catch((err) => {
            setLoader(false);
            console.log(err);
            setError(err.response.data.message)
        });

        if (data.token) {
            setError(null)
            navigate("/Signin")
        }
        setLoader(false)
    }

    function validation(values) {
        let errors = {};
        let passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

        if (values.password === "") {
            errors.password = "password is required";
        } else if (!passRegex.test(values.password)) {
            errors.password = "must be * Start with a letter(either uppercase or lowercase).* Be between 6 and 9 characters in total.Can only contain letters(A - Z or a - z) and numbers(0 - 9)";
        }

        return errors;
    }


    let formik = useFormik({
        initialValues: {
            password: '',
        },
        validation,
        onSubmit: submitResetPassword
    });

    return (
        <>

            <div className=' container my-5'>
                <Helmet>
                    <title>reset Password</title>
                </Helmet>
                <h2 className='my-3 pt-3'>please enter your new password</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-1">
                        <label htmlFor='password' className='form-label'>new Password :</label>
                        <div className="position-relative">
                            <input
                                autoComplete='off'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type={show ? "" : "password"} name='password' className='form-control' placeholder='new password'></input>
                            <div className='position-absolute top-50 end-0 translate-middle show-password cursor-pointer ' onClick={showPassword}><i className="fa-solid fa-eye"></i></div>
                        </div>
                        {formik.errors.password && formik.touched.password && (<div className="alert alert-danger mt-3">{formik.errors.password}</div>)}
                    </div>
                    <div className="d-flex justify-content-end">

                        <button disabled={!formik.isValid} className="btn btn-outline-success mt-3 px-3 py-2 fs-5 " type='submit'>
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
                                "reset"
                            )}
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}


