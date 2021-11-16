class Entity {
    constructor(name, race) {
        this.name = name;
        this.race = race;
        this.age = 1;
        this.offsprings = 0
        this.dead = false;
    }

    clone() {
        this.age++;
        this.endLifeCycle();
        let nr = Math.floor(Math.random() * 10000);
        if (nr > 9940) {
            return true
        }

        return false
    }

    endLifeCycle() {
        let nr = this.getRandomInt(1500, 2500)
        if(this.age > nr) this.dead = true;
        
    }

    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Entity