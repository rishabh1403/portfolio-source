import { cat } from '../../commands';
import obj from '../../util/data';

describe('Testing `cat` command', () => {
  let path = [];
  let arg = '~';
  const data = obj;

  beforeEach(() => {
    path = [];
    arg = '~';
  });

  it('should be defined', () => {
    expect(cat).toBeDefined();
  });
  it('should throw error if file to view is missing', () => {
    const res = cat(path, data);
    expect(res.success).toBeFalsy();
    expect(res.code).toBe('PATH_REQUIRED');
  });
  describe('Testing with absolute url', () => {
    it('should treat ~ as home', () => {
      arg = '~/about/info.txt';
      const res = cat(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(res.type).toBe('CAT');
      expect(res.data).toBeDefined();
    });
    it('should treat / as home', () => {
      arg = '/about/info.txt';
      const res = cat(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(res.type).toBe('CAT');
      expect(res.data).toBeDefined();
    });
    it('should handle trailing slash with /', () => {
      arg = '/about/info.txt/';
      const res = cat(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(res.type).toBe('CAT');
      expect(res.data).toBeDefined();
    });
    it('should handle trailing slash with ~', () => {
      arg = '~/about/info.txt/';
      const res = cat(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(res.type).toBe('CAT');
      expect(res.data).toBeDefined();
    });
    it('should throw error when path is not a file', () => {
      arg = '/about/';
      const res = cat(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('IS_DIRECTORY');
    });
    it('should throw error when path is invalid', () => {
      arg = '/abo';
      const res = cat(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
    it('should throw error when path is invalid recursively', () => {
      arg = '/about/in';
      const res = cat(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
  });
  describe('Testing relative url', () => {
    it('should do recursive lookup with / as prefix', () => {
      path = ['about'];
      arg = 'info.txt';
      const res = cat(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(res.data).toBeDefined();
    });
    it('should handle trailing slash', () => {
      path = ['about'];
      arg = 'info.txt/';
      const res = cat(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(res.data).toBeDefined();
    });
    it('should throw error when path is a directory', () => {
      arg = 'about';
      const res = cat(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('IS_DIRECTORY');
    });
    it('should throw error when path is invalid', () => {
      arg = 'abo';
      const res = cat(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
    it('should throw error when path is invalid recursively', () => {
      arg = 'about/in';
      const res = cat(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
  });
});
