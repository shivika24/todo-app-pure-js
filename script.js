const todoForm = document.querySelector('.form');
const todoInput = document.querySelector('.input');
const todoItemsList = document.querySelector('.list');
let list = [];    
  todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value); 
  });
  
  function addTodo(item) {
    if (item !== '') {
      const todo = {
        id: Math.random(),
        name: item,
        isCompleted: false
      };
      list.push(todo);
      addToLocalstorage(list); 
      display(list)
      todoInput.value = '';
    }
    else
    alert("Empty item can not be added");
  }
  function display(list) {
    todoItemsList.innerHTML = '';
    list.forEach(function(item) {
      const checked = item.isCompleted ? 'checked': null;
      const li = document.createElement('li');
      li.setAttribute('class', 'item');
      li.setAttribute('id', item.id);
      if (item.isCompleted === true) {
        li.classList.add('checked');
      }
  
      li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <i class="fa fa-trash-o delete-button"></i>
      `;
      todoItemsList.append(li);
    });
  
  }
  function toggle(id) {
    list.forEach(function(item) {
      if (item.id == id) {
        item.isCompleted = !item.isCompleted;
      }
    });
    addToLocalstorage(list);
  }
  
  function deleteTodo(id) {
    let res = confirm("Do You Want to delete?");
    if(res)
    {
    list = list.filter(function(item) {
      return item.id != id;
    });
    addToLocalstorage(list);
    }
  }  
  
  function addToLocalstorage(list) {
    localStorage.setItem('list', JSON.stringify(list));
    display(list);
  }

  function getFromLocalstorage() {
    const getList = localStorage.getItem('list');
    if (getList) {
      list = JSON.parse(getList);
      display(list);
    }
  }
  getFromLocalstorage();
  todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
      toggle(event.target.parentElement.getAttribute('id'));
    }
    if (event.target.classList.contains('delete-button')) {
      deleteTodo(event.target.parentElement.getAttribute('id'));
    }
  });