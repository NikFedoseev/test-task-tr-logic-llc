
function validatePassword(value) {
  const re = /(?=.*[0-9])(?=.*[!@#$()%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#()$%^&*]{6,}/;
  return re.test(value)
}

function validateEmail(value) {
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(value);
}

function validateUsername(value) {
  const re = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  return re.test(value);
}

function validateText(value) {
  return value ? true : false
}

function validClass(valid, el) {
  if (el.value === '') {
    el.className='';
    return;
  }
  if (valid) {
    el.className=`correct`;
  } else {
    el.className=`incorrect`
  }
  
}

function checkValidation (arr) {
  return Object.keys(arr).every((item, i) => {
    let el = document.querySelector(`input[name=${item}]`);
    switch (true) {
      case item === 'password': return validatePassword(el.value);
      case item === 'email': return validateEmail(el.value);
      case item === 'username': return validateUsername(el.value);
      default: { console.log(el.value); return validateText(el.value);}
    }
  })
}

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateText,
  validClass,
  checkValidation
}