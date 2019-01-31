import * as commands from '../Traverse';
import obj from '../util/data';

describe('Testing `ls`', () => {
  const path = [];
  const data = obj;
  it('should be defined', () => {
    expect(commands.ls).toBeDefined();
  });
  it('should return success for root path', () => {
    expect(commands.ls(path, data).success).toBeTruthy();
  });
  it('should have a type property with value `list`', () => {
    expect(commands.ls(path, data).type).toBe('LIST');
  });
  it('should have a data property', () => {
    expect(commands.ls(path, data).data).toBeDefined();
  });
});
