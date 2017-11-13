import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { deleteUser } from 'actions/admin';

@connect()
export default class Popup extends Component {
  static propTypes = {
    user: PropTypes.string,
    uid: PropTypes.string,
    dispatch: PropTypes.func,
  }
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleConfirm() {
    const { dispatch } = this.props;
    dispatch(deleteUser(this.props.uid));
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label='JOK...'
        primary={ true }
        onClick={ this.handleClose }
      />,
      <FlatButton
        label='BRISI!'
        primary={ true }
        onClick={ this.handleConfirm }
      />,
    ];

    return (
      <div>
        <RaisedButton label='Delete' onClick={ this.handleOpen } />
        <Dialog
          title='MA JESI LI SIGURAN?'
          actions={ actions }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
        >
          Da li ste sigurni da zelite da obrisete { this.props.user }a iz datoteke
        </Dialog>
      </div>
    );
  }
}
