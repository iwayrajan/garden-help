'use strict';

import React from 'react';
import $ from 'jquery';

require('styles/src/components/FormSignUp.css');
let form_loader = require('../../../images/form-loader.gif');

class FormSignUpComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              firstName: '',
              lastName: '',
              roleUser: '',
              emailUser: '',
              passwordUser: '',
              profileImage: '',
              errors: '',
              regStatusMsg: '',
              isSuccess: false,
              loading: false
        };
        $(document).ready(function(){
            $('.join_us_form_open').on('click', function () {
                $('.overlay').fadeIn(1000);
                $('.sign_in_wrapper, .bookNowWrap').addClass('hide').removeClass('show');
                $('.sign_in_wrapper.sign_up_form').removeClass('hide').addClass('show');
            });
        });
    }
    getInitialState() {
        return {firstName: '', lastName: '', roleUser: '', emailUser: '', passwordUser: '', profileImage: '', isSuccess: false, loading: false, errors: {}}
    }
    _create() {
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/signup',
            type: 'POST',
            data: {
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                role: this.state.roleUser,
                email: this.state.emailUser,
                password: this.state.passwordUser,
                profileimage: this.state.profileImage
            },
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    _validate() {
      var errors = {}
      if(this.state.firstName == '') {
        errors.firstName = 'First Name is required';
      }
      if(this.state.lastName == '') {
        errors.lastName = 'Last Name is required';
      }
      if(this.state.roleUser == '') {
        errors.roleUser = 'Role is required';
      }
      if(this.state.emailUser == '') {
        errors.emailUser = 'Email is required';
      }
      if(this.state.passwordUser == '') {
        errors.passwordUser = 'Password is required';
      }
      if(this.state.profileImage == '') {
        errors.profileImage = 'Profile Image is required';
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
    var xhr = this._create();
    xhr.done(this._onSuccess.bind(this))
    .fail(this._onError.bind(this))
    .always(this.hideLoading.bind(this))
  }
  hideLoading() {
    this.setState({loading: false});
  }
  _onSuccess() {
      this.setState({regStatusMsg: 'You are successfully registered...', isSuccess: true});
    this.refs.user_form.reset();
    this.setState(this.getInitialState());
    $('.close_form').trigger('click');
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
  _formGroupClass(field) {
    var className = 'form-group ';
    if(field) {
      className += ' has-error'
    }
    return className;
  }
    render() {
        return (
            <div className="sign_in_wrapper sign_up_form">
                <div className='overlay_form' hidden={!this.state.loading}><div><img src={form_loader}/></div></div>
                <div className="title_form">
                    // <h2 className={'loginStatus ' + (this.state.regStatusMsg ? 'isa_success' : '')}><span>{this.state.regStatusMsg}</span></h2>
                    <h2>Sign Up</h2>
                    <a href="#." className="close_form">x</a>
                </div>
                <form ref='user_form' onSubmit={this._onSubmit.bind(this)}>
                    <div className={'first_name col-6-left ' + this._formGroupClass(this.state.errors.firstName)}>
                        <input name="firstName" ref="firstName" type="text" className="form-control" id="firstName" placeholder="First Name" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.firstName}</span>
                    </div>
                    <div className={'last_name col-6-right ' + this._formGroupClass(this.state.errors.lastName)}>
                        <input name="lastName" ref="lastName" type="text" className="form-control" id="lastName" placeholder="Last Name" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.lastName}</span>
                    </div>
                    <div className={'role_user col-6-left ' + this._formGroupClass(this.state.errors.roleUser)}>
                        <input name="roleUser" ref="roleUser" type="text" className="form-control" id="roleUser" placeholder="Role" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.roleUser}</span>
                    </div>
                    <div className={'email_user col-6-right ' + this._formGroupClass(this.state.errors.emailUser)}>
                        <input name="emailUser" ref="emailUser" type="email" className="form-control" id="emailUser" placeholder="Email" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.emailUser}</span>
                    </div>
                    <div className={'profile_image col-6-left ' + this._formGroupClass(this.state.errors.profileImage)}>
                        <input name="profileImage" ref="profileImage" type="text" className="form-control" id="profileImage" placeholder="Profile Image" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.profileImage}</span>
                    </div>
                    <div className={'password_user col-6-right ' + this._formGroupClass(this.state.errors.passwordUser)}>
                        <input name="passwordUser" ref="Password" type="password" className="form-control" id="passwordUser" placeholder="Password" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.passwordUser}</span>
                    </div>
                    <div className="submit_button">
                        <button type="submit" disabled={this.state.loading}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

FormSignUpComponent.displayName = 'SrcComponentsFormSignUpComponent';

// Uncomment properties you need
// FormSignUpComponent.propTypes = {};
// FormSignUpComponent.defaultProps = {};

export default FormSignUpComponent;
