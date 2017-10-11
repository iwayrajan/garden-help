'use strict';

import React from 'react';
import $ from 'jquery';

require('styles/src/components/Header.css');
let iconPhone = require('../../../images/icon-phone.png');
let iconFb = require('../../../images/icon-fb.png');
let iconTwitter = require('../../../images/icon-twitter.png');
let iconYouTube = require('../../../images/icon-youtube.png');
let iconInsta = require('../../../images/icon-insta.png');

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        $(document).on('click', '.how_work_link, .services_section_link, .about_link, .nav_section li a', function () {
            if($('.sign_in_wrapper').hasClass('show')) {
                $('.sign_in_wrapper, .bookNowWrap').removeClass('show');
                $('.sign_in_wrapper, .bookNowWrap').addClass('hide');
                $('.overlay').hide();
            }
        });
    }
    render() {
        return (
            <div className="wrapper_inner">
            <div className="header">
            <div className="contact">
            <img src={iconPhone} />
            <span>0818 919 362</span>
            </div>
            <div className="social-icons">
            <a href="https://www.facebook.com/gardenhelp.ie/" target="_blank"><img src={iconFb} alt="FB" /></a>
            <a href="https://twitter.com/garden_help?lang=en" target="_blank"><img src={iconTwitter} alt="Twitter" /></a>
            <a href="https://www.youtube.com/channel/UCXI2KCrUSZzr9rixksRjptg" target="_blank"><img src={iconYouTube} alt="YouTube" /></a>
            <a href="https://www.instagram.com/garden.help/?hl=en" target="_blank"><img src={iconInsta} alt="Insta" /></a>
            </div>
            </div>
            </div>
        );
    }
}

HeaderComponent.displayName = 'SrcComponentsHeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
