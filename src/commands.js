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
  match,
  sendCdInvalidPathError,
  checkIfEveryNodeIsDirectory,
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
  if (noArgs(name)) {
    previousPath = [...path];
    path = [];
    return {
      previousPath,
      path,
    };
  }
  const isPath = match(name);
  if (isPath('-')) {
    const temp = [...previousPath];
    previousPath = [...path];
    path = [...temp];
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
  if (isPath('..')) {
    previousPath = [...path];
    path.pop();
    return {
      previousPath,
      path,
    };
  }

  if (isPath('.')) {
    return {
      previousPath,
      path,
    };
  }

  const absolutePath = getAbsolutePath(name, path);
  if (not(checkIfEveryNodeIsDirectory(absolutePath, data))) {
    return { ...sendCdInvalidPathError(pwd(absolutePath).data), previousPath, path };
  }
  return {
    previousPath: [...path],
    path: absolutePath,
  };







}

