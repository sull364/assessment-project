$(document).ready(() => {
  fetch('/api')
    .then(res => res.json())
    .then(data => {
      const ol = document.querySelector('.actualList');

      data.forEach((dataObj, index) => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let buttonUpdate = document.createElement('button');
        let buttonDelete = document.createElement('button');
        buttonUpdate.className = 'buttonUpdate';
        buttonDelete.className = 'buttonDelete';
        buttonUpdate.id = "buttonUpdate" + index;
        buttonDelete.id = "buttonDelete" + index;
        buttonUpdate.innerHTML = 'update';
        buttonDelete.innerHTML = 'delete';
        li.innerHTML = dataObj.title
        li.id = "list" + index;
        span.append(buttonUpdate);
        span.append(buttonDelete);
        li.append(span);
        ol.append(li);
      })
    })
    .catch(err => {
      console.log('list.js get request error: ', err)
    })
});

// const form = document.querySelector('.listContainer');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log('==========> add button: ', e.target.id, e.target.className)
//   const item = document.querySelector('#listItemText').value;
//   console.log('list.js item: ', item);

//   console.log('it hit here');
//   fetch('/api/create', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ title: item })
//   })
//     .then((res) => {
//       // console.log(res);
//       // console.log('res received')
//       return res.json()
//     })
//     .then((data) => {
//       // window.location.href = '/render.html'
//       console.log('data: ', data);
//       allItems = data;
//     })
//     .then((data) => {
//       console.log('useless console.log data: ', data)
//       window.location.reload(true);
//     })

//     .catch(err => {
//       console.log('list.js post request error for /api/create: ', err)
//     })
// })


let itemToDelete;
let buttonToDelete;
document.addEventListener('click', function (event) {
  event.preventDefault();
  // console.log(event.target.id);

  if (event.target.className === "listFormForm") {
    console.log('==========> add item button: ', event.target.id, event.target.className)
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
        allItems = data;
      })
      .then((data) => {
        console.log('useless console.log data: ', data)
        window.location.reload(true);
      })

      .catch(err => {
        console.log('list.js post request error for /api/create: ', err)
      })
  }

  if (event.target.className === 'buttonDelete') {
    console.log(event.target)
    console.log(event.target.id)
    console.log(event.target.parentNode.parentNode)
    // console.log(event.target.parent.parent)
    // buttonToDelete = event.target.id;
    itemToDelete = event.target.parentNode.parentNode;
    // const childNode = event.target.parentNode;
    // itemToDelete.removeChild(childNode);
    console.log("itemToDelete.textContent: ", itemToDelete.textContent);
    let itemTextContent = itemToDelete.textContent;
    let item = itemTextContent.replace(/updatedelete/, '').trim();
    console.log("======> item: ", item)
    // console.log('itemToDelete: ', itemToDelete)
    // console.log('buttonToDelete: ', typeof buttonToDelete)

    fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: item })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('returned string: ', data)
        if (data == "item deleted") {
          itemToDelete.remove(itemToDelete)
          window.location.reload(true);
        }
      })
      .catch(err => {
        console.log('list.js delete request error for /api/delete: ', err)
      })
  }


})