'use strict';

import React from 'react';
import $ from 'jquery';

require('styles/src/components/ServicesTypes.css');

class ServicesTypesComponent extends React.Component {
    constructor(props) {
        super(props);
        $(document).ready(function(){
            $('.section').hover(function(){
                $(this).addClass('hover');
            },function(){
                $(this).removeClass('hover');
            });
        });
    }

    render() {
        return (
            <div className="wrapper_inner">
                <div className="services_section">
                    <div className="section_left">
                        <div className="section_1 section" id="section1_more_details">
                            <div className="image"></div>
                            <div className="section_content">
                                <p>A well maintained garden provides a great look and feel to any property, and also adds value. With our professional services we can provide a regular maintenance package, or a once off service.</p>
                                <h2>Landscape Maintenance</h2>
                                <a href="#." className="click_to_read">Click to read here</a>
                            </div>
                        </div>
                    </div>
                    <div className="section_right">
                        <div className="section_2 section" id="section2_more_details">
                            <div className="image"></div>
                            <div className="section_content">
                                <p>Professional lawn care is an important feature of many businesses, but also for the homeowner. It may be a special event or a once off treatment, we can provide lawn treatments to make your lawn look great all year.</p>
                                <h2>Lawn Maintenance & Care</h2>
                                <a href="#." className="click_to_read">Click to read here</a>
                            </div>
                        </div>
                        <div className="section_3-4_wrapper">
                            <div className="section_3 section" id="section3_more_details">
                                <div className="image"></div>
                                <div className="section_content">
                                    <p>Need a bit of outdoor fencing painted? Or perhaps that decking needs a little repair? or the patio needs a good power wash to remove that grime we have got the solution.</p>
                                    <h2>Garden Repairs</h2>
                                    <a href="#." className="click_to_read">Click to read here</a>
                                </div>
                            </div>
                            <div className="section_4 section" id="section4_more_details">
                                <div className="image"></div>
                                <div className="section_content">
                                    <p>We know that your business is important to you and that to keep it looking at its best requires regular maintenance especially throughout the growing season.</p>
                                    <h2>Corporate Solutions</h2>
                                    <a href="#." className="click_to_read">Click to read here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ServicesTypesComponent.displayName = 'SrcComponentsServicesTypesComponent';

// Uncomment properties you need
// ServicesTypesComponent.propTypes = {};
// ServicesTypesComponent.defaultProps = {};

export default ServicesTypesComponent;
