import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListLs from './ListLs';
import Help from './components/Help';
import Pwd from './components/Pwd';

const renderCommandOutput = (type, data) => {
  if (type === 'LIST') {
    return <ListLs data={data} />;
  }
  if (type === 'HELP') {
    return <Help />;
  }
  if (type === 'PWD') {
    return <Pwd data={data.data} />;
  }
  return null;
};

class Message extends PureComponent {
  render() {
    const { command } = this.props;
    return (
      <div>
        <span className="shell">
          <b>
            {`${command[2]} `}
            $ &gt;
          </b>
        </span>
        <span>
          {command[1]}
        </span>
        {renderCommandOutput(command[0].type, command[0])}
      </div>
    );
  }
}

Message.propTypes = {
  command: PropTypes.shape().isRequired,
};

export default Message;
