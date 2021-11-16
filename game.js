var Human = require('./classes/Human.js');
var Planet = require('./classes/Planet.js');

const hrtimeMs = function () {
    let time = process.hrtime()
    return time[0] * 1000 + time[1] / 1000000
}

const TICK_RATE = 10
let tick = 0
let previous = hrtimeMs()
let tickLengthMs = 1000 / TICK_RATE

let seconds = 0;
let minutes = 0;
let frame = 0;

let print = true;

let planetNames = [
    "Mastraustea",
    "Gunnohines",
    "Zovarvis",
    "Onilles",
    "Yowei",
    "Yuiter",
    "Gribatera",
    "Morathea",
    "Zao F73",
    "Thagua 6TD]"
];

let genders = ['male', 'female']
let people = []
let peopleData = {
    total: 0,
    female: 0,
    male: 0,
    dead: 0,
    born: 0,
    families: 0,
    misscarage: 0,
}

let planets = [];

let longestTime = 0;

// function test() {
//     console.log("Running test...");
//     new Planet('testplaneten').init();
// };

// test();

const loop = () => {
    var t0 = performance.now();
    setTimeout(loop, tickLengthMs)
    let now = hrtimeMs()
    let delta = (now - previous) / 1000
    //console.log('delta', delta)
    // game.update(delta, tick) // game logic would go here
    previous = now
    tick++
    frame++;
    if (frame === TICK_RATE) {
        frame = 0
        seconds++
        if (planets.length < planetNames.length) {
            if (startLife()) {
                let nr = Math.floor(Math.random() * planetNames.length);
                let planet = new Planet(planetNames[nr]);
                planet.init();
                planets.push(planet)
                printPlanets();
                longestTime = 0;
            }
        }


    }
    if (planets.length) {
        planets.forEach(planet => {
            planet.offspring();
        });
    }

    if(seconds === 15 || seconds === 30 || seconds === 45) {
        if(print) {
            printPlanets();
            longestTime = 0;
            print = false;
        }
    }
    if(seconds === 16 || seconds === 31 || seconds === 46) {
        print = true;
    }

    if (seconds === 60) {
        minutes++;
        seconds = 0;
        if (planets.length) printPlanets();
        longestTime = 0;
        // console.log(`${life} planets with life`);
    }
    var t1 = performance.now();
    let time = (t1 - t0);
    if(time > longestTime) longestTime = time;
    // Clear console?
    //console.log('\033[2J');
}

function printPlanets() {
    console.log(`<--------- Year ${minutes}, longest execute ${longestTime.toFixed(2)} ms --------->`);
    planets.forEach(planet => {
        let oldest = 0;
        let offsprings = 0;
        let most = {name: "none"};
        planet.population.forEach(entity => {
            if(entity.age > oldest) oldest = entity.age;
            if(entity.offsprings > offsprings) {
                offsprings = entity.offsprings;
                most.name = entity.name;
            }
        })
        //let dead = planet.population.filter(t => t.dead);
        console.log("Name:",`'${planet.name}'`, "Type:",`'${planet.type}'`, "Population:", planet.population.length, "Oldest:", oldest, "Dead:", planet.died, `Cloned ${offsprings}, ${most.name}`);
    })
}


function initData() {
    let adam = new Human('Adam', 'male', null, 100, 'sweden', 100);
    let eve = new Human('Eve', 'female', null, 100, 'sweden', 100);
    adam.partner = eve;
    eve.partner = adam;
    adam.havePartner = true;
    eve.havePartner = true;
    people.push(adam);
    people.push(eve);
    peopleData.total++;
    peopleData.total++;
    // contries['sweden'].population++;
    // contries['sweden'].population++;
    //addFamily(adam, eve);
}

function startLife() {

    let nr = Math.floor(Math.random() * 100000);
    if (nr > 90000) {
        //console.log("Life emerges!", nr);
        return true
    }

    return false
}

loop()