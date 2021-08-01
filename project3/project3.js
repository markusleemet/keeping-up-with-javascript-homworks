/*
----------------------
---ENV VARIABLES------
----------------------
*/

const NUMBER_OF_PEOPLE = 100;
const TIME_DO_DEPLOY_PEOPLE = 120 * 1000; // All persons are added to the floors in 2 minute window
const LOG_ELEVATOR_A = true;
const LOG_ELEVATOR_B = true;

let numberOfPeopleThatHaveArrivedAtDestination = 0;
let numberOfPeopleDeployed = 0;
let totalTimeTraveled = 0;




/*
---------------
---FLOORS------
---------------
*/

// Floor class represents floor which can have one or more persons who want to change floors
class Floor {
    constructor(floorNumber, hasUpButton, hasDownButton) {
        this.floorNumber = floorNumber;
        this.hasUpButton = hasUpButton;
        this.hasDownButton = hasDownButton;
        this.personsThatWantToGoUp = [];
        this.personsThatWantToGoDown = [];
    }

    // Press up button or throw error if that is not possible
    pressUpButton() {
        if (!this.hasUpButton) {
            throw `Can't press up button on floor ${this.floorNumber}`
        }
        this.upButtonActive = true;
    }

    // Press down button or throw error if that is not possible
    pressDownButton() {
        if (!this.hasDownButton) {
            throw `Can't press down button on floor ${this.floorNumber}`
        }
        this.downButtonActive = true;
    }

    // Add person to the floor and press button with right direction
    addPersonToFloor(person) {
        if (person.movingDirectionUp) {
            this.personsThatWantToGoUp.push(person);
            this.pressUpButton();
        } else {
            this.personsThatWantToGoDown.push(person);
            this.pressDownButton();
        }
    }

    // Handle moving person from floor to the elevator
    movePersonsToElevator(elevator) {
        if (elevator.currentFloor !== this.floorNumber){
            throw `Cant move persons from floor - ${this.floorNumber} to elevator that is on - ${elevator.currentFloor}`;
        }

        if (elevator.directionUp) {
            this.personsThatWantToGoUp.forEach(person => {
                elevator.persons.push(person);
            });

            this.personsThatWantToGoUp = [];
            this.upButtonActive = false;

            if (this.floorNumber === 10) {
                this.personsThatWantToGoDown.forEach(person => {
                    elevator.persons.push(person);
                });

                this.personsThatWantToGoDown = [];
                this.downButtonActive = false;
            }
        } else {
            this.personsThatWantToGoDown.forEach(person => {
                elevator.persons.push(person);
            });

            this.personsThatWantToGoDown = [];
            this.downButtonActive = false;

            if (this.floorNumber === -1) {
                this.personsThatWantToGoUp.forEach(person => {
                    elevator.persons.push(person);
                });

                this.personsThatWantToGoUp = [];
                this.upButtonActive = false;
            }
        }

        if (logThisElevator(elevator)) console.log(`Move persons from floor ${this.floorNumber} into elevator ${elevator.elevatorName}`);
    }

    // Handle moving person from elevator to the floor
    movePersonOutOfElevator(elevator, personToMoveOut) {
        if (elevator.currentFloor !== this.floorNumber){
            throw `Cant move persons from elevator that is on floor - ${elevator.currentFloor} to floor - ${this.floorNumber}`;
        }

        elevator.persons = elevator.persons.filter(person => person.id !== personToMoveOut.id)
        if (logThisElevator(elevator)) {
            console.log(`Perons ${personToMoveOut.id}(${personToMoveOut.startFloor} -> ${personToMoveOut.exitFloor} -> ${personToMoveOut.destinationFloor}) moved out from elevator ${elevator.elevatorName} to floor ${this.floorNumber}`)
        }

        if (personToMoveOut.destinationFloor === this.floorNumber) {
            numberOfPeopleThatHaveArrivedAtDestination++;
            totalTimeTraveled += personToMoveOut.getTotalTravelTime();
            if (logThisElevator(elevator)) {
                console.log(`Person ${personToMoveOut.id} has arrived at destination. Travel from floor ${personToMoveOut.startFloor} to ${this.floorNumber} took ${personToMoveOut.getTotalTravelTime()}s`)
                console.log(`Number of people deployed: ${numberOfPeopleDeployed}, number of people that have arrived at destination: ${numberOfPeopleThatHaveArrivedAtDestination}`)
            }
            return;
        }

        personToMoveOut.currentFloor = this.floorNumber;
        personToMoveOut.exitFloor = personToMoveOut.destinationFloor;
        this.addPersonToFloor(personToMoveOut);
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
---PERSON----
---------------
*/

// This class represents persons who have current floor and destination floor
class Person {
    constructor(currentFloor, destinationFloor, id) {
        this.id = id;
        this.startFloor = currentFloor;
        this.currentFloor = currentFloor;
        this.destinationFloor = destinationFloor;
        this.timeStart = undefined; // Is specified when person is added to floor
        this.movingDirectionUp = currentFloor < destinationFloor

        if (this.currentFloor === -1) {
            this.exitFloor = 0;
        } else if (this.currentFloor === 10) {
            this.exitFloor = 9;
        } else {
            this.exitFloor = destinationFloor;
        }
    }

    getTotalTravelTime() {
        return Math.round((Date.now() - this.timeStart) / 1000)
    }
}




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
        this.elevatorName = directionUp ? 'B' : 'A';
    }

