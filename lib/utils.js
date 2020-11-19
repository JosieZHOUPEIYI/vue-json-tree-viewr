export const debounce = function (func, wait) {
  let startTime = Date.now();
  let timer;
  return (...args) => {
    if (Date.now() - startTime < wait && timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, wait);
    startTime = Date.now();
  }
}

export const isJsonString = function(str) {
  if (typeof str == "string") {
    try {
      const obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return obj;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }else{
    return false;
  }
}


