import {project} from './firebase'


export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input id="email" type="email" required>
        <label for="email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input id="password" type="password" required>
        <label for="password">Пароль</label>
      </div>
      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
       >
        Войти
       </button>
    </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyCcwwXljdMFwLnGuLyvLGWt3gMSrSL6KBo';
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.idToken);
}


export function getRegisterForm() {
  return `
    <form class="mui-form" id="register-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input id="email" type="email" required>
        <label for="email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input id="password" type="password" required>
        <label for="password">Пароль</label>
      </div>
      <button
        type="submit"
        class="mui-btn mui-btn--raised mui-btn--primary"
      >
        Регистрация
      </button>
    </form>
  `
}

export function register(email, password) {
  project.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => console.error(error));
}