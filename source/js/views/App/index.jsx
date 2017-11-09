import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firebaseAuth } from 'utils/firebase_config';
import Routes, { routeCodes } from 'config/routes';
import { getUser } from 'actions/login';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

@connect(state => ({
  loggedInUser: state.login.get('loggedInUser'),
}))
class App extends Component {
  static propTypes = {
    history: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    dispatch: PropTypes.func,
  }

  componentWillMount() {
    const { dispatch } = this.props;
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.email.endsWith('work.co')) {
        dispatch(getUser(user.uid, user.email, user.displayName));
        this.props.history.push(routeCodes.HOME);
      } else {
        this.props.history.push(routeCodes.LOGIN);
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <MuiThemeProvider>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}


export default withRouter(App);
