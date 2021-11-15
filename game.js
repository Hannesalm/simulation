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

let life = 0;

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

const loop = () => {
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
            }
        }


    }
    if (planets.length) {
        planets.forEach(planet => {
            planet.offspring();
        });
    }

    if (seconds === 60) {
        minutes++;
        seconds = 0;
        if (planets.length) printPlanets();
        // console.log(`${life} planets with life`);
    }

    // Clear console?
    //console.log('\033[2J');
}

function printPlanets() {
    planets.forEach(planet => {
        console.log("Name: ", `'${planet.name}'`, "Population: ", planet.population.length);
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
        life++;
        return true
    }

    return false
}

loop()