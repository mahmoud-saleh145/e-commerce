import React, { useContext, useEffect, useState } from 'react'
import './FeaturedProduct.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loader from '../../Loader/Loader'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishListContext'

export default function FeaturedProduct() {

    function getData() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    let { isLoading, data } = useQuery('FeaturedProduct', getData)

    const { addProductToCart, setNumOfCartItems } = useContext(CartContext)
    const { addProductToWishList } = useContext(WishListContext)

    async function addProduct(id) {
        let { data } = await addProductToCart(id)

        if (data.status === "success") {
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

    async function addWishList(id) {
        let { data } = await addProductToWishList(id)

        if (data.status === "success") {
            toast.success(data.message, {
                position: 'top-right',
                style: {
                    backgroundColor: '#499A49',
                    color: 'white',
                }
            })
        }
    }

    return (
        <div className="container pt-3">
            {/* <input type="text" className="form-control w-75 mt-5 mx-auto" placeholder="Search...." /> */}
            <div className="row mt-5 gy-4 mx-3  ">
                {isLoading ? <Loader />
                    :
                    data.data.data.map((product) => (

                        <div className="col-md-3 product rounded py-3 " key={product.id}>
                            <Link to={`Details/${product.id}`}>
                                <img src={product.imageCover} className='w-100' />
                                <p className='text-main'>{product.title.split(' ').slice(0, 2).join(' ')}</p>
                                <h3 className='h6'>{product.category?.name}</h3>
                                <div className="d-flex  justify-content-between">
                                    <span>{product.price} EGP</span>
                                    <span>
                                        <i className='fa-solid fa-star rating-color'></i>
                                        {product.ratingsAverage}
                                    </span>
                                </div>
                            </Link>
                            <div className="d-flex justify-content-center">
                                <button className=' btn mt-4 w-75' onClick={() => { addProduct(product.id) }}>+ADD</button>
                                <i className={`fa-solid fa-heart fs-3 mt-2 cursor-pointer`} onClick={() => { addWishList(product.id) }}></i>
                            </div>
                        </div>
                    )
                    )}
            </div>
        </div>
    )
}
