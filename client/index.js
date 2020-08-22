// import axios from 'axios';

console.log('hello');
$(document).ready(function () {


  // =============== HELPER FUNCTIONS =============== //
  // function createElement(tag) {
  //   const newElement = document.createElement(tag);
  //   return newElement;
  // }

  // function addAttribute(tag, att, value) {
  //   const element = document.querySelector(tag)
  //   element.setAttribute(att, value)
  // }

  // querySelector("h1.className")
  // querySelector("h1#idName")
  // querySelector("h1[value='empty']")


  // =============== HYPOTHETICAL JAVASCRIPT =============== //
  // const firstPriority = createElement('div');
  // const secondPriority = createElement('div');
  // firstPriority.id = "firstPriorityId"

  // firstPriority.setAttribute('ndingclass', 'firstPriority');
  // firstPriority.innerHTML = 'First Priority';

  // secondPriority.setAttribute('class', 'secondPriority');
  // secondPriority.innerHTML = 'Second Priority';

  // const container = document.querySelector('.container');
  // container.append(firstPriority);
  // container.append(secondPriority);


  // =============== POST REQUEST FOR /LOGIN =============== //
  // =============== POST REQUEST FOR /LOGIN =============== //
  const loginForm = document.getElementById("loginFormForm");
  // console.log("index.js loginFormForm:", loginForm);

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#loginEmailText').value;
    const password = document.querySelector('#loginPasswordText').value;

    const user = {
      email,
      password
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then((res) => {
        console.log('res:', res);
        // console.log('res received')
        return res.json()
      })
      .then((data) => {
        // window.location.href = '/render.html'
        if (data === 'LOGIN') {
          window.location.href = '../list.html'
        }
        if (data != 'LOGIN') {
          alert('Invalid password or username')
        }
      })
      .catch(err => {
        console.log('index.js /api/login error: ', err)
      })
  });
  // =============== POST REQUEST FOR /LOGIN =============== //
  // =============== POST REQUEST FOR /LOGIN =============== //




  // =============== POST REQUEST FOR /SIGNUP =============== //
  // =============== POST REQUEST FOR /SIGNUP =============== //
  const signupForm = document.getElementById("signupFormForm");


  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#signupEmailText').value;
    const password = document.querySelector('#signupEnterPasswordText').value;
    const reenter = document.querySelector('#signupReenterPasswordText').value;

    const user = {
      email,
      password,
      reenter
    };

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, reenter: reenter })
    })
      .then((res) => {
        console.log('res:', res);
        // console.log('res received')
        return res.json()
      })
      .then((data) => {
        // window.location.href = '/render.html'
        if (data == 'SIGNUP') {
          window.location.href = '../list.html'
        }
        if (data == 'Passwords do not match') {
          alert(data)
        }
        if (data == 'Username already exists') {
          alert(data)
          window.location.href = '../index.html'
        }
      })
      .catch(err => {
        console.log('index.js /api/signup error: ', err)
      })
  });




  // =============== POST REQUEST FOR /SIGNUP =============== //
  // =============== POST REQUEST FOR /SIGNUP =============== //
});
