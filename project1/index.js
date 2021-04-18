const getPage = (pageToGet) => {
    switch (pageToGet) {
        case 'main-container':
            generateMainContainer('TO-DO application', 'Made by Markus Leemet');
            break;
        case 'login-container':
            generateLoginContainer();
            break;
        case 'sign-up-container':
            generateSignUpContainer();
            break;
        case 'dashboard-container':
            generateDashboardContainer();
            addUserSettings();
            break;
        case 'edit-user-info-container':
            generateEditUserContainer();
            addUserSettings();
            document.getElementById('edit-first-name').value = activeUser['first-name'];
            document.getElementById('edit-last-name').value = activeUser['last-name'];
            document.getElementById('edit-email').value = activeUser.email;
            document.getElementById('edit-password').value = activeUser.password;
            break;
    }
};

const showErrorMessage = (message) => {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container')
    errorContainer.innerHTML = `<h3>${message}</h3>`;
    document.getElementById('to-do-body').appendChild(errorContainer);

    // Remove error after 3 seconds
    setTimeout(() => {
        document.getElementById('to-do-body').removeChild(errorContainer);
    },  3000);
};



const generateMainContainer = (title, description) => {
    document.getElementById('to-do-body').innerHTML = `
    <div id="main-container" class="custom-container">
        <h1>${title}</h1>
        <p>${description}</p>
        <button class="custom-button" onclick="getPage('login-container')">Log in</button>
        <button class="custom-button" onclick="getPage('sign-up-container')">Sign up</button>
    </div>
    `
}


const generateLoginContainer = () => {
    document.getElementById('to-do-body').innerHTML = `
    <div id="login-container" class="custom-container">
        <h2>Log in</h2>
        <form class="vertical-container" id="log-in-form">
            <label for="input-email"></label>
            <input id="input-email" class="custom-input" placeholder="email" type="email" required/>
            <label for="input-password"></label>
            <input id="input-password" class="custom-input" placeholder="password" type="password" required/>
            <button type="submit" class="custom-button" onclick="logIn()">Log in</button>
        </form>
    </div>
    `
}


const generateSignUpContainer = () => {
    document.getElementById('to-do-body').innerHTML = `
    <div id="sign-up-container" class="custom-container">
        <h2>Sign up</h2>
        <form class="vertical-container" id="sign-up-form">
            <label for="first-name"></label>
            <input id="first-name" class="custom-input" placeholder="first name" type="text" />
            <label for="last-name"></label>
            <input id="last-name" class="custom-input" placeholder="last name" type="text" />
            <label for="email"></label>
            <input id="email" class="custom-input" placeholder="email" type="email" />
            <label for="password"></label>
            <input id="password" class="custom-input" placeholder="password" type="password" />
            <div class="horizontal-container">
                <input id="terms-and-services" type="checkbox">
                <label for="terms-and-services">I agree with terms and services</label>
            </div>
            <button class="custom-button" onclick="createUser()">Sign up</button>
        </form>
    </div>
    `
}


const generateDashboardContainer = () => {
    const allTodos = getAllTodos();
    document.getElementById('to-do-body').innerHTML = `
    <div id="dashboard-container" class="custom-container">
        <h2>Dashboard</h2>
        <div id="todos-container">
            ${allTodos.map((todo) => `<button class="custom-button todo-item" onclick="getEditTodoContainer()">${todo.name}</button>`).join("")}
        </div>
        <button class="custom-button" onclick="getEditTodoContainer()">Create to-do</button>
    </div>
    `
}


const generateEditUserContainer = () => {
    document.getElementById('to-do-body').innerHTML = `
    <div id="edit-user-info-container" class="custom-container">
        <h2>Edit user</h2>
        <form class="vertical-container" id="edit-user-form">
            <label for="edit-first-name"></label>
            <input id="edit-first-name" class="custom-input" placeholder="first name" type="text" required/>
            <label for="edit-last-name"></label>
            <input id="edit-last-name" class="custom-input" placeholder="last name" type="text" required/>
            <label for="edit-email"></label>
            <input id="edit-email" class="custom-input" placeholder="email" type="email" required/>
            <label for="edit-password"></label>
            <input id="edit-password" class="custom-input" placeholder="password" type="text" required/>
            <button type="submit" class="custom-button" onclick="editUser()">Save</button>
        </form>
    </div>
    `
}


const generateEditTodoContainer = (listName) => {
    document.getElementById('to-do-body').innerHTML = `
    <div id="edit-to-do-container" class="custom-container">
        <div class="list-name-container">
            <label for="list-name"></label>
            <input id="list-name" class="custom-input" placeholder="List name" type="text" required value="${listName}"/>
        </div>
        <div id="items-container">
        </div>
        <div class="horizontal-container">
            <label for="add-item"></label>
            <input id="add-item" class="custom-input" placeholder="Add item" type="text" required/>
            <button class="custom-button" onclick="addItem()">Add</button>
        </div>
        <button class="custom-button" onclick="saveTodo()">Save</button>
    </div>
    `
    if (!activeTodo) return

    for (const item of getAllTodos().find((todo) => todo.name === activeTodo).items) {
        document.getElementById('items-container').appendChild(createTodoItem(item.name, item.checked))
    }
}

const addUserSettings = () => {
    const editUserContainer = document.createElement('div');
    editUserContainer.classList.add('edit-user-container');
    editUserContainer.innerHTML = `
        <button class="custom-button" onclick="getPage('edit-user-info-container')">Edit user</button>
        <button class="custom-button" onclick="logOut()">Log out</button>
    `;
    document.getElementById('to-do-body').appendChild(editUserContainer);
}


getEditTodoContainer = () => {
    activeTodo = event.target.innerText !== 'Create to-do' ? event.target.innerText : '';
    generateEditTodoContainer(activeTodo);
    addUserSettings();
}