    moveUp() {
        if (this.currentFloor === this.maxFloor) {
            throw `Elevator ${this.elevatorName} is at max floor - can't move up`
        }
        this.currentFloor += 1;
        if (logThisElevator(this)) console.log(`Elevator ${this.elevatorName}(passengers: ${this.persons.length}, called: [${this.directionUp ? getAllFloorsWithActiveUpButton() : getAllFloorsWithActiveDownButton()}], destinations: [${this.getDestinations()}]) is moving to floor ${this.currentFloor}`)
    }

    moveDown() {
        if (this.currentFloor === this.minFloor) {
            throw `Elevator ${this.elevatorName} is at min floor - can't move down`
        }
        this.currentFloor -= 1;
        if (logThisElevator(this)) console.log(`Elevator ${this.elevatorName}(passengers: ${this.persons.length}, called: [${this.directionUp ? getAllFloorsWithActiveUpButton() : getAllFloorsWithActiveDownButton()}], destinations: [${this.getDestinations()}]) is moving to floor ${this.currentFloor}`)
    }

    pressEmergencyButton() {
        this.emergency = true;
        if (logThisElevator(this)) console.log(`Emergency button is clicked - elevator ${this.elevatorName} wont move until reset button is clicked`)
    }

    pressResetButton() {
        this.emergency = false;
        if (logThisElevator(this)) console.log(`Reset button is clicked - elevator ${this.elevatorName} is functioning normally`)
    }

    movePeopleOut() {
        this.persons.forEach((person) => {
            if (person.exitFloor === this.currentFloor) {
                getFloor(this.currentFloor).movePersonOutOfElevator(this, person)
            }
        });
    }

    movePeopleIn() {
        getFloor(this.currentFloor).movePersonsToElevator(this);
    }

    shouldOpenDoorsToLetPeopleOut() {
        return this.persons.find((person) => person.exitFloor === this.currentFloor);
    }

    shouldOpenDoorsToLetPeopleIn() {
        let somebodyWantsToGetIn;
        if (this.directionUp) {
            somebodyWantsToGetIn = getFloor(this.currentFloor).personsThatWantToGoUp.length || (this.currentFloor === 10 && getFloor(this.currentFloor).personsThatWantToGoDown.length);
        } else {
            somebodyWantsToGetIn = getFloor(this.currentFloor).personsThatWantToGoDown.length || (this.currentFloor === -1 && getFloor(this.currentFloor).personsThatWantToGoUp.length);
        }

        const isMinMaxFloor = this.directionUp ? Math.min(...getAllFloorsWithActiveUpButton()) === this.currentFloor : Math.max(...getAllFloorsWithActiveDownButton()) === this.currentFloor;

        return somebodyWantsToGetIn && (isMinMaxFloor || this.persons.length);
    }

    elevatorIsCalled() {
        return this.directionUp ? !!getAllFloorsWithActiveUpButton().find((count) => count !== 0) : !!getAllFloorsWithActiveDownButton().find((count) => count !== 0);
    }

    getFarthestPersonFloor() {
        return this.directionUp ? Math.min(...getAllFloorsWithActiveUpButton()) : Math.max(...getAllFloorsWithActiveDownButton());
    }

    moveToFarthestPerson() {
        this.getFarthestPersonFloor() > this.currentFloor ? this.moveUp() : this.moveDown();
    }

    getDestinations() {
        if (this.persons.length) {
            return this.persons.map(person => person.exitFloor)
        }

        if (this.elevatorIsCalled()) {
            return this.getFarthestPersonFloor();
        }

        return 'IDLE'
    }

    // If elevator is not called and doesn't have passengers, move to the idle floor
    moveToIdleFloor() {
        if (this.currentFloor === this.idleFloor) {
            if (logThisElevator(this)) console.log(`Elevator ${this.elevatorName} IDLE at floor ${this.idleFloor}`)
            return;
        }

        this.directionUp ? this.moveDown() : this.moveUp();
    }

