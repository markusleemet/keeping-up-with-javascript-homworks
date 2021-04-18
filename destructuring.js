// Differences between destructuring array and object

// When destructuring object it is important to know keys of the values that are being destructured
// For me most useful purpose of object destructuring is using destructuring in function parameters.
// So I am able to pass object to the function and only extract values that I need from the object

// Example 1 - destructuring object
const person1 = {
    firstName: 'Markus',
    lastName: 'Leemet',
    age: 23,
    gender: 'male',
    hobbies: ['running', 'reading', 'cooking'],
    address: 'Tartu'
};

const getNameOfPerson = ({ firstName, lastName }) => {
    return `${firstName} ${lastName}`;
};

console.log(getNameOfPerson(person1));


// On the other hand destructuring array it's important to know structure of the array to get the wanted values
// Destructuring array may be useful when we want to get some/all values of the array to perform some kind of logic with these

// Example 2 - destructuring array
const person2 = {
    firstName: 'Tonu',
    lastName: 'Paavo',
    age: 21,
    gender: 'male',
    hobbies: ['cycling', 'gaming', 'swimming'],
    address: 'Haapsalu'
};

const person3 = {
    firstName: 'Mart',
    lastName: 'Puu',
    age: 33,
    gender: 'male',
    hobbies: ['debating', 'sleeping'],
    address: 'Tallinn'
};

const persons = [person1, person2, person3];

const [extractedPerson1, , extractedPerson3] = persons;

console.log(`All the hobbies of ${extractedPerson1.firstName} and ${extractedPerson3.firstName}: ${extractedPerson1.hobbies.concat(extractedPerson3.hobbies)}`);
