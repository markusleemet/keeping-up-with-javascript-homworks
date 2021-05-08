class Vehicle {
    constructor(make, model, year, weight, needsMaintenance = false, tripsSinceMaintenance = 0) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.needsMaintenance = needsMaintenance;
        this.tripsSinceMaintenance = tripsSinceMaintenance
    }

    setMake(make) {
        this.make = make;
    }

    setModel(model) {
        this.model = model;
    }

    setYear(year) {
        this.year = year
    }

    setWeight(weight) {
        this.weight = weight
    }

    repair() {
        this.tripsSinceMaintenance = 0;
        this.needsMaintenance = false;
    }
}

class Car extends Vehicle{
    constructor(make, model, year, weight, needsMaintenance, tripsSinceMaintenance, isDriving = false) {
        super(make, model, year, weight, needsMaintenance, tripsSinceMaintenance);
        this.isDriving = isDriving;
    }

    drive() {
        this.isDriving = true;
    }

    stop() {
        if (this.isDriving) {
            this.isDriving = false;
            this.tripsSinceMaintenance += 1;
            if (this.tripsSinceMaintenance > 100) {
                this.needsMaintenance = true;
            }
        }
    }
}


const car1 =  new Car('Toyota', 'Camry', 2000, 1200)
const randomTripsCount1 = Math.random() * 200;
for (let i = 0; i < randomTripsCount1; i++) {
    car1.drive();
    car1.stop();
}


const car2 =  new Car('Dacia', 'Duster', 2020, 1000)
const randomTripsCount2 = Math.random() * 200;
for (let i = 0; i < randomTripsCount2; i++) {
    car2.drive();
    car2.stop();
}

const car3 =  new Car('Opel', 'Astra', 1990, 1312)
const randomTripsCount3 = Math.random() * 200;
for (let i = 0; i < randomTripsCount3; i++) {
    car3.drive();
    car3.stop();
}


console.log(car1);
console.log(car2);
console.log(car3);


class Plane extends Vehicle {
    constructor(make, model, year, weight, needsMaintenance, tripsSinceMaintenance, isFlying = false) {
        super(make, model, year, weight, needsMaintenance, tripsSinceMaintenance);
        this.isFlying = isFlying;
    }

    fly() {
        if (this.needsMaintenance) {
            throw 'Plane can\'t fly until it\'s repaired.'
        }
        this.isFlying = true;
    }

    land() {
        this.isFlying = false;
        this.tripsSinceMaintenance += 1;
        if (this.tripsSinceMaintenance  > 100) {
            this.needsMaintenance = true;
        }
    }
}

const plane = new Plane('PlaneMaker', 'planeModel', 2000, 100000);
for (let i = 0; i < 150; i++) {
    plane.fly();
    plane.land();
}
