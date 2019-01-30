import React from 'react';
import { shallow } from 'enzyme';
import File from '../../../components/lsOutput/File';

describe('<File />', () => {
  const props = {};
  beforeEach(() => {
    props.data = 'Test';
  });
  it('should render a `span`', () => {
    const wrapper = shallow(<File {...props} />);
    expect(wrapper.find('span').length).toBe(1);
  });
  describe('rendered span', () => {
    it('should have same text as passed props', () => {
      const wrapper = shallow(<File {...props} />);
      expect(wrapper.find('span').text()).toBe(props.data);
    });
  });
});
