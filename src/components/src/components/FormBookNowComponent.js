'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import $ from 'jquery';

import moment from 'moment';
import InputMoment from 'input-moment/lib/input-moment.js';
import 'input-moment/dist/input-moment.css';

import Hologram from 'hologram-image-upload/dist/Hologram';
import 'hologram-image-upload/dist/css/Hologram.css'

require('styles/src/components/FormBookNow.css');
let form_loader = require('../../../images/form-loader.gif');

import FormSignInComponent from 'components/src/components/FormSignInComponent';

class FormBookNowComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.getUserObj = null;
        this.session = true;
        this.headers = {};
        this.indexFile = 0;
        this.state = {
            userEmail: '',
            userToken: '',
            location: '',
            property: '',
            maintained: '',
            property_size: '',
            num_hours: '',
            cost: '',
            waste_removed: false,
            jobDate: moment(),
            contactnumber: '',
            userid: '',
            profile_image_book: [],
            errors: '',
            bookStatusMsg: '',
            isSuccess: false,
            loading: false,
            showBookNowForm: false,
            showFormFromBooknow: false,
            jobaddress: '',
            servicesOptions: [],
            pets: true,
            accesstoproperty: true,
            extradetails: 'No Extra Details Provided',
            servicerequired: null,
            gatewidth: ''
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        $(document).on('click', '.book_now_btn', function() {
            if ($(this).hasClass('book_now_btn_css')) {
                $('#nav-icon3').trigger('click');
            }

            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
            $('.overlay').fadeIn(1000);
            $('.sign_in_wrapper').addClass('hide').removeClass('show');
            $('.sign_in_wrapper.book_now, .bookNowWrap').removeClass('hide').addClass('show');
        });
        $(document).on('click', '.close_form, .overlay', () => {
            this.reset();
        });
    }
    getInitialState() {
        return {location: '', property: '', jobaddress: '', maintained: '', property_size: '', num_hours: '', cost: '', waste_removed: false, jobDate: moment(), contactnumber: '', userid: '', profile_image_book: [], isSuccess: false, loading: false, errors: {}, servicesOptions: [], pets: true, accesstoproperty: true, extradetails: '', servicerequired: null, gatewidth: ''}
    }
    _create() {
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/jobs',
            type: 'POST',
            headers: this.headers,
            data: JSON.stringify({
                location: this.state.location,
                propertydetails: this.state.property,
                lastmaintained: this.state.maintained,
                propertysize: this.state.property_size,
                workhours: parseInt(this.state.num_hours),
                cost: parseInt(this.state.cost),
                greenwasteremoval: this.state.waste_removed,
                jobdate: moment(this.state.jobDate).toDate(),
                contactnumber: this.state.contactnumber,
                userid: parseInt(this.state.userid),
                images: this.state.profile_image_book,
                jobaddress: this.state.jobaddress,
                latitude: 18.9780,
                longitude: 79.5678,
                status: 0,
                services: this.state.servicesOptions,
                gatewidth: this.state.gatewidth,
                servicerequied: parseInt(this.state.servicerequired),
                extradetails: this.state.extradetails,
                accesstoproperty: this.state.accesstoproperty,
                pets: this.state.pets
            }),
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    _validate() {
        console.log(this.state);
        var errors = {}
        if(this.state.location == '') {
            errors.location = 'First Name is required';
        }
        if(this.state.property == '') {
            errors.property = 'Last Name is required';
        }
        if(this.state.maintained == '') {
            errors.maintained = 'Role is required';
        }
        if(this.state.property_size == '') {
            errors.property_size = 'Email is required';
        }
        if(this.state.num_hours == '') {
            errors.num_hours = 'Password is required';
        }
        if(this.state.cost == '') {
            errors.cost = 'Profile Image is required';
        }
        if(this.state.jobDate == '') {
            errors.jobDate = 'Please select Job Date'
        }
        if(this.state.contactnumber == '') {
            errors.contactnumber = 'Contact Number is required'
        }
        if(this.state.jobaddress == '') {
          errors.jobaddress = 'Address is required'
        }
        if(this.state.servicesOptions == '') {
          errors.servicesOptions = 'Please choose atleast one service'
        }
        if(this.state.extradetails == '') {
          errors.extradetails = 'Extra details is required'
        }
        if(this.state.servicerequired == '') {
          errors.servicerequired = 'Please select one service required'
        }
        if(this.state.gatewidth == '') {
          errors.gateWidth = 'Please enter gate width in Feet and Inch'
        }
        return errors;
    }
    _onSubmit(e) {
        e.preventDefault();
        var errors = this._validate();
        if(Object.keys(errors).length != 0) {
            this.setState({
                errors: errors
            });
            return;
        }
        $('.hologram-btn').eq(1).trigger('click');
    }
    _onSubmitForm() {
        var xhr = this._create();
        xhr.done(this._onSuccess.bind(this))
        .fail(this._onError.bind(this))
        .always(this.hideLoading.bind(this))
    }
    hideLoading() {
        this.setState({loading: false});
    }
    _onSuccess() {
        this.setState({bookStatusMsg: 'Successfully Booked...', isSuccess: true});
        this.refs.user_form.reset();
        this.setState(this.getInitialState());
        this.reset();
        $('.close_form').trigger('click');
        this.setState({
            isSuccess: false
        });
        // show success message
    }
    _onError() {
        this.setState({
            errors: ''
        });
    }
    _onChange(e) {
        var state = {};
        state[e.target.name] =  $.trim(e.target.value);
        this.setState(state);
    }
    handleDateChange = m => {
        this.setState({ jobDate: m });
    };
    handleRadio(e) {
        if($(e.target).attr('name') == 'pets') {
            this.setState({
                pets: !this.state.pets
            });
        } else if($(e.target).attr('name') == 'accesstoproperty') {
            this.setState({
                accesstoproperty: !this.state.accesstoproperty
            });
        } else {
            this.setState({
                waste_removed: !this.state.waste_removed
            });
        }
    }
    _formGroupClass(field) {
        var className = 'form-group ';
        if(field) {
            className += ' has-error'
        }
        return className;
    }
    componentWillReceiveProps() {
        if (!(sessionStorage['user'] == null || sessionStorage['user'] == '' || sessionStorage['user'] == undefined) && this.session) {
            this.getUserObj = JSON.parse(sessionStorage['user']);
            this.setState({
                userToken: this.getUserObj.tokenData.token,
                userid: this.getUserObj.user._id,
                userEmail: this.getUserObj.user.email
            });
            this.headers = {
                'Content-Type': 'application/json',
                'x-access-token': this.getUserObj.tokenData.token,
                'x-key': this.getUserObj.user.email
            }
            this.setState({showFormFromBooknow: true, showBookNowForm: true});

            this.session = false
        }

        if($('.bookNowWrap > div').attr('hidden') && $('.book_now').hasClass('show')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    }

    myUploadFunc(file, data) {
        var list = $('input[type="file"]')[0].files;
        var fromData = new FormData();
        fromData.append('file', list[this.indexFile]);
        this.indexFile = this.indexFile + 1;
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/utils/image/upload',
            type: 'POST',
            headers: {
                'x-access-token': this.state.userToken,'x-key': this.state.userEmail
            },
            data: fromData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this),
            success: function(res) {
                this.indexFile = this.indexFile - 1;
                if (this.indexFile == 0) {
                    var joined = this.state.profile_image_book.concat(res.file);
                    this.setState({ loading: false, profile_image_book: joined });
                    this._onSubmitForm();
                }
            }.bind(this),
            error: function() {
                this.setState({loading: false});
            }.bind(this),
            complete: function() {
                this.setState({loading: false});
            }.bind(this)
        })
    }
    reset() {
        this.refs.user_form.reset();
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('photoUploader')[0]);
        ReactDOM.render(
            <Hologram uploadFunction={this.myUploadFunc.bind(this)} />,
            document.getElementsByClassName('photoUploader')[0]
        );
    }

    enableBookNowForm() {
        this.setState({showBookNowForm: true});
        this.componentWillReceiveProps();
    }

    servicesChanged = (newServices) => {
        this.setState({
          servicesOptions: newServices
        });
    }

    otherServicesCheck() {
        document.getElementById('extradetails').readOnly =
                   !document.getElementById('otherServicesCheckbox').checked;
    }

    render() {
        return (
            <div className="bookNowWrap">
                <div hidden={this.state.showBookNowForm}>
                    <FormSignInComponent showFormFromBooknow={this.state.showFormFromBooknow} enableBookNow={this.enableBookNowForm.bind(this)} />
                </div>

                <div className="sign_in_wrapper book_now" hidden={!this.state.showBookNowForm}>
                <div className='overlay_form' hidden={!this.state.loading}><div><img src={form_loader}/></div></div>
                    <div className="title_form">
                        // <h2 hidden={!this.state.isSuccess} className={'loginStatus ' + (this.state.bookStatusMsg ? 'isa_success' : '')}><span>{this.state.bookStatusMsg}</span></h2>
                        <h2>Book Now</h2>
                        <a href="#." className="close_form">x</a>
                    </div>

                    <div className="total-price">
                    Total: &euro; 199
                    </div>
                    <form ref='user_form' onSubmit={this._onSubmit.bind(this)}>
                        <div className={'location ' + this._formGroupClass(this.state.errors.location)}>
                            <label>Location*</label>
                            <select name="location" ref="location" type="text" className="form-control" id="location" placeholder="Select Location" onChange={this._onChange.bind(this)}>
                                <option value="">Select Location</option>
                                <option value="Dublin">Dublin</option>
                                <option value="Carlow">Carlow</option>
                                <option value="Kilkenny">Kilkenny</option>
                                <option value="Arklow">Arklow</option>
                                <option value="Gorey">Gorey</option>
                                <option value="Kildare">Kildare</option>
                                <option value="Portlaoise">Portlaoise</option>
                            </select>
                            <span className="help-block">{this.state.errors.location}</span>
                        </div>
                        <div className={'property ' + this._formGroupClass(this.state.errors.property)}>
                            <label>Tell us a bit about your property what would you like us to do?</label>
                            <textarea name="property" ref="property" type="text" className="form-control" id="property" placeholder="Property" onChange={this._onChange.bind(this)}></textarea>
                            <span className="help-block">{this.state.errors.property}</span>
                        </div>

                        <div className={'servicesOptions ' + this._formGroupClass(this.state.errors.servicesOptions)}>
                            <label>Services</label>
                            <CheckboxGroup
                                name="fruits"
                                value={this.state.servicesOptions}
                                onChange={this.servicesChanged}>

                                <label><Checkbox value="1"/> Grass cutting</label>
                                <label><Checkbox value="2"/> Power washing</label>
                                <label><Checkbox value="3"/> Lawn Care</label>
                                <label><Checkbox value="4"/> Strimming</label>
                                <label><Checkbox value="5"/> Weeding</label>
                                <label><Checkbox value="6"/> Leaf clean up</label>
                                <label><Checkbox value="7"/> Planting Services</label>
                                <label><Checkbox value="8"/> Pruning Hedge cutting (max 6ft ht) Mulching</label>
                                <label><Checkbox value="9"/> Fertilizing</label>
                                <label><Checkbox value="10"/> Lawn Edging</label>
                            </CheckboxGroup>
                            <span className="help-block">{this.state.errors.servicesOptions}</span>
                        </div>

                        <div className={'extradetails clearfix ' + this._formGroupClass(this.state.errors.extradetails)}>
                            <label><input id="otherServicesCheckbox" type="checkbox" onChange={this.otherServicesCheck.bind(this)}/> Other Services</label>
                            <textarea readOnly name="extradetails" ref="extradetails" type="text" className="form-control" id="extradetails" placeholder="Extra details" onChange={this._onChange.bind(this)}></textarea>
                            <span className="help-block">{this.state.errors.extradetails}</span>
                        </div>

                        <div className={'servicerequired ' + this._formGroupClass(this.state.errors.servicerequired)}>
                            <label>How often do your require your service*</label>
                            <select name="servicerequired" ref="servicerequired" type="text" className="form-control" id="servicerequired" placeholder="Select One" onChange={this._onChange.bind(this)}>
                                <option value="">Select One</option>
                                <option value="1">Weekly</option>
                                <option value="2">Bi Weekly</option>
                                <option value="3">Monthly</option>
                                <option value="4">Once off</option>
                            </select>
                            <span className="help-block">{this.state.errors.servicerequired}</span>
                        </div>

                        <div className={'maintained col-6-left ' + this._formGroupClass(this.state.errors.maintained)}>
                            <label>When your property was last maintained?*</label>
                            <select name="maintained" ref="maintained" type="text" className="form-control" id="maintained" placeholder="Select Last Maintained" onChange={this._onChange.bind(this)}>
                                <option value="">Select Last Maintained</option>
                                <option value="Often - Every week or few weeks">Often - Every week or few weeks</option>
                                <option value="Every 3-6 months">Every 3-6 months</option>
                                <option value="Six months +">Six months +</option>
                            </select>
                            <span className="help-block">{this.state.errors.maintained}</span>
                        </div>

                        <div className={'property_size col-6-right ' + this._formGroupClass(this.state.errors.property_size)}>
                            <label>When is your property size?*</label>
                            <select name="property_size" ref="property_size" type="text" className="form-control" id="property_size" placeholder="Select Property Size" onChange={this._onChange.bind(this)}>
                                <option value="">Select Property Size</option>
                                <option value="Town or small garden">Town or small garden</option>
                                <option value="Medium">Medium</option>
                                <option value="Large or country garden">Large or country garden</option>
                            </select>
                            <span className="help-block">{this.state.errors.property_size}</span>
                        </div>

                        <div className={'gateWidth clearfix ' + this._formGroupClass(this.state.errors.gateWidth)}>
                            <label>Select Your Gate Width</label>
                            <div className="clearfix">
                                <input name="gatewidth" ref="gatewidth" type="text" className="form-control" id="gatewidth" placeholder="Feet" onChange={this._onChange.bind(this)} />
                            </div>
                            <span className="help-block">{this.state.errors.gateWidth}</span>
                        </div>

                        <div className={'num_hours col-6-left ' + this._formGroupClass(this.state.errors.num_hours)}>
                            <input name="num_hours" ref="num_hours" type="number" className="form-control" id="num_hours" placeholder="Number of Hours*" min="3.5" max="8" step="0.5" onChange={this._onChange.bind(this)} />
                            <span className="help-block">{this.state.errors.num_hours}</span>
                        </div>

                        <div className={'cost col-6-right ' + this._formGroupClass(this.state.errors.cost)}>
                            <input name="cost" ref="cost" type="number" className="form-control" id="cost" placeholder="Cost*" onChange={this._onChange.bind(this)} />
                            <span className="help-block">{this.state.errors.cost}</span>
                        </div>

                        <div className={'waste_removed ' + this._formGroupClass(this.state.errors.waste_removed)}>
                            <label>Do you require green waste removed?*</label>
                            <label><input name='waste_removed' type="radio" checked={this.state.waste_removed == true} onChange={this.handleRadio} value="Yes" />Yes</label>
                            <label><input name='waste_removed' type="radio" value="No" checked={this.state.waste_removed == false} onChange={this.handleRadio} />No</label>
                            <span className="field-specific-note">This may incur an additional charge in some instances depending on size and weight.</span>
                        </div>

                        <div className={'pets ' + this._formGroupClass(this.state.errors.pets)}>
                            <label>Are their pets present?</label>
                            <label><input name='pets' type="radio" checked={this.state.pets == true} onChange={this.handleRadio} value="Yes" />Yes</label>
                            <label><input name='pets' type="radio" value="No" checked={this.state.pets == false} onChange={this.handleRadio} />No</label>
                        </div>

                        <div className={'accesstoproperty ' + this._formGroupClass(this.state.errors.accesstoproperty)}>
                            <label>Access to property?</label>
                            <label><input name='accesstoproperty' type="radio" checked={this.state.accesstoproperty == true} onChange={this.handleRadio} value="Yes" />Yes</label>
                            <label><input name='accesstoproperty' type="radio" value="No" checked={this.state.accesstoproperty == false} onChange={this.handleRadio} />No</label>
                        </div>

                        <div className="jobDate clearfix">
                            <label>Please select the date and time you would like your service (mm/dd/yyyy HH:mm)</label>
                            <div className="input">
                                <input type="text" value={this.state.jobDate.format('llll')} readOnly />
                            </div>
                            <InputMoment
                                moment={this.state.jobDate}
                                onChange={this.handleDateChange}
                                minStep={5}
                              />
                        </div>

                        <div className={'jobaddress col-6-left ' + this._formGroupClass(this.state.errors.jobaddress)}>
                            <textarea name="jobaddress" ref="jobaddress" type="text" className="form-control" id="jobaddress" placeholder="Job Address" onChange={this._onChange.bind(this)}></textarea>
                            <span className="help-block">{this.state.errors.jobaddress}</span>
                        </div>

                        <div className={'contactnumber col-6-right ' + this._formGroupClass(this.state.errors.contactnumber)}>
                            <input name="contactnumber" ref="contactnumber" type="text" className="form-control" id="contactnumber" placeholder="Contact Number" onChange={this._onChange.bind(this)} />
                            <span className="help-block">{this.state.errors.contactnumber}</span>
                        </div>

                        <div className="photoUploader clearfix"><Hologram uploadFunction={this.myUploadFunc.bind(this)} ></Hologram></div>

                        <div className="submit_button clearfix">
                            <button type="submit">Book Now</button>
                            <button type="button" className="reset" onClick={this.reset.bind(this)}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

FormBookNowComponent.displayName = 'SrcComponentsFormBookNowComponent';

// Uncomment properties you need
// FormBookNowComponent.propTypes = {};
// FormBookNowComponent.defaultProps = {};

export default FormBookNowComponent;
