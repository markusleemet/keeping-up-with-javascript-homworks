// Homework Assignment #10: Destructuring

// In the grand schema, both destructuring objects and arrays allow us to extract data to distinct variables.
// Before ES6 assigning values from objects or arrays to variables was more difficult
// and had to be done individually with every value which required a lot of boilerplate code.


// ARRAY DESTRUCTURING
// When using an array destructuring variables can be defined earlier or they can be defined in destructuring statement.
// Array destructuring also allows us to add default values to the variables,
// so if no value is added to the variable, it will use the default value.
// A cool thing that array destructuring also allows us to do is swapping two variables values more concisely,
// so we don't have to use a temporary variable for that.
// Also if array has values that we are not interested in we can skip these and not extract these into distinct variables.
// Another cool thing that array destructuring allows us to do is use rest operator
// and add all the values that were not extracted into separate array.


// OBJECT DESTRUCTURING
// Object destructuring idea is pretty much the same as array destructuring.
// The idea is to extract data from an object into distinct variables and not do it one by one,
// which might get very tedious with massive objects.
// To use object destructuring, we have to know the keys of the values that we want to assign to the distinct variables.
// With object destructuring, the order in which we destruct values is not important.
// Object destructuring also allows us to use default values.
// A cool thing that we can do while using object destructuring is use aliases for the extracted values.
// So for example if we extract value with key 'value1' we can assign the extracted value to variable 'newValue1'.
// Object destructuring also allows us to use rest operator to add all the values that were not extracted into an object.
// For me best thing about object destructuring is that we are able to do that in function parameters,
// so we can give object to the function and extract the values that we want to use in function definition.


// CODE EXAMPLES FOR ARRAY DESTRUCTURING
// Destructuring and rest operator with destructuring
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const [monday, tuesday, , thursday, ...restOfTheDays] = days;
console.log(monday);
console.log(tuesday);
console.log(thursday);
console.log(restOfTheDays);

// Defining variables before destructuring statement
let first, second, rest;
[first, second, ...rest] = days;
console.log(first);
console.log(second);
console.log(rest);

// Adding default value to the variable while destructuring
const moods = ['happy', 'sad', 'angry'];
const [person1, person2, person3, person4='suprised'] = moods;
console.log(person1);
console.log(person2);
console.log(person3);
console.log(person4);


// Swapping two variables using array destructuring
let variable1 = 1;
let variable2 = 2;

[variable1, variable2] = [variable2, variable1];
console.log(variable1);
console.log(variable2);


// CODE EXAMPLES FOR OBJECT DESTRUCTURING
// Destructuring and rest operator with object destructuring
const numbers = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 5, seven: 7, eight: 8, nine: 9, ten: 10};
const { two, one, ...otherNumbers } = numbers;
console.log(one);
console.log(two);
console.log(otherNumbers);

// Using aliases for extracted values
const { one: einz, two: zwei } = numbers;
console.log(einz);
console.log(zwei);

// Destructuring in function params

const getMyFavoriteNumber = ({ four }) => {
    return four;
};

console.log(getMyFavoriteNumber(numbers));

