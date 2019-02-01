import React from 'react';
import PropTypes from 'prop-types';

const ShellPrompt = ({ path }) => (
  <span className="shell">
    <b>
      {`${path} `}
      $ &gt;
    </b>
  </span>
);

ShellPrompt.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ShellPrompt;
