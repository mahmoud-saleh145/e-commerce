import React, { useState } from 'react'
import './Checkout.module.css'
import { useFormik } from 'formik'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
    const [error, setError] = useState(null);
    const { payment } = useContext(CartContext)


    async function CheckoutPayment(values) {
        const { data } = await payment(values)
        // console.log(data);
        window.location.href = data.session.url
    }



    function validation(values) {
        let errors = {};
        let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/


        if (values.details === "") {
            errors.details = "details is required";
        } else if (values.details.length < 3) {
            errors.details = "details min length is 3";
        }
        if (values.city === "") {
            errors.city = "city is required";
        } else if (values.city.length < 3) {
            errors.city = "city min length is 3";
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
            details: '',
            city: '',
            phone: ''
        },
        validate: validation,
        onSubmit: CheckoutPayment
    })




    return (
        <div className="container mt-5 px-5">

            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={formik.handleSubmit}>

                <div className="mb-1">
                    <label htmlFor='details' className='form-label'>Details</label>
                    <input
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text' name='details' className='form-control'></input>
                    {formik.errors.details && formik.touched.details && (<div className="alert alert-danger mt-3">{formik.errors.details}</div>)}
                </div>

                <div className="mb-1">
                    <label htmlFor='phone' className='form-label'>phone</label>
                    <input
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} type='text' name='phone' className='form-control'></input>
                    {formik.errors.phone && formik.touched.phone && (<div className="alert alert-danger mt-3">{formik.errors.phone}</div>)}
                </div>


                <div className="mb-1">
                    <label htmlFor='city' className='form-label'>city</label>
                    <input
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type='text' name='city' className='form-control'></input>
                    {formik.errors.city && formik.touched.city && (<div className="alert alert-danger mt-3">{formik.errors.city}</div>)}
                </div>

                <button className='btn btn-outline-info mt-5 w-100' type='submit'>Pay now</button>
            </form>
        </div>
    )
}
