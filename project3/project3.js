/*
---------------
---FLOORS----
---------------
*/

// Floor class represents floor which can have one or more persons who want to change floors
class Floor {
    constructor(floorNumber, upButton, downButton) {
        this.floorNumber = floorNumber;
        this.upButton = upButton;
        this.downButton = downButton;
        this.personsThatWantToGoUp = [];
        this.personsThatWantToGoDown = [];
    }

    // Function adds person to the floor and specifies person moving direction
    addPerson(person) {
        if (person.movingDirectionUp) {
            this.personsThatWantToGoUp.push(person);
        } else {
            this.personsThatWantToGoDown.push(person);
        }
    }

    movePersonsToElevator(elevator) {
        // Check if this is possible
        if (elevator.currentFloor === this.floorNumber) {
            if (elevator.directionUp) {
                this.personsThatWantToGoUp.forEach(person => {
                    elevator.takeOnPerson(person)
                });
                this.personsThatWantToGoUp = [];
            } else {
                this.personsThatWantToGoDown.forEach(person => {
                    elevator.takeOnPerson(person)
                });
                this.personsThatWantToGoDown = [];
            }
        } else {
            throw `Cant move persons from floor - ${this.floorNumber} to elevator that is on - ${elevator.currentFloor}`
        }
    };

    pressUpButton() {
        this.upButtonActive = true;
    }

    pressDownButton() {
        this.downButtonActive = true;
    }

    pressButtonToMoveToDestinationFloor(destinationFloor) {
        if (destinationFloor > this.floorNumber && this.upButton) {
            this.pressUpButton();
        } else {
            if (this.downButton) {
                this.pressDownButton();
            }
        }
    }
}


// Lets make all the necessary floors and add them to floors array
const penthouse = new Floor(10, false, true);
const floor9 = new Floor(9, true, true);
const floor8 = new Floor(8, true, true);
const floor7 = new Floor(7, true, true);
const floor6 = new Floor(6, true, true);
const floor5 = new Floor(5, true, true);
const floor4 = new Floor(4, true, true);
const floor3 = new Floor(3, true, true);
const floor2 = new Floor(2, true, true);
const floor1 = new Floor(1, true, true);
const floor0 = new Floor(0, true, true);
const basement = new Floor(-1, true, false);
const allFloors = [basement, floor0, floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8, floor9, penthouse]


/*
---------------
!!!!!!!!!!!!!!!
---------------
*/
/*
---------------
---PERSON----
---------------
*/


// This class represents persons who have current floor and destination floor
class Person {
    constructor(currentFloor, destinationFloor) {
        this.currentFloor = currentFloor;
        this.destinationFloor = destinationFloor;
        this.timeStart = Date.now(); // represents time when person starts his/her travel to the different floor
        this.exitFloor = destinationFloor
        this.movingDirectionUp = currentFloor < destinationFloor
    }


    getTotalTravelTime() {
        return Date.now() - this.timeStart
    }

    setExitFloor(exitFloor) {
        this.exitFloor = exitFloor;
    }
}

/*
---------------
!!!!!!!!!!!!!!!
---------------
*/
/*
---------------
---ELEVATOR----
---------------
*/

class Elevator{
    constructor(maxFloor, minFloor, directionUp, idleFloor) {
        this.idle = true;
        this.idleFloor = idleFloor;
        this.persons = [];
        this.directionUp = directionUp;
        this.currentFloor = idleFloor;
        this.maxFloor = maxFloor;
        this.minFloor = minFloor;
        this.emergency = false;
        this.activatedButtons = [];
    }

    moveUp() {
        if (this.currentFloor < this.maxFloor) {
            this.currentFloor += 1;
        } else {
            throw "Elevator is at max floor - can't move up"
        }
    }

    moveDown() {
        if (this.currentFloor > this.minFloor) {
            this.currentFloor -= 1;
        } else {
            throw "Elevator is at min floor - can't move down"
        }
    }

    pressEmergencyButton() {
        this.emergency = true;
    }

    pressResetButton() {
        this.emergency = false;
    }

    takeAction() {
        if (this.directionUp) {
            if (this.persons.length) {
                this.moveUp();
                return;
            }
            const activatedUpButtons = getAllFloorsWithActiveUpButton();
            if (activatedUpButtons.length) {

                const minFloor = Math.min(activatedUpButtons)

                if (this.currentFloor === minFloor) {
                    getFloor(minFloor).movePersonsToElevator(this)
                    this.moveUp();
                } else {
                    this.moveDown();
                }
            } else {
                this.moveToIdleFloor();
            }
        } else {
            if (this.persons.length) {
                this.moveDown();
                return;
            }
            const activatedDownButtons = getAllFloorsWithActiveDownButton();
            if (activatedDownButtons.length) {

                const maxFloor = Math.min(activatedDownButtons)

                if (this.currentFloor === maxFloor) {
                    getFloor(maxFloor).movePersonsToElevator(this)
                    this.moveDown();
                } else {
                    this.moveUp();
                }
            } else {
                this.moveToIdleFloor();
            }
        }
    }

