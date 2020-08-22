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
        let modalDiv = document.createElement('div');
        let modalContent = document.createElement('div');
        let modalClose = document.createElement('span');
        let modalLabel = document.createElement('label');
        let modalInput = document.createElement('input');
        let modalButton = document.createElement('button');
        let modalForm = document.createElement('form');

        // buttonUpdate.onclick = () => { modalDiv.style.display = "block" };

        modalDiv.className = 'modal';
        modalDiv.id = "modal" + index;
        modalContent.className = 'modalContent';
        modalContent.className = 'animate-zoom';
        modalContent.id = "modalContent" + index;
        modalClose.className = 'modalClose';
        modalClose.id = "modalClose" + index;
        modalClose.innerHTML = "&times;"
        modalClose.onclick = () => { modalDiv.style.display = "none" };
        modalButton.className = 'modalButton';
        modalButton.id = "modalButton" + index;
        modalButton.setAttribute('type', 'submit')
        // modalButton.onclick = () => { modalDiv.style.display = "none" };

        modalButton.innerHTML = "Update List Item";
        modalInput.className = 'modalInput';
        modalInput.id = "modalInput" + index;
        modalInput.setAttribute('type', 'text');
        modalInput.setAttribute('placeholder', 'Enter New List Item');
        modalLabel.className = 'modalLabel';
        modalLabel.id = "modalLabel" + index;
        modalLabel.innerText = "Update List Item";
        modalForm.className = 'modalForm';
        modalForm.id = "modalForm" + index;

        buttonUpdate.className = 'buttonUpdate';
        buttonDelete.className = 'buttonDelete';
        buttonUpdate.id = "buttonUpdate" + index;

        buttonDelete.id = "buttonDelete" + index;
        buttonUpdate.innerHTML = 'update';
        buttonDelete.innerHTML = 'delete';
        li.innerHTML = dataObj.title
        li.id = "list" + index;

        modalForm.append(modalLabel);
        modalForm.append(modalInput);
        modalForm.append(modalButton);

        modalContent.append(modalClose);
        modalDiv.append(modalContent);
        modalDiv.append(modalForm);
        buttonUpdate.append(modalDiv);

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
        console.log('data: ', data);
        if (data == 'Item title already exists') {
          alert(data);
          window.location.reload(true);
          // warning.style.color = "red";
          // warning.innerHTML = data;
          // const form = document.querySelector('form#listFormForm')
          // form.append(warning);
        }
        // window.location.href = '/render.html'
        else {
          allItems = data;
        }
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
    const number = event.target.id.split('').pop();
    console.log('number: ', number)
    console.log(event.target.parentNode.parentNode)
    // console.log(event.target.parent.parent)
    // buttonToDelete = event.target.id;
    itemToDelete = event.target.parentNode.parentNode;
    // const childNode = event.target.parentNode;
    // itemToDelete.removeChild(childNode);
    console.log("itemToDelete.textContent: ", itemToDelete.textContent);
    let itemTextContent = itemToDelete.textContent;
    let item = itemTextContent.replace(/update.*$/g, '').trim();
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
        }
        window.location.reload(true);
      })
      .catch(err => {
        console.log('list.js delete request error for /api/delete: ', err)
      })
  }


  if (event.target.className === 'buttonUpdate') {
    console.log("event.target: ", event.target)
    console.log('event.target.id: ', event.target.id)
    console.log('event.target.parentNode.parentNode: ', event.target.parentNode.parentNode)
    const number = event.target.id.split('').pop();
    console.log('number: ', number)

    const modalDiv = document.querySelector('.modal');
    modalDiv.style.display = "block"
    buttonToUpdate = event.target.id;
    itemToUpdate = event.target.parentNode.parentNode;

    // console.log("itemToUpdate.textContent: ", itemToUpdate.textContent);
    let itemTextContent = itemToUpdate.textContent;
    let item = itemTextContent.replace(/update.*$/g, '').trim();
    console.log("=====> trimmed itemTextContent: ", item)
    console.log("=====> trimmed itemTextContent length: ", item.length)

    const modalButton = document.querySelector(`button#modalButton${number}`);

    modalButton.onclick = () => {
      let newItem = document.querySelector(`input#modalInput${number}`).value || 'default';
      console.log('====> newItem: ', newItem)
      modalDiv.style.visibility = "hidden";
      modalDiv.style.display = "none";

      if (newItem == item) {
        alert('Please enter a different item title')
      }
      if (newItem !== item) {
        fetch('/api/update', {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ oldTitle: item, newTitle: newItem })
        })
          .then((res) => {
            // console.log(res);
            // console.log('res received')
            return res.json()
          })
          .then((data) => {
            console.log('patch request returned string: ', data)
            if (data) {
              itemToUpdate.itemTextContent(data);
            }
            window.location.reload(true);
          })
          .then(data => {
            console.log('useless data: ', data)
            window.location.reload(true);
          })
          .catch(err => {
            console.log('list.js Update request error for /api/Update: ', err)
          })
        window.location.reload(true);
      };
    }
  }
})