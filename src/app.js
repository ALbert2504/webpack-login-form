import {Question} from './question';
import {createModal, isValid} from "./utils";
import {authWithEmailAndPassword, getAuthForm, getRegisterForm, register} from "./auth";
import './styles.css';


const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');
modalBtn.addEventListener('click', openModal);
const registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', openRegisterForm);

window.addEventListener('load', Question.renderList);

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
})

function submitFormHandler(event) {
  event.preventDefault();

  if(isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }

    submitBtn.disabled = true;
    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
  }
}

function openModal() {
  createModal('Авторизация', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFromHandler);
}

function openRegisterForm() {
  createModal('Регистрация', getRegisterForm());
  document
    .getElementById('register-form')
    .addEventListener('submit', registerFormHandler);
}

function authFromHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector('button');

  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;

  btn.disabled = true;

  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false);
}

function registerFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector('button');

  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;



  register(email, password);
}

function renderModalAfterAuth(content) {
  if(typeof content === 'string') {
    createModal('Ошибка', content);
  } else {
    createModal('Список ошибок', Question.listToHTML(content));
  }
}