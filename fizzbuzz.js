const fizzbuzz = () => {
    for (let i = 1; i <= 100; i++) {
        if (isPrime(i)) {
            console.log('prime');
        } else if (i % 15 === 0) {
            console.log('FizzBuzz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else {
            console.log(i);
        }
    }
};

const isPrime = (number) => {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
};

// Run function fizzbuzz()
fizzbuzz();
