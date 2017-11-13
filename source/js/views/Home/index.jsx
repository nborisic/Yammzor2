import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOutUser } from 'actions/login';
import { firebaseLogOut, firebaseCurrentUser } from 'api/auth';
import { Link } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import PickLunch from 'components/User/PickLunch'


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


    return (
      <div className='Home'>
        hello user
        <button onClick={ this.handleLogOut }>logout</button>
        <Link to='/admin'> Admin </Link>
        <Tabs >
          <Tab
            value='izaberiRucak'
            label='Izaberi Rucak'
          >
            <PickLunch />
          </Tab>
          <Tab
            value='pregledNarudzbine'
            label='Pregled'
          >
            <div>
              pregled
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
