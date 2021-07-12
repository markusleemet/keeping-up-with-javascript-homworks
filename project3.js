// Floor class represents floor which can have one or more persons who want to change floors
class Floor {
    constructor(floorNumber, upButton, downButton) {
        this.floorNumber = floorNumber;
        this.upButton = upButton;
        this.downButton = downButton;
        this.persons = [];
    }

    // Function adds person to floor that wants to move to another floor using elevator
    addPerson(person) {
        this.persons.push(person);
    }

    movePersonToTheElevator(person, elevator) {
        // Check if this is possible
        if (person.currentFloor === elevator.currentFloor && person.currentFloor === this.floorNumber) {
            elevator.takeOnPerson(person);
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

// This class represents persons who have current floor and destination floor
class Person {
    constructor(currentFloor, destinationFloor) {
        this.currentFloor = currentFloor;
        this.destinationFloor = destinationFloor;
        this.timeStart = Date.now(); // represents time when person starts his/her travel to the different floor
        this.exitFloor = destinationFloor
    }


    getTotalTravelTime() {
        return Date.now() - this.timeStart
    }

    setExitFloor(exitFloor) {
        this.exitFloor = exitFloor;
    }
}

class Elevator{
    constructor(maxFloor, minFloor, directionUp, idleFloor) {
        this.idle = true;
        this.idleFloor = idleFloor;
        this.persons = [];
        this.directionUp = directionUp;
        this.currentFloor = 0;
        this.maxFloor = maxFloor;
        this.minFloor = minFloor;
        this.emergency = false;
        this.activatedButtons = [];
    }

    moveUp() {
        if (this.currentFloor < this.maxFloor) {
            setTimeout(() => {
                this.currentFloor += 1;
                this.action();
            }, 1000);
        }
    }

    moveDown() {
        if (this.currentFloor > this.minFloor) {
            setTimeout(() => {
                this.currentFloor -= 1;
                this.action();
            }, 1000);
        }
    }

    stayIdle() {
        setTimeout(() => {
            this.action();
        }, 1000);
    }

    pressEmergencyButton() {
        this.emergency = true;
    }

    pressResetButton() {
        this.emergency = false;
    }

    action() {
        if (this.directionUp) {
            if (this.activatedButtons.length) {
                this.moveUp();
            }
            const activatedUpButtons = getAllFloorsWithActiveUpButton();
            if (activatedUpButtons.length) {

                const minFloor = Math.min(activatedUpButtons)
            } else {
                this.moveToIdleFloor();
            }
        } else {
            const activatedDownButtons = getAllFloorsWithActiveUpButton();
            if (activatedDownButtons.length) {

            } else {
                this.moveToIdleFloor();
            }
        }
    }

    moveToIdleFloor() {
        if (this.currentFloor > this.idleFloor) {
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


const getFloor = (floorNumber) => {
    return allFloors.filter((floor) => floor.floorNumber === floorNumber)[0]
}

const getAllFloorsWithActiveUpButton = () => {
    return allFloors.filter((floor) => floor.upButtonActive)
};


const getAllFloorsWithActiveDownButton = () => {
    return allFloors.filter((floor) => floor.downButtonActive)
};


const addPersonToTheFloor = (person) => {
    // When person is added to the floor the correct elevator button is pressed automatically
    const floor = getFloor(person.currentFloor);
    floor.addPerson(person);
    floor.pressButtonToMoveToDestinationFloor(person.destinationFloor);
    console.log(`Person was added to the floor ${person.currentFloor} and he/she is going to floor ${person.destinationFloor}`)
};





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

// Lets make 2 elevators
const elevatorUp = new Elevator(10, 0, false);
const elevatorDown = new Elevator(9, -1, true);


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
    const timeToWait = Math.random() * 240000;
    setTimeout(() => {
        addPersonToTheFloor(person)
    }, timeToWait)
}
