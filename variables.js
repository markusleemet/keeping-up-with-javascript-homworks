/*
In ES6 var keyword shouldn't be used unless in unique scenarios where it might be useful.
Keywords let and const should be preferred over var in ES6.
Var is accessible out of the scope where it was defined but let, and const are not.
Changing and using variables outside of the scope where it was defined may lead to confusion and should be avoided.
Both let and const can only be used in the scope where they were defined.
If a variable was defined using let keyword, it could be changed and reassigned, but if the variable was defined using const, it can not be reassigned but can be changed in some scenarios.
For example, if object or array was defined using the const keyword, it can not be reassigned, but its values are changeable.

Const keyword should be used to define values that will not change, for example, the size of the canvas to draw on.
Let should be used for every other variable that might change during the execution of the code.
It's best not to use the var keyword at all.

Hoisting is JavaScript functionality that moves variable declarations to the top and works only if var keyword was used.
That enables users to use variables before they are even defined.
*/

const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 600;

let current_drawing_color = 'red';

console.log(hoisted_variable);
var hoisted_variable = "This variable is hoisted";
