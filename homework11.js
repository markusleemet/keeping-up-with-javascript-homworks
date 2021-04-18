

const reverseJsonArray = (jsonArray) => {
    try {
        const arrayToReverse = JSON.parse(jsonArray);
        const reversedArray = arrayToReverse.reverse();
        return JSON.stringify(reversedArray);
    } catch (jsonArrayNotValid) {
        return false;
    }
};


const stringifiedArrayWithOneValue = JSON.stringify([1]);
const emptyStringifiedArray = JSON.stringify([]);

// 10 examples of invoking reverseJsonArray() function
console.log(`With no params reverseJsonArray() returns: ${reverseJsonArray()}`);
console.log(`With boolean as param reverseJsonArray() returns: ${reverseJsonArray(true)}`);
console.log(`With not stringified array as param reverseJsonArray() returns: ${reverseJsonArray([1, 2, 3])}`);
console.log(`With invalid stringified array as param reverseJsonArray() returns: ${reverseJsonArray('[1, 2; 3]')}`);
console.log(`With stringified array that has one value as param reverseJsonArray() returns: ${reverseJsonArray(stringifiedArrayWithOneValue)}`);
console.log(`With stringified array that is empty as param reverseJsonArray() returns: ${reverseJsonArray(emptyStringifiedArray)}`);
console.log(`With stringified array that has even number of values as param reverseJsonArray() returns: ${reverseJsonArray(JSON.stringify([1, 2]))}`);
console.log(`With stringified array that has odd number of values as param reverseJsonArray() returns: ${reverseJsonArray(JSON.stringify([1, 2, 3]))}`);
console.log(`With object as param reverseJsonArray() returns: ${reverseJsonArray(JSON.stringify({one: 1, two: 2}))}`);
console.log(`With number as param reverseJsonArray() returns: ${reverseJsonArray(JSON.stringify(1))}`);

