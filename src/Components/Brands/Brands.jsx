import React, { useEffect, useState } from 'react'
import './Brands.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import BrandModal from './../BrandModal/BrandModal';
import Loader from '../../Loader/Loader';







export default function Brands() {

    const [isLoading, setLoader] = useState(false)


    const [brands, setBrands] = useState([])




    async function displayBrands() {
        setLoader(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then((response) => response)
            .catch((err) => err)
        setBrands(data.data);
        setLoader(false)
    }





    useEffect(() => {
        displayBrands()
    }, [])



    return (

        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container my-4 pb-5">

                    <Helmet>
                        <title>Brands</title>
                    </Helmet>
                    <div className="">
                        <h2 className='text-center text-main fs-1 mb-5'>All Brands</h2>
                    </div>
                    <div className="row gy-4">

                        <BrandModal />
                    </div >
                </div >
            )}
        </>
    )
}









