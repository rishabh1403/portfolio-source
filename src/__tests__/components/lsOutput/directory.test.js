import React from 'react';
import { shallow } from 'enzyme';
import Directory from '../../../components/lsOutput/Directory';

describe('<Directory />', () => {
  const props = {};
  beforeEach(() => {
    props.data = 'Test';
  });
  it('should render a `span`', () => {
    const wrapper = shallow(<Directory {...props} />);
    expect(wrapper.find('span').length).toBe(1);
  });
  describe('rendered span', () => {
    it('should have same text as passed props', () => {
      const wrapper = shallow(<Directory {...props} />);
      expect(wrapper.find('span').text()).toBe(props.data);
    });
  });
});
