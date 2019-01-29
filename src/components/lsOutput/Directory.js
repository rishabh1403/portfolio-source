import React from 'react';
import PropTypes from 'prop-types';

const Directory = ({ data }) => (
  <span className="directory-name">
    {data}
  </span>
);

Directory.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Directory;
