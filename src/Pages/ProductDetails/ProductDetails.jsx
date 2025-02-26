import React, { useContext, useEffect, useState } from 'react'
import './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import { WishListContext } from '../../Context/WishListContext';
import Loader from '../../Loader/Loader';


export default function ProductDetails() {

    const { addProductToWishList } = useContext(WishListContext)

    const [isLoading, setLoader] = useState(false)


    let { id } = useParams()

    const [details, setDetails] = useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };



    async function addWishList(id) {
        setLoader(true)
        let { data } = await addProductToWishList(id)
        // console.log(data);
        if (data.status === "success") {
            setLoader(false)
            toast.success(data.message, {
                position: 'top-right',
                style: {
                    backgroundColor: '#499A49',
                    color: 'white',
                }
            })
        }
    }



    async function getProductDetails() {
        setLoader(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setDetails(data.data)
        setLoader(false)
    }


    useEffect(() => {
        getProductDetails()
    }, [])



    const { addProductToCart, setNumOfCartItems } = useContext(CartContext)


    async function addProduct(id) {
        setLoader(true)
        let { data } = await addProductToCart(id)
        if (data.status === "success") {
            setLoader(false)
            toast.success(data.message, {
                position: 'top-right',
                style: {
                    backgroundColor: '#499A49',
                    color: 'white'
                },
            })
            setNumOfCartItems(data.numOfCartItems)
        }
    }





    return (<>        {
        isLoading ? (
            <Loader />
        ) : (
            <div className="container py-5">
                <Helmet>
                    <title>Product Details</title>
                </Helmet>

                <div className="row align-items-center">

                    <div className="col-md-4 mb-5">
                        <Slider {...settings}>
                            {details.images?.map((ele) => <>
                                <img src={ele} className='w-100' alt="" />
                            </>)}
                        </Slider>

                    </div>

                    <div className="col-md-8">
                        <h2>{details.title}</h2>
                        <p>{details.description}</p>
                        <div className='d-flex justify-content-between align-items-center'>
                            <span>{details.price} EGP</span>
                            <span>
                                {details.ratingsAverage}
                                <i className="fa fa-star rating-color"></i>
                            </span>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-4' >
                            <button className='btn btn-success w-75 ms-5' onClick={() => { addProduct(details.id) }}>+Add</button>
                            <i className="fa-solid fa-heart fs-3 mt-2 cursor-pointer " onClick={() => { addWishList(details.id) }}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    </>
    )
}
