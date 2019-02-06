import React from 'react';
import PropTypes from 'prop-types';

const OuterLinks = ({ data, contents }) => {
  if (contents.email) {
    return (
      <span className="link-name">
        <a href={`mailto:${contents.value}`}>{data}</a>
      </span>
    );
  }
  return (
    <span className="link-name">
      <a href={contents.value}>{data}</a>
    </span>
  );
};

OuterLinks.propTypes = {
  data: PropTypes.string.isRequired,
  contents: PropTypes.shape().isRequired,
};

export default OuterLinks;
