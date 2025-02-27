import React from 'react'
import './MainSlider.module.css'
import img1 from './../../assets/slider/41nN4nvKaAL._AC_SY200_.jpg'
import img2 from './../../assets/slider/61cSNgtEISL._AC_SY200_.jpg'
import img3 from './../../assets/slider/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img4 from './../../assets/slider/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img5 from './../../assets/slider/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import Slider from 'react-slick'

export default function MainSlider() {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
    };



    return (
        <div className="row  p-4">
            <div className="col-md-6 m-auto">

                <div className="row  g-0 p-3">

                    <div className="col-md-6 col-6">
                        < Slider {...settings}>
                            <img src={img1} className='w-100' />
                            <img src={img2} className='w-100' />
                            <img src={img3} className='w-100' />
                        </Slider>
                    </div>

                    <div className="col-md-6 col-6">
                        <div className="">
                            <img src={img4} className='w-100' />
                        </div>
                        <div className="">
                            <img src={img5} className='w-100' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )


}
