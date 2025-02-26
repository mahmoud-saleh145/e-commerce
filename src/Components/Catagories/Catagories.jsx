import React, { useEffect, useState } from 'react'
import './Catagories.module.css'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '../../Loader/Loader'

export default function Catagories() {
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [subCategoryName, setSubCategoryName] = useState([])

    const [isLoading, setLoader] = useState(false)


    async function getCategory() {
        setLoader(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((response) => response)
            .catch((err) => err)
        setCategory(data.data);
        setLoader(false)

    }


    async function displaySubcategory(id, name) {
        setLoader(true)
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
            .then((response) => response)
            .catch((err) => err)
        setSubCategory(data);
        setLoader(false)
        setSubCategoryName(name)
    }



    useEffect(() => {
        getCategory()
    }, [])


    return (
        <>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="container my-5 pb-5">
                    <Helmet>
                        <title>Catagories</title>
                    </Helmet>

                    <div className="row gy-3 gx-4">

                        {category?.map((category) => <>
                            <div className="col-md-4">
                                <div className="category-card rounded border text-center" onClick={() => { displaySubcategory(category._id, category.name) }}>
                                    <div className="category-img d-flex flex-column align-items-center justify-content-center ">
                                        <img src={category.image} alt={category.name} className='w-100' />
                                    </div>
                                    <h3 className='border-top py-4 text-main'>{category.name}</h3>
                                </div>
                            </div >
                        </>)}

                    </div>


                    {subCategory.results === 0 ? '' : <>
                        <h2 className=' text-center py-4 text-main'>{subCategoryName + ' subcategories'} </h2>
                        <div className="">
                            <div className="row g-3">
                                {subCategory.data?.map((subCategory) =>
                                    <>
                                        <div className="col-md-4">
                                            <div className="category-card rounded border text-center py-3">
                                                <h5 className='h3'>{subCategory.name}</h5>
                                            </div>
                                        </div>

                                    </>)
                                }
                            </div>
                        </div>
                    </>}

                </div>
            )}
        </ >
    )
}
