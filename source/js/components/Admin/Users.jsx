import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { getAllUsers, updateRole } from 'actions/admin';
import Popup from './DialogBox';

@connect(state => ({
  allUsers: state.admin.get('getAllUsersSuccess'),
  deletedUser: state.admin.get('deleteUserSuccess'),
}))
export default class Users extends Component {
  static propTypes = {
    userRequest: PropTypes.string,
    allUsers: PropTypes.object,
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      deleteMessage: null,
      deleteMessageError: null,
      updateRoleMessage: null,
    };

    this.changeRole = this.changeRole.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, allUsers } = this.props;

    if (nextProps.userRequest === 'userMenagment') {
      if (nextProps.allUsers === allUsers) {
        dispatch(getAllUsers());
      }
    }
  }

  changeRole(e) {
    const { dispatch } = this.props;
    const { value, name } = e.target;
    dispatch(updateRole(value, name));
  }


  render() {
    const { allUsers } = this.props;
    const tableRow = [];
    if (allUsers) {
      for (let i = 0; i < Object.keys(allUsers).length; i++) {
        tableRow.push(
          <TableRow key={ i }>
            <TableRowColumn> { i + 1 }</TableRowColumn>
            <TableRowColumn>{allUsers[Object.keys(allUsers)[i]].username}</TableRowColumn>
            <TableRowColumn>{allUsers[Object.keys(allUsers)[i]].email}</TableRowColumn>
            <TableRowColumn>
              <select
                onChange={ this.changeRole }
                defaultValue={ allUsers[Object.keys(allUsers)[i]].role }
                name={ Object.keys(allUsers)[i] }
              >
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
              </select>
            </TableRowColumn>
            <TableRowColumn>
              <Popup
                user={ allUsers[Object.keys(allUsers)[i]].username }
                uid={ Object.keys(allUsers)[i] }
              />
            </TableRowColumn>
          </TableRow>
        );
      }
    }
    return (
      <div>
        <Table
          allRowsSelected={ false }
        >
          <TableHeader
            adjustForCheckbox={ false }
            displaySelectAll={ false }
          >
            <TableRow>
              <TableHeaderColumn> No. </TableHeaderColumn>
              <TableHeaderColumn> User name </TableHeaderColumn>
              <TableHeaderColumn> User mail </TableHeaderColumn>
              <TableHeaderColumn> Role </TableHeaderColumn>
              <TableHeaderColumn> Delate user </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={ false }
          >
            { allUsers ? tableRow : ''}
          </TableBody>
        </Table>
      </div>
    );
  }
}
