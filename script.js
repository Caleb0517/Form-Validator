const form = document.querySelector('#form');
const inputs = [
  { element: document.querySelector('#username'), errorMessage: 'Username cannot be blank', minLength: 3, minLengthMessage: 'Username must be at least 3 characters', maxLength: 15, maxLengthMessage: 'Username must be less than 15 characters' },
  { element: document.querySelector('#email'), errorMessage: 'Email cannot be blank', validate: isEmail, invalidMessage: 'Not a valid email', minLength: 5, minLengthMessage: 'Email must be at least 5 characters', maxLength: 50, maxLengthMessage: 'Email must be less than 50 characters' },
  { element: document.querySelector('#password'), errorMessage: 'Password cannot be blank', minLength: 6, minLengthMessage: 'Password must be at least 6 characters', maxLength: 20, maxLengthMessage: 'Password must be less than 20 characters' },
  { element: document.querySelector('#password2'), errorMessage: 'Password cannot be blank', match: document.querySelector('#password'), matchMessage: 'Passwords do not match', minLength: 6, minLengthMessage: 'Password must be at least 6 characters', maxLength: 20, maxLengthMessage: 'Password must be less than 20 characters' }
];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (checkInputs()) {
    form.querySelector('button').style.backgroundColor = 'var(--success-color)';
  }
});

inputs.forEach(input => {
  input.element.addEventListener('input', () => {
    const value = input.element.value.trim();
    if (value === '') {
      input.element.style.borderColor = '#ccc';
    } else if (input.minLength && value.length < input.minLength) {
      input.element.style.borderColor = 'var(--error-color)';
    } else if (input.maxLength && value.length > input.maxLength) {
      input.element.style.borderColor = 'var(--error-color)';
    } else if (input.validate && !input.validate(value)) {
      input.element.style.borderColor = 'var(--error-color)';
    } else if (input.match && value !== input.match.value.trim()) {
      input.element.style.borderColor = 'var(--error-color)';
    } else {
      input.element.style.borderColor = 'var(--success-color)';
    }
  });
});

function checkInputs() {
  let allValid = true;
  inputs.forEach(input => {
    const value = input.element.value.trim();
    if (value === '') {
      setErrorFor(input.element, input.errorMessage);
      allValid = false;
    } else if (input.minLength && value.length < input.minLength) {
      setErrorFor(input.element, input.minLengthMessage);
      allValid = false;
    } else if (input.maxLength && value.length > input.maxLength) {
      setErrorFor(input.element, input.maxLengthMessage);
      allValid = false;
    } else if (input.validate && !input.validate(value)) {
      setErrorFor(input.element, input.invalidMessage);
      allValid = false;
    } else if (input.match && value !== input.match.value.trim()) {
      setErrorFor(input.element, input.matchMessage);
      allValid = false;
    } else {
      setSuccessFor(input.element);
    }
  });
  return allValid;
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerText = message;
  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}