class Human {
  constructor(name, gender, partner = null, fertility, home, immuneSystem) {
    this.name = name;
    this.gender = gender;
    this.partner = partner;
    this.havePartner = false;
    this.fertility = fertility;
    this.age = 1;
    this.home = home;
    this.dead = false;
    this.immuneSystem = immuneSystem;
  }

  updateAge() {
    if (this.age > 20) this.dead = true;
    else this.age++;
  }
}

module.exports = Human

/*
gender
age
skinColor
immuneSystem
Immunity []
Likelihood
Train (boost immune system)
Move (todo)
Eat healthy (boost immune system)
Parents
Mother
Father
*/
