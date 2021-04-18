let activeTodo = null;

const saveTodo = () => {
    // Get to do from form
    const newTodo = {};
    newTodo.name = document.getElementById('list-name').value;
    newTodo.items = [];
    const allItems = document.getElementById('items-container').children;
    for (let item = 0; item < allItems.length; item++) {
        const name = allItems[item].getElementsByTagName('input')[0].value;
        const checked = allItems[item].getElementsByTagName('input')[1].checked;
        newTodo.items.push({ name: name, checked: checked });
    }

    if (!activeTodo) {
        //check if to do with that name already exists
        console.log(newTodo.name);
        console.log(getAllTodos());
        if (getAllTodos().find((todo) => todo.name === newTodo.name)) {
            showErrorMessage('Todo with that name already exists');
        } else if (newTodo.name === '') {
            showErrorMessage('Todo name can not be empty');
        } else {
            saveUserTodo(newTodo);
            console.log('Save to do list');
        }
    } else {
        if (newTodo.name === activeTodo) {
            console.log(`Change already existing todo -> ${newTodo.name}`);
            changeUserTodo(newTodo);
        } else {
            if (newTodo.name) {
                if (getAllTodos().find((todo) => todo.name === newTodo.name)) {
                    showErrorMessage('Todo with that name already exists');
                } else {
                    console.log(`Change already existing todo with new name -> ${newTodo.name}`);
                    changeUserTodo(newTodo);
                }
            } else {
                showErrorMessage('Todo name can not be empty');
            }
        }
    }
};

const getAllTodos = () => {
    return getUsers()[activeUser.email].todos;
};

const saveUserTodo = (todo) => {
    const allTodos = getAllTodos();
    const allUsers = getUsers();
    allTodos.push(todo);
    console.log(allTodos);
    allUsers[activeUser.email].todos = allTodos;
    setUsers(allUsers);
    getPage('dashboard-container');
};

const changeUserTodo = (changedTodo) => {
    const allTodos = getAllTodos();
    const allUsers = getUsers();
    allTodos[allTodos.indexOf(allTodos.find((todo) => todo.name === activeTodo))] = changedTodo
    allUsers[activeUser.email].todos = allTodos;
    setUsers(allUsers);
    getPage('dashboard-container');
};

const addItem = () => {
    event.preventDefault();
    const itemToAdd = document.getElementById('add-item').value;
    document.getElementById('items-container').appendChild(createTodoItem(itemToAdd, false));
    document.getElementById('add-item').value = '';
};

createTodoItem = (name, checked) => {
    const todoItemContainer = document.createElement('div');
    todoItemContainer.classList.add('horizontal-container');
    todoItemContainer.innerHTML = `
        <input placeholder="item" class="custom-input" value="${name}" />
        <input type="checkbox" class="big-checkbox" />
    `;
    todoItemContainer.getElementsByTagName('input').item(1).checked = checked;
    return todoItemContainer;
};
