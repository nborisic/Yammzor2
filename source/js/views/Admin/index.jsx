import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import MenuInput from 'components/Admin/MenuInput';
import Users from 'components/Admin/Users';


export default class Admin extends Component {
  constructor() {
    super();

    this.state = {
      tabValue: 'menuInput',
    };
    this.handleTabChange = this.handleTabChange.bind(this);
  }


  handleTabChange(value) {
    this.setState({
      tabValue: value,
    });
  }
  render() {
    return (
      <div className='Admin'>
        <Tabs
          value={ this.state.tabValue }
          onChange={ this.handleTabChange }
        >
          <Tab
            value='menuInput'
            label='Menu Input'
          >
            <MenuInput />
          </Tab>
          <Tab
            value='userMenagment'
            label='User managment'
          >
            <Users userRequest={ this.state.tabValue } />
          </Tab>
          <Tab
            value='report'
            label='Report'
          >
        report
          </Tab>
        </Tabs>
      </div>
    );
  }
}
