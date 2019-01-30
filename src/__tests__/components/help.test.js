import React from 'react';
import { shallow } from 'enzyme';
import Help from '../../components/Help';

describe('<Help />', () => {
  it('should render two help comands', () => {
    const wrapper = shallow(<Help />);
    expect(wrapper.find('code').length).toBe(2);
  });
  it('should not repeat help commands', () => {
    const wrapper = shallow(<Help />);
    const commands = wrapper.find('code').map(el => el.text());
    const distinctCommands = [...new Set(commands)];
    expect(commands.length).toEqual(distinctCommands.length);
  });
});
