import React from 'react';
import { shallow } from 'enzyme';
import WelcomeText from '../../components/WelcomeText';

describe('<WelcomeText />', () => {
  it('should render one help comand', () => {
    const wrapper = shallow(<WelcomeText />);
    expect(wrapper.find('code').length).toBe(1);
  });
});
