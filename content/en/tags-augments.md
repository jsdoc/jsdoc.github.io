---
tag: augments
description: This object adds onto a parent object.
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

The @augments or @extends tag marks a symbol as augmenting another symbol.

While current versions of JavaScript don't allow classes or subclasses in the same way that
class-based languages like Java do, many programmers choose to think of their code structure in
these terms. For this purpose JSDoc provides the @class and @extends tags. If you wish to express a
similar relationship between two symbols, but don't wish to promote the classical analogy, you can
use the @constructor and @augments tags instead.


## Examples

In the example below I wish to document the fact that Ducks are a specialised form of Animal:
meaning that Duck instances are like Animal instances which have been augmented with additional
properties.

{% example "Documenting a class/subclass type of relationship." %}

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
d.speak();
```
{% endexample %}

A related pattern can be documented with the @mixin and @mixes tags. Or, if the augmented symbol is
only reusing one or two members of another symbol, you may find the @borrows tag more convenient.
