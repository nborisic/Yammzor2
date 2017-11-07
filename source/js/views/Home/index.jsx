import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOutUser } from 'actions/login';
import { firebaseLogOut, firebaseCurrentUser } from 'api/auth';
import { Link } from 'react-router-dom';


@connect(state => ({
  loggedInUser: state.login.get('loggedInUser'),
}))
export default class Home extends Component {
  static propTypes = {
    loggedInUser: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    const { loggedInUser, dispatch } = this.props;
    if (loggedInUser) {
      dispatch(logOutUser());
      firebaseLogOut();
    }
  }


  render() {
    const {
      loggedInUser,
    } = this.props;

    // if (firebaseCurrentUser()) {
    //   firebaseCurrentUser().getIdToken(true).then((idToken) => {
    //     fetch(`https://yamzor-2.firebaseio.com/users.json?auth=${ idToken }`).then((result) => {
    //       return result.json();
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     });
    //   });
    // }

    return (
      <div className='Home'>
        hello user
        <button onClick={ this.handleLogOut }>logout</button>
        <Link to='/admin'> Admin </Link>
      </div>
    );
  }
}
