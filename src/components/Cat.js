import React from 'react';
import PropTypes from 'prop-types';

const Cat = ({ data }) => (
  <div>
    {data}
  </div>
);

Cat.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Cat;
