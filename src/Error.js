import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ data }) => {
  if (data.type === 'LIST') {
    if (data.code === 'NOT_A_DIRECTORY') {
      return (
        <div className="error-msg">
          <code>
            {data.data}
          </code>
          :- is not directory, try using
          <code>
            cat &lt;file name&gt;
          </code>
          to view the contents
        </div>
      );
    }
    if (data.code === 'INVALID_PATH') {
      return (
        <div className="error-msg">
          <code>
            {data.data}
          </code>
          :- is not a valid path for a directory
        </div>
      );
    }
  }
  if (data.type === 'CAT') {
    if (data.code === 'IS_DIRECTORY') {
      return (
        <div className="error-msg">
          <code>
            {data.data}
          </code>
          :- is directory, try using
          <code>
            ls
          </code>
          inside the directory to view contents
        </div>
      );
    }
    if (data.code === 'PATH_REQUIRED') {
      return (
        <div className="error-msg">
          <code>
            cat
          </code>
          command requires a file name to read the content
          <code>
            cat &lt;file name&gt;
          </code>
        </div>
      );
    }
    if (data.code === 'INVALID_PATH') {
      return (
        <div className="error-msg">
          <code>
            {data.data}
          </code>
          is an invalid path
        </div>
      );
    }
  }
  return null;
};

Error.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Error;
