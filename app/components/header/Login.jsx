import React from 'react';
import { getCookies } from '../../utils';

export default class Login extends React.Component {
  logOut = () =>
    fetch('/logout', { method: 'DELETE' })

  render() {
    const cookies = getCookies();
    return (
      <div>
        {cookies['connect.sid']
          ? <button onClick={this.logOut}>Log Out</button>
          : <a href="/auth/facebook">LOG IN</a>
        }
      </div>
    );
  }
}
