
const form = document.querySelector('.listContainer');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const item = document.querySelector('#listItemText').value;
  console.log('list.js item: ', item);


  console.log('it hit here');
  fetch('/api/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: item })
  })
    .then((res) => {
      // console.log(res);
      // console.log('res received')
      return res.json()
    })
    .then((data) => {
      // window.location.href = '/render.html'
      console.log('data: ', data);
      const listItem = document.createElement('li');
      listItem.innerHTML = data;
      document.querySelector('.actualList').append(listItem);
    })

})
