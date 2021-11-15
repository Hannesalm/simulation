class Entity {
    constructor(name) {
        this.name = name;
        this.age = 1;
        this.offsprings = 0
    }

    clone() {
        let nr = Math.floor(Math.random() * 10000);
        if (nr > 9900) {
            return true
        }

        return false
    }
}

module.exports = Entity