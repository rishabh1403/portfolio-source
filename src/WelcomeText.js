import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <React.Fragment>
        <div>Type <code>ls</code> to list contents of directory</div>
        <div>Type <code>cd {`directory name`}</code> to change directory</div>
      </React.Fragment>
    );
  }
}

