import React, { useContext, useEffect, useState } from 'react'
import './WishList.module.css'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { WishListContext } from './../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext'
import Loader from '../../Loader/Loader';


export default function WishList() {


    const { getLoggedWishList, removeWishListProduct } = useContext(WishListContext)

    const { addProductToCart } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [isLoading, setLoader] = useState(false)



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
        }
    }

    async function getWishList() {
        setLoader(true)
        let { data } = await getLoggedWishList()
        if (data) {
            setProducts(data.data)
        }
        setLoader(false)

    }


    async function removeWishList(id) {
        setLoader(true)
        const { data } = await removeWishListProduct(id)
        getWishList()
        setLoader(false)
    }

    useEffect(() => {
        getWishList()
    }, [])


    return (<>

        {
            isLoading ? (
                <Loader />
            ) : (
                <div className="container bg-light p-5 mt-5">
                    <Helmet>
                        <title>WishList</title >
                    </Helmet>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className='mb-4'>My wish List</h2>
                        </div>
                    </div>


                    {products.map((product) => (
                        < div className="row justify-content-between align-items-center mt-4 border-bottom pb-3" key={product._id} >

                            <div className="col-md-2">
                                <img src={product.imageCover} className='w-100'></img>
                            </div>
                            <div className="col-md-8 ">
                                <h5>{product.title?.split(' ').slice(0, 2).join(' ')}</h5>
                                <p className='fw-semibold text-main'>{product.price} EGP</p>
                                <button type="button" className="btn btn-outline-light text-danger" onClick={() => removeWishList(product.id)}><i className="fa-solid fa-trash me-2"></i>Remove</button>
                            </div>
                            <div className="col-md-2 text-end">
                                <button className='btn btn-outline-success mb-4 fs-5 py-2 text-black' onClick={() => { addProduct(product.id) }}>add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </>)
}  