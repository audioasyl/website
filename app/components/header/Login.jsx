import React from 'react';

export default class Login extends React.Component {
  logOut = () => {
    fetch('/logout', { method: 'DELETE', credentials: 'same-origin' })
      .then(() => {
        localStorage.removeItem('token');
        window.location.reload();
      });
  }

  render() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
      <div className="Login">
        {isLoggedIn
          ? <button className="Header-nav-item" onClick={this.logOut}>Log Out</button>
          : <a className="Header-nav-item" href="/auth/facebook">LOG IN</a>
        }
      </div>
    );
  }
}
