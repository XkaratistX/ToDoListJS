'use strict';
let   todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

      
let todoData = [];

if(localStorage.getItem('todoData')) {
    todoData = JSON.parse(localStorage.getItem('todoData'));
}

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  
  // создание элементов
  todoData.forEach(function(item, index){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    
    li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' + 
       '<div class="todo-buttons">' +
          '<button class="todo-remove"></button>' +
          '<button class="todo-complete"></button>' + 
       '</div>';

       if(item.completed) {
         todoCompleted.append(li);
       } else {
         todoList.append(li);
       }

      // добавление списка дел "выполнено", "не выполнено"
       const btnTodoComplete = li.querySelector('.todo-complete'); 

       btnTodoComplete.addEventListener('click', function () {
         item.completed = !item.completed;
         render();
       });

       const btnTodoRemove = li.querySelector('.todo-remove');
        
       btnTodoRemove.addEventListener('click', function () {
         todoData.splice(index, 1);
        render();
       });

      // очистка поля инпут
       let inputs = document.querySelectorAll('input[type=text]');
       for (let i = 0;  i < inputs.length; i++) {
        inputs[i].value = '';
      }
      localStorage.setItem('todoData', JSON.stringify(todoData));
  });
};


todoControl.addEventListener('submit', function(event){
  event.preventDefault();

  

  if(headerInput.value === '') {
      alert('Введите список дел');
      return;
  }

  const newTodo = {
     value: headerInput.value,
     completed: false,
  };

  if(newTodo.value !== ''){
     todoData.push(newTodo);
     headerInput.value = '';
  }
   else {
    alert('Введите список дел!');
  }

  render();
});

render();
