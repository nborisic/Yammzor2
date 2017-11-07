import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { firebaseCurrentUser } from 'api/auth';
import { weekDays } from 'utils/global';
import DatePicker from 'material-ui/DatePicker';

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
      fromDate: null,
      toDate: null,
      menu: '',
    };

    this.postToFirebase = this.postToFirebase.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setMinDate = this.setMinDate.bind(this);
    this.setMaxDate = this.setMaxDate.bind(this);
  }
  onInputChange(e) {
    this.setState({
      menu: e.target.value,
    });
  }

  setFromDate(e, date) {
    this.setState({
      fromDate: date,
    });
  }

  setToDate(e, date) {
    this.setState({
      toDate: date,
    });
  }

  postToFirebase(e) {
    e.preventDefault();

    if (firebaseCurrentUser()) {
      firebaseCurrentUser().getIdToken(true).then((idToken) => {
        fetch(`https://yamzor-2.firebaseio.com/menu.json?auth=${ idToken }`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.menu),
        });
      }).then(console.log(this.state.menu));
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className='Admin'>
        hello admineee
        <DatePicker
          autoOk={ true }
          onChange={ this.setFromDate }
          hintText='od'
        />
        <DatePicker
          autoOk={ true }
          onChange={ this.setToDate }
          hintText='do'
        />
        <form onSubmit={ this.postToFirebase }>
          <textarea
            rows='90'
            cols='50'
            onChange={ this.onInputChange }
            value={ this.state.menu }
          />
          <button type='submit'> Posalji </button>
        </form>
      </div>
    );
  }
}
