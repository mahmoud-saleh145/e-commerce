import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import ResetPassword from '../ResetPassword/ResetPasswoed';
import { RotatingLines } from 'react-loader-spinner';

export default function VerifyPage(email) {
    const [error, setError] = useState(null);
    const [resetPasswordPage, setResetPasswordPage] = useState(false);
    const [loader, setLoader] = useState(false)

    async function verifyCode(values) {
        setLoader(true)
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
            {
                resetCode: values.resetCode
            }).catch((error) => {
                setError(error.response.data.message);
                console.log(error);
            });


        if (data.status === "Success") {
            setResetPasswordPage(true);
        }
        setLoader(false)
    }

    function validation(values) {
        let errors = {};
        let codeRegex = /^\d{3,6}$/
        if (values.resetCode === "") {
            errors.resetCode = "resetCode is required";
        } else if (!codeRegex.test(values.resetCode)) {
            errors.resetCode = "resetCode pattern is invalid";
        }

        return errors;
    }

    let formik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validate: validation,
        onSubmit: verifyCode
    });

    return (
        <>
            {resetPasswordPage ? <ResetPassword email={email} /> :

                <div className=' container my-5'>
                    <Helmet>
                        <title>Verify resetCode</title>
                    </Helmet>
                    <h2 className='my-3 pt-3'>please enter the verification code</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-1">
                            <input
                                autoComplete='off'
                                placeholder='reset code'
                                value={formik.values.resetCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} type='text' name='resetCode' className='form-control py-3' ></input>
                            {formik.errors.resetCode && formik.touched.resetCode && (<div className="alert alert-danger mt-3">{formik.errors.resetCode}</div>)}
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
                                    "verify"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}
