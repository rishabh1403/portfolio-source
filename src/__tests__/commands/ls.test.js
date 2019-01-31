import { ls } from '../../Traverse';
import obj from '../../util/data';

describe('Testing `ls` command', () => {
  let path = [];
  let arg = '~';
  const data = obj;

  beforeEach(() => {
    path = [];
    arg = '~';
  });

  it('should be defined', () => {
    expect(ls).toBeDefined();
  });
  it('should accept optional path and do recusive lookup', () => {
    expect(ls(path, data, arg)).toBeDefined();
  });
  describe('Testing without path', () => {
    it('should return success for root path', () => {
      expect(ls(path, data).success).toBeTruthy();
    });
    it('should have a type property with value `list`', () => {
      expect(ls(path, data).type).toBe('LIST');
    });
    it('should have a data property', () => {
      expect(ls(path, data).data).toBeDefined();
    });
    it('should work when no arguments are provided', () => {
      expect(ls(path, data).success).toBeDefined();
    });
    it('should list root when no arguments are provided', () => {
      expect(Object.keys(ls(path, data).data)).toHaveLength(2);
    });
  });
  describe('Testing with absolute urls', () => {
    it('should treat ~ as home', () => {
      expect(Object.keys(ls(path, data).data)).toHaveLength(2);
    });
    it('should treat / as home', () => {
      arg = '/';
      expect(Object.keys(ls(path, data).data)).toHaveLength(2);
    });
    it('should do recursive lookup with / as prefix', () => {
      arg = '/about';
      const res = ls(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should handle trailing slash', () => {
      arg = '/about/';
      const res = ls(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should do recursive lookup with / as prefix', () => {
      arg = '~/about';
      const res = ls(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should treat / as home', () => {
      arg = '~/about/';
      const res = ls(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should throw error when path is a file', () => {
      arg = '/about/info.txt';
      const res = ls(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('NOT_A_DIRECTORY');
    });
    it('should throw error when path is invalid', () => {
      arg = '/abo';
      const res = ls(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
    it('should throw error when path is invalid recursively', () => {
      arg = '/about/in';
      const res = ls(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
  });
  describe('Testing relative urls', () => {
    it('should do recursive lookup with / as prefix', () => {
      arg = 'about';
      const res = ls(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should handle trailing slash', () => {
      arg = 'about/';
      const res = ls(path, data, arg);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should handle recursive path inside root', () => {
      path = ['about'];
      const res = ls(path, data);
      expect(res.success).toBeTruthy();
      expect(Object.keys(res.data)).toHaveLength(1);
    });
    it('should throw error when path is a file', () => {
      arg = 'info.txt';
      path = ['about'];
      const res = ls(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('NOT_A_DIRECTORY');
    });
    it('should throw error when path is invalid', () => {
      path = ['about'];
      arg = 'abo';
      const res = ls(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
    it('should throw error when path is invalid recursively', () => {
      path = ['about'];
      arg = 'about/in';
      const res = ls(path, data, arg);
      expect(res.success).toBeFalsy();
      expect(res.code).toBe('INVALID_PATH');
    });
  });
});
