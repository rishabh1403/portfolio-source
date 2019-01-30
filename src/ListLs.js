import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Directory from './components/lsOutput/Directory';
import File from './components/lsOutput/File';

const renderData = (data) => {
  const keys = Object.keys(data);
  return keys.reduce((acc, el) => [...acc, [el, data[el]]], []).map((el) => {
    if (el[1].type === 'directory') {
      return <Directory key={el[0]} data={`${el[0]} `} />;
    }
    return <File key={el[0]} data={`${el[0]} `} />;
  });
};

export default class ListLs extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div>
        {data && renderData(data.data)}
      </div>
    );
  }
}
ListLs.propTypes = {
  data: PropTypes.shape().isRequired,
};
