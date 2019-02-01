const sendResponse = success => type => code => data => ({
  success,
  type,
  code,
  data,
});

const sendError = sendResponse(false);
const sendSuccess = sendResponse(true);

// ls curry
const sendLsError = sendError('LIST');
export const sendLsInvalidPathError = sendLsError('INVALID_PATH');
export const sendLsNotADirectoryError = sendLsError('NOT_A_DIRECTORY');
export const sendLsSuccess = sendSuccess('LIST')();

// pwd curry
export const sendPwdSuccess = sendSuccess('PWD')();

// help curry
export const sendHelpSuccess = sendSuccess('HELP')();

// cat curry :P
const sendCatError = sendError('CAT');
export const sendCatInvalidPathError = sendCatError('INVALID_PATH');
export const sendCatIsDirectoryError = sendCatError('IS_DIRECTORY');
export const sendCatPathRequiredError = sendCatError('PATH_REQUIRED');
export const sendCatSuccess = sendSuccess('CAT')();

export const getNodeAtPath = (path, obj) => path.reduce((acc, el) => acc.value[el], obj);

export const checkIfEveryNodeIsDirectoryExceptLastNode = (path, obj) => {
  let { ...tempObj } = obj;
  if (path.length <= 1) {
    return true;
  }
  const tempPath = [...path];
  tempPath.pop();
  return tempPath.every((el) => {
    tempObj = tempObj.value[el];
    return tempObj && tempObj.type === 'directory';
  });
};

export const getRecommendation = (name, data, path) => {
  let tempObj = { ...data };
  tempObj = path.reduce((acc, el) => acc.value[el], tempObj);
  if (typeof tempObj.value === 'object') {
    return Object.keys(tempObj.value).filter(el => el.startsWith(name));
  }
  return [];
};

export const lsLastNodeInPath = (path, data, pwd) => {
  const lastNode = getNodeAtPath(path, data);
  if (!lastNode) {
    return sendLsInvalidPathError(pwd(path).data);
  }
  if (lastNode.type === 'directory') {
    return sendLsSuccess(lastNode.value);
  }
  return sendLsNotADirectoryError(pwd(path).data);
};

export const catLastNodeInPath = (path, data, pwd) => {
  const ans = getNodeAtPath(path, data);
  if (!ans) {
    return sendCatInvalidPathError(pwd(path).data);
  }
  if (ans.type !== 'directory') {
    return sendCatSuccess(ans.value);
  }
  return sendCatIsDirectoryError(pwd(path).data);
};

export const getAbsolutePath = (option, path) => {
  const tempPath = option.split('/');
  if (tempPath[tempPath.length - 1].length === 0) {
    tempPath.pop(); // handle trailing slash
  }
  let absolutePath = [];
  if (tempPath[0] === '~' || tempPath[0].length === 0) {
    absolutePath = [...tempPath];
    absolutePath.shift();
  } else {
    absolutePath = [...path, ...tempPath];
  }
  return absolutePath;
};
