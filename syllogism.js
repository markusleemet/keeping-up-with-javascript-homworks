const men = {'socrates': {isMortal: true}, 'plato': {isMortal: true}, 'aristotle': {isMortal: true}};


if (men.socrates.isMortal && men.plato.isMortal && men.aristotle.isMortal) {
    console.log('All men are mortal.');
    if (men.socrates) {
        console.log('Socrates is mortal because he is part of the men collection');
    }
} else {
    console.log('All men are not mortal');
    console.log('Therefore Socrates might not be mortal.');
}


//Extra credit
const cake = 'vanilla';

if (cake === 'vanilla' || cake === 'chocolate') {
    if (cake !== 'chocolate') {
        console.log('This cake is vanilla');
    } else {
        console.log('This cake is chocolate');
    }
} else {
    console.log('This cake is neither vanilla or chocolate');
}
