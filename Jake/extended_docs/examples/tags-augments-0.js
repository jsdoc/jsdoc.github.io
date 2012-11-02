/**
 * @constructor
 */
function Animal() {
    /** Is this animal alive? */
    this.alive = true;
}

/**
 * @constructor
 * @augments Animal
 */
function Duck() {
}
Duck.prototype = new Animal();

/** What do ducks say? */
Duck.prototype.speak = function() {
    if (this.alive) {
        alert('Quack!');
    }
}

var d = new Duck();
d.speak(); // Quack!
d.alive = false; // dead duck?
d.speak;
