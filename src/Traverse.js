/* eslint-disable */

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

  getRecommendation(name){
    let tempObj = JSON.parse(JSON.stringify(this.home));
    for(let i of this.path){
      tempObj = tempObj.value[i];
    }
    if(typeof tempObj.value === 'object'){
      return Object.keys(tempObj.value).filter(el => el.startsWith(name));
    }
    return [];
    
  }
  cat(name) {
    if (!name) {
      return {
        data: this.pwd().data,
        code: 'PATH_REQUIRED',
        success: false,
        type: 'CAT',
      };
    }
    let newName = name.split('/');
    let newPath = [...this.path, ...newName];
    let tempObj = JSON.parse(JSON.stringify(this.home));
    for (let i of newPath) {
      tempObj = tempObj.value[i];
      if (!tempObj) {
        return {
          data: name,
          code: 'INVALID_PATH',
          success: false,
          type: 'CAT',
        };
      }
    }
    if (tempObj.type === 'directory') {
      return {
        data: name,
        code: 'NOT_A_FILE',
        success: false,
        type: 'CAT',
      };
    }
    // console.log(tempObj);
    return {
      data: tempObj.value,
      success: true,
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
    if (!name || name.length === 0) {
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path = [];
      return {};
    }
    if (name === '-') {
      const temp = JSON.parse(JSON.stringify(this.prevPath));
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path = JSON.parse(JSON.stringify(temp));
      return {
        data: `~/${this.path.join('/')}`,
        success: true,
        type: 'PWD',
      };
    }

    if (name === '..') {
      this.prevPath = JSON.parse(JSON.stringify(this.path));
      this.path.pop();
      return {};
    }

    const cdPath = name.split('/');
    // console.log(cdPath);
    let ans = [];
    if (cdPath[cdPath.length - 1] && cdPath[cdPath.length - 1].length > 0) {
      ans = [...this.path, ...cdPath];
    } else {
      cdPath.pop();
      ans = [...this.path, ...cdPath];
    }
    // console.log(ans);
    let tempObj = JSON.parse(JSON.stringify(this.home));
    let prevObj = [];
    // eslint-disable-next-line
    for (let i of ans) {
      if (i === '-') {
        console.log("minus in between path")
        return {};
      }
      if (i === '.') {
        return {};
      }
      if (i === '..') {
        console.log("not supported")
        return {};
        // console.log("coming here");
        // tempObj = prevObj.pop();
        // console.log(tempObj);
      }
      // prevObj.push({ ...tempObj });
      tempObj = tempObj.value[i];
      if (!tempObj) {
        console.log("Invalid Path", name);
        return {};
      }
      if (tempObj.type === 'file') {
        console.log("cant go in file", name);
        return {};
      }


    }
    // ans = ans.filter(el => el !== '.')
    // if (ans.length === 1 && ans[0] === '..') {
    //   this.path.pop();
    //   return {};
    // }
    // let modifiedAns = [];
    // for (let i = 1; i < ans.length; i += 1) {
    //   if(ans[i] !== '..' && ans[i-1] !==)
    // }

    for (let i of ans) {
      if (i !== '.' && i !== '..') {
        this.path.push(i);
      }
    }
    /*
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
      let newName = name;
      newName = newName.split('/');
      const ans = [...this.path, ...newName];
      let tempObj = JSON.parse(JSON.stringify(this.home));
      // eslint-disable-next-line
      for (let i of ans) {
        tempObj = tempObj.value[i];
      }
      if (tempObj.type === 'file') {
        // console.log('cant cd to file');
      } else {
        this.path = [...this.path, ...newName];
      }
    }
    */
    return {};


  }
}

export default Traverse;
