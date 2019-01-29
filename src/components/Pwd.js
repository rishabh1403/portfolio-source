import React from 'react';
import PropTypes from 'prop-types';

const Pwd = ({ data }) => (
  <div>
    {data}
  </div>
);

Pwd.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Pwd;