    moveToIdleFloor() {
        if (this.currentFloor === this.idleFloor) {
            return;
        }

        if (this.directionUp) {
            this.moveDown();
        } else {
            this.moveUp();
        }
    }

    takeOnPerson(person) {
        this.persons.push(person);
        this.pressDestinationFloorButton()
    }

    // Press destination floor button or if elevator doesn't go to that floor push random button
    pressDestinationFloorButton(person) {
        if (person.destination >= this.maxFloor && person.destination >= this.minFloor) {
            this.activatedButtons.push(person.destination);
        } else {
            this.activatedButtons.push(5);
            person.setExitFloor(5);
        }
    }
}

// Lets make 2 elevators
const elevatorUp = new Elevator(10, 0, false, -1);
const elevatorDown = new Elevator(9, -1, true, 10);


/*
---------------
!!!!!!!!!!!!!!!
---------------
*/
/*
---------------
---SIMULATION----
---------------
*/

let numberOfPeopleThatHaveArrivedAtDestination = 0;
const numberOfPeople = 100;
const startTime = Date.now();

logElevatorsState = () => {
    console.log(`↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`)
    console.log(`${Math.floor((Date.now() - startTime) / 1000)}s                          ↑↑↑${elevatorUp.currentFloor}↑${elevatorUp.persons.length}↑↑↑                                                     ↓↓↓${elevatorDown.currentFloor}↓${elevatorDown.persons.length}↓↓↓`)
    console.log(`                  ---[${allFloors.map(floor => floor.personsThatWantToGoUp.length)}]---                             ---[${allFloors.map(floor => floor.personsThatWantToGoDown.length)}]---`)
    console.log(`↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓`)
}

logFloorsState = () => {
    console.log(
        `|-1 ↑${getFloor(-1).personsThatWantToGoUp.length} ↓${getFloor(-1).personsThatWantToGoDown.length}|` +
        `|0 ↑${getFloor(0).personsThatWantToGoUp.length} ↓${getFloor(0).personsThatWantToGoDown.length}|` +
        `|1 ↑${getFloor(1).personsThatWantToGoUp.length} ↓${getFloor(1).personsThatWantToGoDown.length}|` +
        `|2 ↑${getFloor(2).personsThatWantToGoUp.length} ↓${getFloor(2).personsThatWantToGoDown.length}|` +
        `|3 ↑${getFloor(3).personsThatWantToGoUp.length} ↓${getFloor(3).personsThatWantToGoDown.length}|` +
        `|4 ↑${getFloor(4).personsThatWantToGoUp.length} ↓${getFloor(4).personsThatWantToGoDown.length}|` +
        `|5 ↑${getFloor(5).personsThatWantToGoUp.length} ↓${getFloor(5).personsThatWantToGoDown.length}|` +
        `|6 ↑${getFloor(6).personsThatWantToGoUp.length} ↓${getFloor(6).personsThatWantToGoDown.length}|` +
        `|7 ↑${getFloor(7).personsThatWantToGoUp.length} ↓${getFloor(7).personsThatWantToGoDown.length}|` +
        `|8 ↑${getFloor(8).personsThatWantToGoUp.length} ↓${getFloor(8).personsThatWantToGoDown.length}|` +
        `|9 ↑${getFloor(9).personsThatWantToGoUp.length} ↓${getFloor(9).personsThatWantToGoDown.length}|` +
        `|10 ↑${getFloor(10).personsThatWantToGoUp.length} ↓${getFloor(10).personsThatWantToGoDown.length}|`
    )
};

const getFloor = (floorNumber) => {
    return allFloors.filter((floor) => floor.floorNumber === floorNumber)[0]
}

const getAllFloorsWithActiveUpButton = () => {
    return allFloors.filter((floor) => floor.upButtonActive).map((floor) => floor.floorNumber);
};


const getAllFloorsWithActiveDownButton = () => {
    return allFloors.filter((floor) => floor.downButtonActive).map((floor) => floor.floorNumber);
};


const addPersonToTheFloor = (person) => {
    // When person is added to the floor the correct elevator button is pressed automatically
    const floor = getFloor(person.currentFloor);
    floor.addPerson(person);
    floor.pressButtonToMoveToDestinationFloor(person.destinationFloor);
    logFloorsState()
};



for (let index = 0; index < 100; index++) {
    // Generate random current floor and destination floor for person
    // And lets make sure those are different
    let currentFloor;
    let destinationFloor;

    do {
        currentFloor = Math.ceil(Math.random() * 12) - 2;
        destinationFloor = Math.ceil(Math.random() * 12) - 2;
    } while (currentFloor === destinationFloor)

    const person = new Person(currentFloor, destinationFloor);



    // Lets add person to the floor at random time in 2 minute window
    const timeToWait = Math.random() * 180000;
    setTimeout(() => {
        addPersonToTheFloor(person)
    }, timeToWait)
}

// Run elevator logic
setInterval(() => {
    if (numberOfPeopleThatHaveArrivedAtDestination >= numberOfPeople) {
        clearInterval(this)
    }
    elevatorDown.takeAction();
    elevatorUp.takeAction();
    logElevatorsState()
}, 1000)
