import obj from '../../util/data';

describe('Data for application', () => {
  const DIRECTORY = 'directory';
  it('should be defined', () => {
    expect(obj).toBeDefined();
  });
  it('should have a type property with value equal to directory', () => {
    expect(obj.type).toBeDefined();
    expect(obj.type).toBe(DIRECTORY);
  });
  it('should have a value property defined', () => {
    expect(obj.value).toBeDefined();
  });
  describe('the value property', () => {
    const { value } = obj;
    it('should have two properties', () => {
      expect(Object.keys(value).length).toBe(2);
    });
  });
});
