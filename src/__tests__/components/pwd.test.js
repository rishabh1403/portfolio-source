import React from 'react';
import { shallow } from 'enzyme';
import Pwd from '../../components/Pwd';

describe('<Pwd />', () => {
  const props = {};
  beforeEach(() => {
    props.data = 'Test';
  });
  it('should render a `Div`', () => {
    const wrapper = shallow(<Pwd {...props} />);
    expect(wrapper.find('div').length).toBe(1);
  });
  describe('rendered div', () => {
    it('should have same text as passed props', () => {
      const wrapper = shallow(<Pwd {...props} />);
      expect(wrapper.find('div').text()).toBe(props.data);
    });
  });
});
