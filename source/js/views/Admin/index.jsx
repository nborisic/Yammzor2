import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { firebaseCurrentUser } from 'api/auth';

@connect(state => ({
  loggedInUser: state.login.get('loggedInUser'),
}))
export default class Admin extends Component {
  static propTypes = {
    loggedInUser: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      menu: '',
    };

    this.postToFirebase = this.postToFirebase.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  postToFirebase(e) {
    e.preventDefault();

    if (firebaseCurrentUser()) {
      firebaseCurrentUser().getIdToken(true).then((idToken) => {
        fetch(`https://yamzor-2.firebaseio.com/menu.json?auth=${ idToken }`, {
          method: 'PUT',
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'application/json',
          // },
          body: JSON.stringify(this.state.menu),
        });
      }).then(console.log('postovalo se'));
    }
  }

  onInputChange(e) {
    this.setState({
      menu: e.target.value,
    });
  }


  render() {
    return (
      <div className='Admin'>
        hello admineee
      <form onSubmit={ this.postToFirebase }>
        <input
          onChange={ this.onInputChange }
          value={ this.state.menu }
        />
        <button type='submit'> Posalji </button>
      </form>
      </div>
    );
  }
}
