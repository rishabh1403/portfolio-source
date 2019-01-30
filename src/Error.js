import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ data }) => {
  if (data.code === 'NOT_A_FILE') {
    return (
      <div className="error-msg">This cannot be a dat {data.data}</div>
    );
  }
  return null;
};

Error.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Error;
