let activeUser = null;

const checkIfUserExists = (users, newUser) => {
    const userExists = users[newUser.email];
    console.log(`User already exists: ${ !!userExists }`);
    return !!userExists;
};

const createUser = () => {
    event.preventDefault();
    const users = getUsers();
    const form = document.getElementById('sign-up-form').getElementsByClassName('custom-input');

    // Get all input field values from form
    const newUser = {};
    for (const input of form) {
        // All fields must be filled
        if (!input.value) return showErrorMessage(`${input.id} field is not filled`);
        newUser[input.id] = input.value;
    }

    // Check if user has agreed to terms and services
    if (!document.getElementById('terms-and-services').checked) {
        showErrorMessage('User didnt agree with terms and services');
        console.log('User didnt agree with terms and services');
        return false;
    }

    // Check if user already exists
    if (checkIfUserExists(users, newUser)) {
        showErrorMessage('User already exists');
        console.log('User already exists');
        return false;
    }

    addUser(newUser);
    activeUser = newUser;
    getPage('dashboard-container');
};

const getUsers = () => {
    const localStorage = window.localStorage;

    //Check if users object exists and create it if needed
    if (!localStorage.getItem('users')) {
        let users = {};
        localStorage.setItem('users', JSON.stringify(users));
    }

    return JSON.parse(localStorage.getItem('users'));
};

const setUsers = (users) => {
    const localStorage = window.localStorage;
    localStorage.setItem('users', JSON.stringify(users));
};

const addUser = (newUser) => {
    const users = getUsers();
    newUser.todos = [];
    users[newUser.email] = newUser;
    setUsers(users);
};

const getUser = () => {
    const form = document.getElementById('log-in-form').getElementsByClassName('custom-input');
    const email = form[0].value;
    const password = form[1].value;

    const users = getUsers();
    // Check if user exists and return false otherwise
    if (!users[email]) {
        showErrorMessage('User with this email does not exist');
        console.log('User with this email does not exist');
        return false;
    }

    if (users[email].password !== password) {
        showErrorMessage('Password is not correct');
        console.log('Password is not correct');
        return false;
    }

    return users[email];
};

const logIn = () => {
    event.preventDefault();
    const user = getUser();
    if (user) {
        activeUser = user;
        getPage('dashboard-container');
    }
};

const logOut = () => {
    activeUser = null;
    getPage('main-container')
};

const editUser = () => {
    event.preventDefault();
    const users = getUsers();
    const oldEmail = activeUser.email;

    const newEmail = document.getElementById('edit-email').value;
    const newFirstName = document.getElementById('edit-first-name').value;
    const newLastName = document.getElementById('edit-last-name').value;
    const newPassword =  document.getElementById('edit-password').value;

    if (oldEmail !== newEmail && users[newEmail]) return showErrorMessage('User with that email already exists');

    activeUser.email = newEmail;
    activeUser['first-name'] = newFirstName;
    activeUser['last-name'] = newLastName;
    activeUser.password = newPassword;

    delete users[oldEmail]
    users[newEmail] = activeUser;
    setUsers(users);
    getPage('dashboard-container');
};
