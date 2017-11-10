import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { getAllUsers } from 'actions/admin';

@connect(state => ({
  allUsers: state.admin.get('getAllUsersSuccess'),
}))
export default class Users extends Component {
  static propTypes = {
    userRequest: PropTypes.string,
    allUsers: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.allUsers);
    console.log(this.props.allUsers);
    console.log(nextProps.allUsers === this.props.allUsers);

    const { dispatch, allUsers } = this.props;
    if (nextProps.userRequest === 'userMenagment') {
      if (nextProps.allUsers === allUsers) {
        dispatch(getAllUsers());
      }
    }
  }


  render() {
    const { allUsers } = this.props;
    const tableRow = [];
    if (allUsers) {
      // console.log(allUsers);
      // console.log(Object.keys(allUsers));
      for (let i = 0; i < Object.keys(allUsers).length; i++) {
        tableRow.push(
          <TableRow key={ i }>
            <TableRowColumn> { i + 1 }</TableRowColumn>
            <TableRowColumn>{allUsers[Object.keys(allUsers)[i]].username}</TableRowColumn>
            <TableRowColumn>{allUsers[Object.keys(allUsers)[i]].email}</TableRowColumn>
            <TableRowColumn>
              <select>
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
              </select>
            </TableRowColumn>
            <TableRowColumn>
              <button> delate</button>
            </TableRowColumn>
          </TableRow>
        );
      }
    }
    return (
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
    );
  }
}
