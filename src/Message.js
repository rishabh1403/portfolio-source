import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ListLs from './ListLs';
import Help from './components/Help';
import Pwd from './components/Pwd';
import Cat from './components/Cat';
import Error from './Error';

const renderCommandOutput = (success, type, data) => {
  if (!success) {
    return <Error data={data} />;
  }
  if (type === 'LIST') {
    return <ListLs data={data} />;
  }
  if (type === 'HELP') {
    return <Help />;
  }
  if (type === 'PWD') {
    return <Pwd data={data.data} />;
  }
  if (type === 'CAT') {
    return <Cat data={data.data} />;
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
        {renderCommandOutput(command[0].success, command[0].type, command[0])}
      </div>
    );
  }
}

Message.propTypes = {
  command: PropTypes.instanceOf(Array).isRequired,
};

export default Message;
