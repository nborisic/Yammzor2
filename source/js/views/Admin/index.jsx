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
      weekMenuArray: null,
    };

    this.postToFirebase = this.postToFirebase.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.setFromDate = this.setFromDate.bind(this);
    this.setToDate = this.setToDate.bind(this);
  }
  onInputChange(e) {
    // sece tekst i odbacuje rimske brojeve i na mestima gde ima 3 nova reda
    const stringArray = e.target.value.split(/\n[IVabc]{1,4}\n|\n{3}/);
    let day;
    const weekMenuArray = [];
    for (let i = 0; i < stringArray.length; i++) {
      for (let j = 0; j < weekDays.length; j++) {
        if (stringArray[i].includes(weekDays[j])) {
          day = day === undefined ? 0 : day + 1;
          weekMenuArray[day] = [];
          // uklanja nepotrebne datume pored dana
          stringArray[i] = stringArray[i].replace(/[\d,.\s]/g, '');
          break;
        }
      }
      // array sa odvojenim danima u nedelji
      weekMenuArray[day].push(stringArray[i].trim());
    }

    this.setState({
      menu: e.target.value,
      weekMenuArray,
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
    const { fromDate, toDate, weekMenuArray, formError } = this.state;

    if (formError != null) {
      this.setState({
        formError: null,
      });
    }

    // generisanje objekta za slanje u bazu
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
    const weekMenu = weekMenuArray.reduce(reducedObj, {});
    const menuObject = {};
    menuObject[`from ${ fromDate } to ${ toDate }`] = weekMenu;

    // provera validnosti forme
    let formErrorMessage;
    const weekDaysExpression = new RegExp(`^${ weekDays.join('|^') }`);
    for (let i = 0; i < weekMenuArray.length; i++) {
      if (!weekDaysExpression.test(weekMenuArray[i][0])) {
        formErrorMessage = 'Pogresno unet dan, forma nije poslata';
      }
      for (let j = 0; j < weekMenuArray[i].length; j++) {
        if (weekMenuArray[i][j] === '') {
          formErrorMessage = 'Imate viska red, forma nije poslata';
        }
      }
    }
    this.setState({
      formError: formErrorMessage,
    });

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
            formSubmit: 'Forma uspesno poslata!',
          });
        }
      )
      .catch(
        () => {
          this.setState({
            formError: 'Ups, nesto je poslo po zlu.. forma nije poslata',
          });
        }
      );
    }
  }

  render() {
    const { menu, weekMenuArray, formError, formSubmit } = this.state;
    const menuItem = [];
    if (weekMenuArray) {
      weekMenuArray.map((oneDay) => {
        menuItem.push(<h4 key={ oneDay[0] }>{ oneDay[0] }</h4>);
        for (let i = 1; i < oneDay.length; i++) {
          menuItem.push(
            <div key={ oneDay[0] + i }>
              <div style={ { fontWeight: 'bold' } }>{ i }</div>
              <div>{ oneDay[i] }</div>
            </div>
          );
        }
        return true;
      });
    }

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
        <div className='container'>
          <div className='left_item'>
            <form onSubmit={ this.postToFirebase }>
              <textarea
                rows='90'
                cols='50'
                onChange={ this.onInputChange }
                value={ menu }
              />
              <button type='submit'> Posalji </button>
              <span className={ formError ? 'warningText' : 'successText' }>{ formError || formSubmit }</span>
            </form>
          </div>
          <div className='item'>
            <div className='display-linebreak'>
              { menuItem }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
