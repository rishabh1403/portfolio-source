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
  catLastNodeInPath
} from './util/util';

export const pwd = (path) => {
  return sendPwdSuccess(`~/${path.join('/')}`);
}

export const ls = (path, data, option) => {
  /*
  if options length < 0
    send single query result with path
  if option has length
    split option by /
    if last value is "" , pop it [ handle trailing slash]
    if it starts with "" or ~ [ user wanted absolute url]
        it becomes absolute url
      else
          push it to path
      checkifallaredirectoryin path
        yes get node and display
        no throw error
*/
  if (option && option.length > 0) {
    const absolutePath = getAbsolutePath(option, path);
    if (checkIfEveryNodeIsDirectoryExceptLastNode(absolutePath, data)) {
      return lsLastNodeInPath(absolutePath, data, pwd);
    } else {
      return sendLsInvalidPathError(pwd(absolutePath).data)
    }
  } else {
    return lsLastNodeInPath(path, data, pwd);
  }

}




export const help = () => {
  return sendHelpSuccess('User Needs Help');
}

export const cat = (path, data, option) => {

  /*
  if options length <= 0
     error . cat require a mouse to eat [ an argument to display results]
   if option has length
     split option by /
     if last value is "" , pop it [ handle trailing slash]
     if it starts with "" or ~ [ user wanted absolute url]
         it becomes absolute url
       else
           push it to path
       checkifallaredirectoryin path
         yes get node and display
         no throw error
*/
  if (option && option.length > 0) {
    const absolutePath = getAbsolutePath(option, path);
    if (checkIfEveryNodeIsDirectoryExceptLastNode(absolutePath, data)) {
      return catLastNodeInPath(absolutePath, data, pwd);
    } else {
      return sendCatInvalidPathError(pwd(path).data);
    }
  } else {
    return sendCatPathRequiredError(pwd(path).data)
  }
}

export const cd = (name, path, prevPath, data) => {
  // handle for no args
  if (!name || name.length === 0) {
    prevPath = JSON.parse(JSON.stringify(path));
    path = [];
    return {
      prevPath,
      path,
    };
  }
  // handle for '-' 
  if (name === '-') {
    const temp = JSON.parse(JSON.stringify(prevPath));
    prevPath = JSON.parse(JSON.stringify(path));
    path = JSON.parse(JSON.stringify(temp));
    return {
      data: `~/${path.join('/')}`,
      success: true,
      type: 'PWD',
      prevPath,
      path,
    };
  }
  // get rid of this
  if (name === '..') {
    prevPath = JSON.parse(JSON.stringify(path));
    path.pop();
    return {
      prevPath,
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
  return {
    prevPath,
    path,
  };


}

