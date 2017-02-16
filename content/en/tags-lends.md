---
tag: lends
description: Document properties on an object literal as if they belonged to a symbol with a given name.
related:
    - tags-borrows.html
    - tags-constructs.html
---

## Syntax

`@lends <namepath>`


## Overview

The `@lends` tag allows you to document all the members of an object literal as if they were members
of a symbol with the given name. You might want to do this if you are passing an object literal into
a function that creates a named class from its members.


## Examples

In this example, we want to use a helper function to make a class named `Person`, along with
instance methods named `initialize` and `say`. This is similar to how some popular frameworks
handle class creation.

{% example "Example class" %}

```js
// We want to document this as being a class
var Person = makeClass(
    // We want to document these as being methods
    {
        initialize: function(name) {
            this.name = name;
        },
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```
{% endexample %}

Without any comments, JSDoc won't recognize that this code creates a `Person` class with two
methods. To document the methods, we must use a `@lends` tag in a doc comment immediately before the
object literal. The `@lends` tag tells JSDoc that all the member names of that object literal are
being "loaned" to a variable named `Person`. We must also add comments to each of the methods.

The following example gets us closer to what we want:

{% example "Documented as static methods" %}

```js
/** @class */
var Person = makeClass(
    /** @lends Person */
    {
        /**
         * Create a `Person` instance.
         * @param {string} name - The person's name.
         */
        initialize: function(name) {
            this.name = name;
        },
        /**
         * Say something.
         * @param {string} message - The message to say.
         * @returns {string} The complete message.
         */
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```
{% endexample %}

Now the functions named `initialize` and `say` will be documented, but they appear as static methods
of the `Person` class. That is possibly what you meant, but in this case we want `initialize` and
`say` to belong to the instances of the `Person` class. So we change things slightly by lending the
methods to the class's prototype:

{% example "Documented as instance methods" %}

```js
/** @class */
var Person = makeClass(
    /** @lends Person.prototype */
    {
        /**
         * Create a `Person` instance.
         * @param {string} name - The person's name.
         */
        initialize: function(name) {
            this.name = name;
        },
        /**
         * Say something.
         * @param {string} message - The message to say.
         * @returns {string} The complete message.
         */
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```
{% endexample %}

One final step: Our class framework uses the loaned `initialize` function to construct `Person`
instances, but a `Person` instance does not have its own `initialize` method. The solution is to add
the `@constructs` tag to the loaned function. Remember to remove the `@class` tag as well, or else
two classes will be documented.

{% example "Documented with a constructor" %}

```js
var Person = makeClass(
    /** @lends Person.prototype */
    {
        /**
         * Create a `Person` instance.
         * @constructs
         * @param {string} name - The person's name.
         */
        initialize: function(name) {
            this.name = name;
        },
        /**
         * Say something.
         * @param {string} message - The message to say.
         * @returns {string} The complete message.
         */
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```
{% endexample %}
