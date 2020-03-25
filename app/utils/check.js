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

module.exports = {
  isEmail,
  isEmptyString
};
