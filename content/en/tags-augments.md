---
tag: augments
description: Indicate that a symbol inherits from, and adds to, a parent symbol.
synonyms:
    - extends
related:
    - tags-borrows.html
    - tags-class.html
    - tags-mixes.html
    - tags-mixin.html
---

## Syntax

`@augments <namepath>`


## Overview

The `@augments` or` @extends` tag indicates that a symbol inherits from, and potentially adds to, a
parent symbol. You can use this tag to document both class-based and prototype-based inheritance.

In JSDoc 3.3.0 and later, if a symbol inherits from multiple parents, and both parents have
identically named members, JSDoc uses the documentation from the last parent that is listed in the
JSDoc comment.


## Examples

In the following example, the `Duck` class is defined as a subclass of `Animal`. `Duck` instances
have the same properties as `Animal` instances, as well as a `speak` method that is unique to `Duck`
instances.

{% example "Documenting a class/subclass relationship" %}

```js
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
function Duck() {}
Duck.prototype = new Animal();

/** What do ducks say? */
Duck.prototype.speak = function() {
    if (this.alive) {
        alert('Quack!');
    }
};

var d = new Duck();
d.speak(); // Quack!
d.alive = false;
d.speak(); // (nothing)
```
{% endexample %}

In the following example, the `Duck` class inherits from both the `Flyable` and `Bird` classes, both
of which define a `takeOff` method. Because the documentation for `Duck` lists `@augments Bird`
last, JSDoc automatically documents `Duck#takeOff` using the comment from `Bird#takeOff`.

{% example "Multiple inheritance with duplicated method names" %}

```js
/**
 * Abstract class for things that can fly.
 * @class
 */
function Flyable() {
    this.canFly = true;
}

/** Take off. */
Flyable.prototype.takeOff = function() {
    // ...
};

/**
 * Abstract class representing a bird.
 * @class
 */
function Bird(canFly) {
    this.canFly = canFly;
}

/** Spread your wings and fly, if possible. */
Bird.prototype.takeOff = function() {
    if (this.canFly) {
        this._spreadWings()
            ._run()
            ._flapWings();
    }
};

/**
 * Class representing a duck.
 * @class
 * @augments Flyable
 * @augments Bird
 */
function Duck() {}

// Described in the docs as "Spread your wings and fly, if possible."
Duck.prototype.takeOff = function() {
    // ...
};
```
{% endexample %}
