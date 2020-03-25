function isEmail(str) {
  var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) != true) {
    return false;
  } else {
    return true;
  }
}

function isEmptyString(str) {
  return !str || str.trim().length === 0;
}

function arr2map(arr, key, arrayVal) {
  var map = {};
  key = key || "id";
  if (!arr) return map;
  arr.forEach(v => {
    if (arrayVal) {
      !map[v[key]] && (map[v[key]] = []);
      map[v[key]].push(v);
    } else {
      map[v[key]] = v;
    }
  });
  return map;
}

module.exports = {
  isEmail,
  isEmptyString,
  arr2map
};
