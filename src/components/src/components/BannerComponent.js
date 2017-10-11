'use strict';

import React from 'react';
import Slider from 'react-slick';

require('styles/src/components/Banner.css');

class BannerComponent extends React.Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            arrows: false,
            fade: true,
            speed: 500,
            cssEase: 'linear',
            pauseOnHover: false,
            swipeToSlide: false,
            swipe: false,
            touchMove: false
        };
        return (
            <div className="wrapper_inner bannerWrapper">
            <div className="banner">
            <Slider {...settings}>
            <div className="banner-item">

            <div className="banner_book_now_section">
            <span>REGULAR MAINTENANCE PACKAGE, OR A ONCE OFF SERVICE</span>
            <h2>Landscape Maintenance A great look and feel to any property</h2>
            <a href="#." className="book_now_btn"><span>book now</span></a>
            </div>
            </div>
            <div className="banner-item">

            <div className="banner_book_now_section">
            <span>LAWN MAINTENANCE TO MAKE YOUR LAWN LOOK GREAT ALL YEAR</span>
            <h2>Lawn Maintenance & Care</h2>
            <a href="#." className="book_now_btn"><span>book now</span></a>
            </div>
            </div>
            <div className="banner-item">

            <div className="banner_book_now_section">
            <span>PLANTING SERVICES</span>
            <h2>Professional supply and planting services</h2>
            <a href="#." className="book_now_btn"><span>book now</span></a>
            </div>
            </div>
            </Slider>
            </div>
            </div>
        );
    }
}

BannerComponent.displayName = 'SrcComponentsBannerComponent';

// Uncomment properties you need
// BannerComponent.propTypes = {};
// BannerComponent.defaultProps = {};

export default BannerComponent;
