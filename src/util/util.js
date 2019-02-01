export const getNodeAtPath = (path, obj) => path.reduce((acc, el) => acc.value[el], obj);

export const checkRecursivelyForDirectoryBeforeLastNode = (path, obj) => {
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
