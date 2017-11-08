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
      formSubmit: null,
      formError: null,
      menu: '',
    };

    this.postToFirebase = this.postToFirebase.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setFromDate = this.setFromDate.bind(this);
    this.setToDate = this.setToDate.bind(this);
  }
  onInputChange(e) {
    this.setState({
      menu: e.target.value,
    });
  }

  setFromDate(e, date) {
    const reDate = new Intl.DateTimeFormat('en-GB').format(date).replace(/\//g, '-');
    this.setState({
      fromDate: reDate,
    });
  }

  setToDate(e, date) {
    const reDate = new Intl.DateTimeFormat('en-GB').format(date).replace(/\//g, '-');
    this.setState({
      toDate: reDate,
    });
  }

  postToFirebase(e) {
    e.preventDefault();

    const stringArray = this.state.menu.split(/\n[IVabc]{1,4}\n|\n{3}/);
    let day;
    const weekMenuArray = [];
    for (let i = 0; i < stringArray.length; i++) {
      for (let j = 0; j < weekDays.length; j++) {
        if (stringArray[i].includes(weekDays[j])) {
          day = j;
          weekMenuArray[day] = [];
          stringArray[i] = stringArray[i].replace(/[\d,.\s]/g, '');
          break;
        }
      }
      weekMenuArray[day].push(stringArray[i].trim());
    }

    const reducedObj = function (acc, currentValue) {
      return Object.assign(acc, {
        [currentValue[0]]: (function () {
          let dayObj = {};
          for (let i = 1; i < currentValue.length; i++) {
            const oneDish = { [i]: currentValue[i] };
            dayObj = Object.assign(dayObj, oneDish);
          }
          return dayObj;
        }()),
      });
    };

    const weekMeny = weekMenuArray.reduce(reducedObj, {});
    // console.log(weekMenuArray);

    const menuObject = {};
    menuObject[`from ${ this.state.fromDate } to ${ this.state.toDate }`] = weekMeny;
    console.log(menuObject);

    if (firebaseCurrentUser()) {
      firebaseCurrentUser().getIdToken(true).then((idToken) => {
        fetch(`https://yamzor-2.firebaseio.com/menu.json?auth=${ idToken }`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menuObject),
        });
      })
      .then(
        () => {
          this.setState({
            formSubmit: 'Forma uspesno poslata',
          });
        }
      )
      .catch(
        () => {
          this.setState({
            formError: 'Ups, nesto je poslo po zlu',
          });
        }
      );
    }
  }

  render() {
    return (
      <div className='Admin'>
        hello admineee
        <DatePicker
          formatDate={ (date) => new Intl.DateTimeFormat('en-GB').format(date) }
          autoOk={ true }
          onChange={ this.setFromDate }
          hintText='od'
        />
        <DatePicker
          formatDate={ (date) => new Intl.DateTimeFormat('en-GB').format(date) }
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
          <span>{ this.state.formError | this.state.formSubmit  }</span>
        </form>
      </div>
    );
  }
}
