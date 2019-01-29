import React from 'react';
import PropTypes from 'prop-types';

const File = ({ data }) => (
  <span className="file-name">
    {data}
  </span>
);

File.propTypes = {
  data: PropTypes.string.isRequired,
};

export default File;
