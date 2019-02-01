/* eslint-disable */
import {
  getNodeAtPath,
  checkRecursivelyForDirectoryBeforeLastNode,
  sendLsSuccess,
  sendLsInvalidPathError,
  sendLsNotADirectoryError,
  sendPwdSuccess
} from './util/util';


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
  // console.log(option);
  if (option && option.length > 0) {
    const tempPath = option.split('/');
    if (tempPath[tempPath.length - 1].length === 0) {
      tempPath.pop(); //handle trailing slash
    }
    let absolutePath = [];
    if (tempPath[0] === '~' || tempPath[0].length === 0) {
      absolutePath = [...tempPath];
      absolutePath.shift();
    } else {
      absolutePath = [...path, ...tempPath];
    }
    // console.log(absolutePath);
    if (checkRecursivelyForDirectoryBeforeLastNode(absolutePath, data)) {
      const ans = getNodeAtPath(absolutePath, data);
      if (!ans) {
        return sendLsInvalidPathError(pwd(absolutePath).data)
      }
      if (ans.type === 'directory') {
        return sendLsSuccess(ans.value);
      }
      return sendLsNotADirectoryError(pwd(absolutePath).data)
    } else {
      return sendLsInvalidPathError(pwd(path).data)
    }
  } else {
    const ans = getNodeAtPath(path, data);
    if (!ans) {
      return sendLsInvalidPathError(pwd(absolutePath).data)
    }
    if (ans.type === 'directory') {
      return sendLsSuccess(ans.value);
    }
    return sendLsNotADirectoryError(pwd(path).data)
  }

}


export const pwd = (path) => {
  return sendPwdSuccess(`~/${path.join('/')}`);
}

export const help = () => {
  return {
    data: 'User Needs Help',
    success: true,
    type: 'HELP',
  };
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
    const tempPath = option.split('/');
    if (tempPath[tempPath.length - 1].length === 0) {
      tempPath.pop(); //handle trailing slash
    }
    let absolutePath = [];
    if (tempPath[0] === '~' || tempPath[0].length === 0) {
      absolutePath = [...tempPath];
      absolutePath.shift();
    } else {
      absolutePath = [...path, ...tempPath];
    }

    if (checkRecursivelyForDirectoryBeforeLastNode(absolutePath, data)) {
      // console.log(absolutePath);
      const ans = getNodeAtPath(absolutePath, data);
      // console.log(ans);
      if (!ans) {
        return {
          data: pwd(absolutePath).data,
          code: 'INVALID_PATH',
          success: false,
          type: 'CAT',
        };
      }
      if (ans.type !== 'directory') {
        return {
          data: ans.value,
          success: true,
          type: 'CAT',
        };
      }
      return {
        data: pwd(absolutePath).data,
        code: 'IS_DIRECTORY',
        success: false,
        type: 'CAT',
      };
    } else {
      return {
        data: pwd(path).data,
        code: 'INVALID_PATH',
        success: false,
        type: 'CAT',
      };
    }
  } else {
    return {
      data: pwd(path).data,
      code: 'PATH_REQUIRED',
      success: false,
      type: 'CAT',
    };
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

