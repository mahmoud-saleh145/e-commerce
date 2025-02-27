import React, { useEffect } from 'react'
import './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick'


export default function CategorySlider() {

    function getData() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    const { data } = useQuery('CategorySlider', getData)


    const [slidesToShow, setSlidesToShow] = React.useState(6);
    const updateSlidesToShow = () => {
        if (window.innerWidth < 576) {
            setSlidesToShow(2); // For small screens
        } else if (window.innerWidth < 768) {
            setSlidesToShow(3); // For medium screens
        } else if (window.innerWidth < 992) {
            setSlidesToShow(4); // For large screens
        } else {
            setSlidesToShow(6); // For extra-large screens
        }
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true, // Enable auto-scrolling
        autoplaySpeed: 2500, // Auto-scroll interval (3 seconds)
        pauseOnHover: true, // Pause auto-scroll on hover

    };


    return (

        <Slider {...settings}>
            {data?.data.data.map((category, index) => <>
                <div className="container-flued" key={index}>
                    <div className="my-3 ">
                        <div className='Category-slider-img d-flex align-items-center justify-content-center'>
                            <img src={category.image} alt={category.name} className='w-100' />
                        </div>
                        <h4>{category.name}</h4>
                    </div>
                </div>
            </>)}
        </Slider>
    )
}








