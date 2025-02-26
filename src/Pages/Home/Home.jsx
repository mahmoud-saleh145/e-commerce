import React from 'react'
import './Home.module.css'
import FeaturedProduct from '../../Components/FeaturedProduct/FeaturedProduct'
import CategorySlider from './../../Components/CategorySlider/CategorySlider';
import MainSlider from '../../Components/MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {

    return (
        <div className='overflow-hidden'>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <MainSlider />
            <CategorySlider />
            <FeaturedProduct />
        </div>
    )
}
