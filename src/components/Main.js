require('styles/reset.css');
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import HeaderComponent from 'components/src/components/HeaderComponent';
import HeaderNavComponent from 'components/src/components/HeaderNavComponent';
import FormSignInComponent from 'components/src/components/FormSignInComponent';
import FormSignUpComponent from 'components/src/components/FormSignUpComponent';
import FormBookNowComponent from 'components/src/components/FormBookNowComponent';
import GlobalFooterComponent from 'components/src/components/GlobalFooterComponent';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        sessionStorage['user'] = '';
    }
    componentDidMount() {
      // Decode entities in the URL
      // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
      window.location.hash = window.decodeURIComponent(window.location.hash);
      const scrollToAnchor = () => {
        const hashParts = window.location.hash.split('#');
        if (hashParts.length > 2) {
          const hash = hashParts.slice(-1)[0];
          document.querySelector(`#${hash}`).scrollIntoView();
        }
      };
      scrollToAnchor();
      window.onhashchange = scrollToAnchor;
    }
    render() {
        return (
            <div className="wrapper parent-wrapper">
                <div className="wrapper top_header_wrapper">
                    <HeaderComponent />
                    <HeaderNavComponent />
                </div>
                {this.props.children}
                <GlobalFooterComponent />
                <FormSignInComponent />
                <FormSignUpComponent />
                <FormBookNowComponent />
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
