// Homework 14

// Functionality using CALLBACKS
getUserInput1 = (num) => {
    startTime1 = Date.now();
    if (num >= 1 && num <= 1000) {
        calculateSquare(num, waitSpecifiedMilliseconds);
    } else {
        console.log(`Argument num must be between 1 and 1000 -> ${num} was given.`);
    }
};

const calculateSquare = (num, callback) => {
    console.log(num * num);
    callback(num, getSquareRoot);
};

const waitSpecifiedMilliseconds = (num, callback) => {
    setTimeout(() => {
        callback(num, getClosestPrime)
    }, num);
};

const getSquareRoot = (num, callback) => {
    console.log(Math.sqrt(num));
    callback(num, getElapsedTime);
};

const getClosestPrime = (num, callback) => {
    for (let i = num; num > 1; num--) {
        if (isPrimeNumber(num)) {
            console.log(num);
            break;
        }
    }
    callback();
};

const getElapsedTime = () => {
    console.log(`Total elapsed time -> ${Date.now() - startTime1}ms`)
};


let startTime1;
getUserInput1(2);





// Functionality using promises
let startTime2;
getUserInput2 = (num) => {
    startTime2 = Date.now();
    return new Promise((resolve, reject) => {
        if (num >= 1 && num <= 1000) {
            resolve(num)
        } else {
            reject(`Argument num must be between 1 and 1000 -> ${num} was given.`)
        }
    })
};

getUserInput2(2)
    .then(num => {
        console.log(num * num)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(num);
            }, num)
        })
    })
    .then(num => {
        console.log(Math.sqrt(num));
        return num
    })
    .then(num => {
        for (let i = num; num > 1; num--) {
            if (isPrimeNumber(num)) {
                console.log(num);
                break;
            }
        }
    })
    .catch(error => {
        console.log(error);
    }).finally(() => {
        console.log(`Total elapsed time -> ${Date.now() - startTime2}ms`)
    })



const isPrimeNumber = (number) => {
    for (let index = 2; index < number; index++) {
        if (number % index === 0) {
            return false;
        }
    }
    return number > 1;
}

