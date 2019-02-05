/* eslint-disable */
import {
  getNodeAtPath,
  checkIfEveryNodeIsDirectoryExceptLastNode,
  sendLsSuccess,
  sendLsInvalidPathError,
  sendLsNotADirectoryError,
  sendPwdSuccess,
  sendHelpSuccess,
  sendCatInvalidPathError,
  sendCatIsDirectoryError,
  sendCatPathRequiredError,
  sendCatSuccess,
  getAbsolutePath,
  lsLastNodeInPath,
  catLastNodeInPath,
  not,
  noArgs,
} from './util/util';

export const pwd = (path) => sendPwdSuccess(`~/${path.join('/')}`);

export const help = () => sendHelpSuccess('User Needs Help');

export const ls = (path, data, option) => {

  if (noArgs(option)) {
    return lsLastNodeInPath(path, data, pwd);
  }
  const absolutePath = getAbsolutePath(option, path);
  if (not(checkIfEveryNodeIsDirectoryExceptLastNode(absolutePath, data))) {
    return sendLsInvalidPathError(pwd(absolutePath).data)
  } else {
    return lsLastNodeInPath(absolutePath, data, pwd);
  }

}

export const cat = (path, data, option) => {

  if (noArgs(option)) {
    return sendCatPathRequiredError(pwd(path).data)
  }
  const absolutePath = getAbsolutePath(option, path);
  if (not(checkIfEveryNodeIsDirectoryExceptLastNode(absolutePath, data))) {
    return sendCatInvalidPathError(pwd(absolutePath).data);
  }
  return catLastNodeInPath(absolutePath, data, pwd);

}

export const cd = (name, path, previousPath, data) => {
  // handle for no args
  if (!name || name.length === 0) {
    previousPath = JSON.parse(JSON.stringify(path));
    path = [];
    return {
      previousPath,
      path,
    };
  }
  // handle for '-' 
  if (name === '-') {
    const temp = JSON.parse(JSON.stringify(previousPath));
    previousPath = JSON.parse(JSON.stringify(path));
    path = JSON.parse(JSON.stringify(temp));
    console.log(previousPath);
    console.log(path);
    return {
      data: `~/${path.join('/')}`,
      success: true,
      type: 'PWD',
      previousPath,
      path,
    };
  }
  // get rid of this
  if (name === '..') {
    previousPath = JSON.parse(JSON.stringify(path));
    path.pop();
    return {
      previousPath,
      path,
    };
  }

  const cdPath = name.split('/');
  // console.log(cdPath);
  let ans = [];
  if (cdPath[cdPath.length - 1] && cdPath[cdPath.length - 1].length > 0) {
    ans = [...path, ...cdPath];
  } else {
    cdPath.pop();
    ans = [...path, ...cdPath];
  }
  // console.log(ans);
  let tempObj = JSON.parse(JSON.stringify(data));
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
      path.push(i);
    }
  }
  /*
  if (name === '..') {
    this.previousPath = JSON.parse(JSON.stringify(this.path));
    this.path.pop();
  } else if (name === '.') {
    // directory remains unchanged
  } else if (name === '-') {
    const temp = JSON.parse(JSON.stringify(this.previousPath));
    this.previousPath = JSON.parse(JSON.stringify(this.path));
    this.path = JSON.parse(JSON.stringify(temp));
  } else {
    this.previousPath = JSON.parse(JSON.stringify(this.path));
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
  return {
    previousPath,
    path,
  };


}

