import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import App from './components/Main';
import BannerComponent from 'components/src/components/BannerComponent';
import HowToComponent from 'components/src/components/HowToComponent';
import ServicesComponent from 'components/src/components/ServicesComponent';
import ServicesTypesComponent from 'components/src/components/ServicesTypesComponent';
import ServicesDetailsComponent from 'components/src/components/ServicesDetailsComponent';
import TestimonialsComponent from 'components/src/components/TestimonialsComponent';
import AboutusComponent from 'components/src/components/AboutusComponent';
import JobsDisplayComponent from 'components/src/components/JobsDisplayComponent';

const app = document.getElementById('app');

const Home = () => (
  <div>
      <BannerComponent />
      <HowToComponent />
      <ServicesComponent />
      <ServicesTypesComponent />
      <ServicesDetailsComponent />
      <TestimonialsComponent />
  </div>
);

const About = () => (
  <div>
    <AboutusComponent />
  </div>
);

const Jobs = () => (
  <div>
    <JobsDisplayComponent userDetails={sessionStorage['user']}/>
  </div>
);

// Render the main component into the dom
ReactDOM.render(
    <Router>
        <App>
            <Route exact path="/redesign" component={Home}></Route>
            <Route path="/redesign/about" component={About}></Route>
            <Route path="/redesign/jobs" component={Jobs}></Route>
        </App>
    </Router>,
app);
