import React, { PropTypes } from 'react';
import { omit, size } from 'lodash';
import classNames from 'classnames';
import Header from './header/Header';

import './Contact.scss';
export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
      subject: '',
      message: '',
    };
  }

  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  });

  onEmailChange = e => {
    e.preventDefault();
    this.setState({ email: e.target.value, errors: omit(this.state.errors, 'email') });
  }

  onSubjectChange = e => {
    e.preventDefault();
    this.setState({ subject: e.target.value, errors: omit(this.state.errors, 'subject') });
  }

  onMessageChange = e => {
    e.preventDefault();
    this.setState({ message: e.target.value, errors: omit(this.state.errors, 'message') });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = {};

    if (!this.state.email) {
      errors.email = 'Email is required!';
    } else {
      this.validateEmail(e);
    }

    if (!this.state.subject) {
      errors.subject = 'Subject is required!';
    }

    if (!this.state.message) {
      errors.message = 'Message is required!';
    }

    this.setState({ errors: { ...this.state.errors, ...errors } });

    if (size(errors)) {
      return;
    }

    console.log('email sent', this.state);
  }

  validateEmail = e => {
    e.preventDefault();

    if (!this.state.email) {
      return;
    }

    const errors = this.state.errors;
    if (!EMAIL_REGEX.test(this.state.email)) {
      this.setState({ errors: { ...errors, email: 'Email is invalid!' } });
    } else {
      this.setState({ errors: omit(errors, 'email') });
    }
  }

  render() {
    const {
      subject: subjectErr,
      message: mesgErr,
      email: emailErr,
    } = this.state.errors;

    return (
      <div className="Contact">
        <Header />
        <form onSubmit={this.onSubmit} className="Contact-form">
          <input
            type="text"
            placeholder="E-mail"
            value={this.state.email}
            onBlur={this.validateEmail}
            onChange={this.onEmailChange}
            className={classNames(
              'Contact-form-input',
              { 'Contact-form-input--placeholder': !this.state.email },
              { 'Contact-form-input--error': !!emailErr }
            )}
          />
          {emailErr && <div className="Contact-form-error-mesg">{emailErr}</div>}
          <input
            type="text"
            placeholder="Subject"
            value={this.state.subject}
            onChange={this.onSubjectChange}
            className={classNames(
              'Contact-form-input',
              { 'Contact-form-input--placeholder': !this.state.subject },
              { 'Contact-form-input--error': !!subjectErr }
            )}
          />
          {subjectErr && <div className="Contact-form-error-mesg">{subjectErr}</div>}
          <textarea
            placeholder="Message"
            value={this.state.message}
            onChange={this.onMessageChange}
            className={classNames(
              'Contact-form-input',
              { 'Contact-form-input--placeholder': !this.state.message },
              { 'Contact-form-input--error': !!mesgErr }
            )}
          />
          {mesgErr && <div className="Contact-form-error-mesg">{mesgErr}</div>}
          <button
            className="Contact-form-submit"
            type="submit"
          >
            GO
          </button>
        </form>
        <div />
      </div>
    );
  }
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Contact.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

Contact.childContextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};
