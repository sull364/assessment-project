// import axios from 'axios';

console.log('hello');
// $(document).ready(function () {


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
const loginForm = document.getElementById("loginFormForm");
console.log(loginForm);

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
      'Content-type': 'application/json'
    },
    body: JSON.stringify(
      { email: email, password: password })
    // credentials: 'include',
  })
    .then(res => {
      console.log('I am in res');
      return res.json()
    })
    .then(data => {
      console.log(data);
      window.location.href = "../list.html"
    })
    .catch(err => {
      console.log('get request error for api/login: ', err)
    })
  // axios.get("/api/login", user)
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  //   .catch(err => {
  //     console.log('get request error for api/login: ', err)
  //   })


});

// });
