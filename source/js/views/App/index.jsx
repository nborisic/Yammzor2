import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebaseAuth } from 'utils/firebase_config';
import Routes, { routeCodes } from 'config/routes';
import { getUser } from 'actions/login';
import { connect } from 'react-redux';

@connect()
class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.email.endsWith('work.co')) {
        dispatch(getUser(user.uid, user.email, user.displayName));
        this.props.history.push(routeCodes.HOME);
        console.log('redirectovao home');
      } else {
        this.props.history.push(routeCodes.LOGIN);
        console.log('redirectovao login');

      }
    });
  }

  render() {
    return (
      <div className='App'>
        <Routes />
      </div>
    );
  }
}


export default withRouter(App);
