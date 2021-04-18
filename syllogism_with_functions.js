//Lets assume that this Object represents all men and that all men are mortal
const men = {'Socrates': {isMortal: true}, 'Plato': {isMortal: true}, 'Aristotle': {isMortal: true}};

const isMortal = (person) => {
    // If true then all men are mortal
    if (men.Socrates.isMortal && men.Plato.isMortal && men.Aristotle.isMortal) {
        //If person is in all mens collection then return true, false otherwise.
        return !!men[person];
    }
};


console.log(`Socrates is ${isMortal('Socrates') ? 'mortal' : 'immortal'}`);


//Extra credit
const whatFlavorIsCake = (allCakes, isThisChocolateCake) => {
    if (cake === allCakes[0] || cake === allCakes[1]) {
        if (isThisChocolateCake) {
            return 'chocolate';
        } else {
            return 'vanilla';
        }
    }
};

console.log("The flavor of this cake is: " + whatFlavorIsCake(['chocolate', 'vanilla'], false));
