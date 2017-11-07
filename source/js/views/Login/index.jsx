import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firebaseAuth } from 'utils/firebase_config';
import { routeCodes } from 'config/routes';
import { getGoogleProvider } from 'api/auth';


class Login extends Component {

  constructor() {
    super();

    this.state = {
      googleAuthErrors: '',
    };

    this.handleGoogleSignInClick = this.handleGoogleSignInClick.bind(this);
  }

  handleGoogleSignInClick() {
    const provider = getGoogleProvider();
    firebaseAuth().signInWithPopup(provider).then((result) => {
      if (!result.user.email.endsWith('work.co')) {
        result.user.delete();
        this.setState({
          googleAuthErrors: 'Samo za workandco-personel ',
        });
      }
    }).catch(error => {
      this.setState({
        googleAuthErrors: error.message,
      });
    });
  }


  render() {
    return (
      <div className='Login'>
        <h1>Login</h1>
        <button
          onClick={ this.handleGoogleSignInClick }
          label='Google accounts'
        > Log in </button>
        { this.state.googleAuthErrors && <span >{ this.state.googleAuthErrors }</span> }
      </div>
    );
  }
}


export default withRouter(Login);
