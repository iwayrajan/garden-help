'use strict';

import React from 'react';
require('react-dom');
import $ from 'jquery';

require('styles/src/components/FormSignIn.css');
let form_loader = require('../../../images/form-loader.gif');

class FormSignInComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              emailAddress: '',
              loginPassword: '',
              errors: '',
              invalidLoginMsg: '',
              loginStatusMsg: '',
              loading: false,
              isSuccess: false,
              userCompleteData: {}
        };

        $(document).on('click', '.login_form_open', function () {
            $('.overlay').fadeIn(1000);
            $('.sign_in_wrapper').addClass('hide').removeClass('show');
            $('.sign_in_wrapper.sign_in_form').removeClass('hide').addClass('show');
        });
        $(document).on('click', '.close_form, .overlay', () => {
            this.refs.user_form.reset();
            $('.overlay').fadeOut(1000);
            $('.sign_in_wrapper, .bookNowWrap').removeClass('show');
            $('.sign_in_wrapper, .bookNowWrap').addClass('hide');
            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
        });

    }
    getInitialState() {
        return {emailAddress: '', loginPassword: '', loading: false, errors: {}}
    }
    _create() {
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/login',
            type: 'POST',
            data: {
                username: this.state.emailAddress,
                password: this.state.loginPassword
            },
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    _validate() {
      var errors = {}
      if(this.state.emailAddress == '') {
        errors.emailAddress = 'Email Address is required';
      }
      if(this.state.loginPassword == '') {
        errors.loginPassword = 'Password is required';
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
  _onSuccess(data) {
    this.state.userCompleteData = data;
    sessionStorage['user'] = JSON.stringify(this.state.userCompleteData);
    this.setState({loginStatusMsg: 'You are successfully logged in...', isSuccess: true});
    this.refs.user_form.reset();
    this.setState(this.getInitialState());
    if(this.props.enableBookNow) {
        this.props.enableBookNow();
    } else {
        $('.sign_in_form .close_form').trigger('click');
    }
    // show success message
  }
  _onError() {
      var message = 'Invalid Username OR Email address. Please login again!';
    this.setState({
      invalidLoginMsg: message,
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
  componentWillReceiveProps() {
      if (this.props.showFormFromBooknow == false) {
          $('.bookNowWrap .sign_in_wrapper.sign_in_form').removeClass('hide').addClass('show');
      }
  }
    render() {
        return (
            <div className="sign_in_wrapper sign_in_form">
                <div className='overlay_form' hidden={!this.state.loading}><div><img src={form_loader}/></div></div>
                <div className="title_form">
                    // <h2 className={'loginStatus ' + (this.state.loginStatusMsg ? 'isa_success' : '')}><span>{this.state.loginStatusMsg}</span></h2>
                    <h2>Sign In</h2>
                    <div className="invalidLogin error_message" hidden={this.state.isSuccess}>{this.state.invalidLoginMsg}</div>
                    <a href="#." className="close_form">x</a>
                </div>
                <form ref="user_form" onSubmit={this._onSubmit.bind(this)}>
                    <div className={'email_address ' + this._formGroupClass(this.state.errors.emailAddress)}>
                        <input name="emailAddress" ref={node => this.node = node} type="email" className="form-control" id="emailAddress" placeholder="Email Address" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.emailAddress}</span>
                    </div>
                    <div className={'login_password ' + this._formGroupClass(this.state.errors.loginPassword)}>
                        <input name="loginPassword" ref={node => this.node = node} type="password" className="form-control" id="loginPassword" placeholder="EnterPassword" onChange={this._onChange.bind(this)} />
                        <span className="help-block">{this.state.errors.loginPassword}</span>
                    </div>
                    <div className="submit_button">
                        <button type="submit" disabled={this.state.loading}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

FormSignInComponent.displayName = 'SrcComponentsFormSignInComponent';

// Uncomment properties you need
// FormSignInComponent.propTypes = {};
// FormSignInComponent.defaultProps = {};

export default FormSignInComponent;
