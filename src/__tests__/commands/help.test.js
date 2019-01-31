import { help } from '../../Traverse';

describe('Testing help command', () => {
  it('should be defined', () => {
    expect(help).toBeDefined();
  });
  it('should return an object with success true', () => {
    expect(help().success).toBeTruthy();
  });
  it('should return an object with type Help', () => {
    expect(help().type).toBe('HELP');
  });
});