    takeAction() {
        if (this.emergency) {
            return;
        }

        if (this.shouldOpenDoorsToLetPeopleIn() && this.shouldOpenDoorsToLetPeopleOut()) {
            if (logThisElevator(this)) {}console.log(`Open elevator ${this.elevatorName} doors at floor ${this.currentFloor} to let people in and out`);

            this.movePeopleIn();
            this.movePeopleOut();

            if (logThisElevator(this)) {}console.log(`Close elevator ${this.elevatorName} doors at floor ${this.currentFloor} after letting people in and out`);

            return;
        }

        if (this.shouldOpenDoorsToLetPeopleIn()) {
            if (logThisElevator(this)) console.log(`Open elevator ${this.elevatorName} doors at floor ${this.currentFloor} to let people in`);

            this.movePeopleIn();

            if (logThisElevator(this)) console.log(`Close elevator ${this.elevatorName} doors at floor ${this.currentFloor} after letting people in`);

            return;
        }

        if (this.shouldOpenDoorsToLetPeopleOut()) {
            if (logThisElevator(this)) console.log(`Open elevator ${this.elevatorName} doors at floor ${this.currentFloor} to let people out`);

            this.movePeopleOut();

            if (logThisElevator(this)) console.log(`Close elevator ${this.elevatorName} doors at floor ${this.currentFloor} after letting people out`);

            return;
        }

        if (this.directionUp && this.currentFloor === this.maxFloor) {
            this.moveDown();
            return;
        }

        if (!this.directionUp && this.currentFloor === this.minFloor) {
            this.moveUp();
            return;
        }

        if (this.persons.length) {
            this.directionUp ? this.moveUp() : this.moveDown();
            return;
        }

        if (!this.elevatorIsCalled()) {
            this.moveToIdleFloor();
            return;
        }

        this.moveToFarthestPerson();
    }
}

// Lets make 2 elevators
const elevatorA = new Elevator(9, -1, false, 9);
const elevatorB = new Elevator(10, 0, true, 0);




/*
------------------
---SIMULATION----
------------------
*/

// Check if specified elevator actions should be logged or not
const logThisElevator = (elevator) => {
    return LOG_ELEVATOR_B && elevator.elevatorName === 'B' || LOG_ELEVATOR_A && elevator.elevatorName === 'A';
};

// Get floor instance with floor number
const getFloor = (floorNumber) => {
    return allFloors.find((floor) => floor.floorNumber === floorNumber)
}

// Get all the people that want to get on elevator B which takes people upwards
// That includes people from floor 10 who can't get on preferred downwards elevator
const getAllFloorsWithActiveUpButton = () => {

    const activeUpButtons =  allFloors.filter((floor) => floor.upButtonActive && floor.floorNumber !== -1).map((floor) => floor.floorNumber);

    if (getFloor(10).personsThatWantToGoDown.length) {
        activeUpButtons.push(10);
    }

    return activeUpButtons.sort((a, b) => a - b);
};

const logFinalResult = () => {
    console.log('----------------------')
    console.log(`Average time to get to the destination -> ${Math.round(totalTimeTraveled / NUMBER_OF_PEOPLE)}s`)
    console.log('----------------------')
}

// Get all the people that want to get on elevator A which takes people downwards
// That includes people from floor -1 who can't get on preferred upwards elevator
const getAllFloorsWithActiveDownButton = () => {

    const activeDownButtons = allFloors.filter((floor) => floor.downButtonActive && floor.floorNumber !== 10).map((floor) => floor.floorNumber);

    if (getFloor(-1).personsThatWantToGoUp.length) {
        activeDownButtons.push(-1);
    }

    return activeDownButtons.sort((a, b) => a - b);
};

// Add defined number of people to the random floors at random times
for (let index = 0; index < NUMBER_OF_PEOPLE; index++) {
    // Generate random current floor and destination floor for person
    // And lets make sure those are different
    let currentFloor;
    let destinationFloor;

    do {
        currentFloor = Math.floor(Math.random() * 12) - 1;
        destinationFloor = Math.floor(Math.random() * 12) - 1;
    } while (currentFloor === destinationFloor)

    const person = new Person(currentFloor, destinationFloor, index);

    // Lets add person to the floor at random time
    // And start persons stopper when added to the floor
    const timeToWait = Math.random() * TIME_DO_DEPLOY_PEOPLE;
    setTimeout(() => {
        person.timeStart = Date.now();
        getFloor(person.currentFloor).addPersonToFloor(person);
        numberOfPeopleDeployed++;
    }, timeToWait)
}

// Run elevator logic
// Each action takes 1 second for elevator(opening/closing doors, moving between floors)
const elevatorLogic = setInterval(() => {
    elevatorA.takeAction();
    elevatorB.takeAction();

    if (numberOfPeopleThatHaveArrivedAtDestination >= NUMBER_OF_PEOPLE) {
        clearInterval(elevatorLogic);
        logFinalResult();
    }
}, 1000)
