import { pwd } from '../../commands';

describe('Testing pwd command', () => {
  // it.each([
  //   [[], { success: true }],
  //   [[], { success: true }],
  //   [[], { success: true }],
  //   [[], { success: true }]])('Testing it', (a, ex) => {
  //     expect(pwd(a)).toBeTruthy();
  //   });

  it('should be defined', () => {
    expect(pwd).toBeDefined();
  });
  it('should return an object with success true', () => {
    const path = [];
    expect(pwd(path).success).toBeTruthy();
  });
  it('should return an object with type pwd', () => {
    const path = [];
    expect(pwd(path).type).toBe('PWD');
  });
  it('should return ~/ for root path', () => {
    const path = [];
    expect(pwd(path).data).toBe('~/');
  });
  it('should join path array to give complete path', () => {
    const path = ['about'];
    expect(pwd(path).data).toBe('~/about');
  });
});
