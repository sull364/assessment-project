
const form = document.querySelector('.create');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/login/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: form.title.value, content: form.content.value })
  })
    .then((res) => (
      // console.log(res);
      // console.log('res received')
      res.json()
    ))
    .then((data) => {
      // window.location.href = '/render.html'
      console.log(data);
    })

})