import obj from './util/data';

const getNodeAtPath = path => path.reduce((acc, el) => obj.value[el], obj);

class Traverse {
  constructor() {
    this.home = obj;
    this.prevPath = [];
    this.path = [];
  }

  ls() {
    const ans = getNodeAtPath(this.path);
    if (ans.type === 'directory') {
      return {
        data: ans.value,
        success: true,
        type: 'LIST',
      };
    }
    return {
      data: this.pwd().data,
      code: 'NOT_A_DIRECTORY',
      success: false,
      type: 'LIST',
    };
  }

  cat() {
    const ans = getNodeAtPath(this.path);
    if (ans.type === 'file') {
      return {
        data: ans.value,
        success: true,
        type: 'CAT',
      };
    }
    return {
      data: this.pwd().data,
      code: 'NOT_A_FILE',
      success: false,
      type: 'CAT',
    };
  }

  pwd() {
    return {
      data: `~/${this.path.join('/')}`,
      success: true,
      type: 'PWD',
    };
  }

  cd(name) {
    if (name === '..') {
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path.pop();
    } else if (name === '.') {
      // directory remains unchanged
    } else if (name === '-') {
      const temp = JSON.parse(JSON.stringify(this.prevPath));
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path = JSON.parse(JSON.stringify(temp));
    } else {
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      name = name.split('/');
      let ans = [...this.path, ...name];
      let tempObj = JSON.parse(JSON.stringify(this.home))
      for (let i of ans) {
        tempObj = tempObj.value[i];
      }
      if (tempObj.type === 'file') {
        console.log('cant cd to file');
      } else {
        this.path = [...this.path, ...name]
      }
    }
    return {};
  }

}

export default Traverse;
