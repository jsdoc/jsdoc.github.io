---
title: Using namepaths with JSDoc 3
description: A guide to using namepaths with JSDoc 3.
related:
    - about-block-inline-tags.html
    - tags-inline-link.html
---

## Namepaths in JSDoc 3

When referring to a JavaScript variable that is elsewhere in your documentation, you must provide a unique identifier that maps to that variable. A namepath provides a way to do so and disambiguate between instance members, static members and inner variables.

{% example "Basic Syntax Examples of Namepaths in JSDoc 3" %}

```
myFunction
MyConstructor
MyConstructor#instanceMember
MyConstructor.staticMember
MyConstructor~innerMember // note that JSDoc 2 uses a dash
```
{% endexample %}

The example below shows: an _instance_ method named "say," an _inner_ function also named "say," and a _static_ method also named "say." These are three distinct methods that all exist independently of one another.

{% example "Use a documentation tag to describe your code." %}

```js
/** @constructor */
Person = function() {
    this.say = function() {
        return "I'm an instance.";
    }

    function say() {
        return "I'm inner.";
    }
}
Person.say = function() {
    return "I'm static.";
}

var p = new Person();
p.say();      // I'm an instance.
Person.say(); // I'm static.
// there is no way to directly access the inner function from here
```
{% endexample %}

You would use three different namepath syntaxes to refer to the three different methods:

{% example "Use a documentation tag to describe your code." %}

```
Person#say  // the instance method named "say."
Person.say  // the static method named "say."
Person~say  // the inner method named "say."
```
{% endexample %}

You might wonder why there is a syntax to refer to an inner method when that method isn't directly accessible from outside the function it is defined in. While that is true, and thus the "~" syntax is rarely used, it _is_ possible to return a reference to an inner method from another method inside that container, so it is possible that some object elsewhere in your code might borrow an inner method.

Note that if a constructor has an instance member that is also a constructor, you can simply chain the namepaths together to form a longer namepath:

{% example "Use a documentation tag to describe your code." %}

```js
/** @constructor */
Person = function() {
    /** @constructor */
    this.Idea = function() {
        this.consider = function(){
            return "hmmm";
        }
    }
}

var p = new Person();
var i = new p.Idea();
i.consider();
```
{% endexample %}

In this case, to refer to the method named "consider," you would use the following namepath:
`Person#Idea#consider`


This chaining can be used with any combination of the connecting symbols: `# . ~`

{% example "Special cases: modules, externals and events." %}

```js
/** A module. Its name is module:foo/bar.
 * @module foo/bar
 */
/** The built in string object. Its name is external:String.
 * @external String
 */
/** An event. Its name is module:foo/bar.event:MyEvent.
 * @event module:foo/bar.event:MyEvent
 */
```
{% endexample %}

There are some special cases with namepaths: [@module][module-tag] names are prefixed by "module:", [@external][external-tag] names are prefixed by "external:", and [@event][event-tag] names are prefixed by "event:".

{% example "Namepaths of objects with special characters in the name." %}

```js
/** @namespace */
var chat = {
    /**
     * Refer to this by {@link chat."#channel"}.
     * @namespace
     */
    "#channel": {
        /**
         * Refer to this by {@link chat."#channel".open}.
         * @type {boolean}
         * @defaultvalue
         */
        open: true,
        /**
         * Internal quotes have to be escaped by backslash. This is
         * {@link chat."#channel"."say-\"hello\""}.
         */
        'say-"hello"': function (msg) {}
    }
};

/**
 * Now we define an event in our {@link chat."#channel"} namespace.
 * @event chat."#channel"."op:announce-motd"
 */
```
{% endexample %}

Above is an example of a namespace with "unusual" characters in its member names (the hash character, dashes, even quotes).
To refer to these you just need quote the names: chat."#channel", chat."#channel"."op:announce-motd", and so on.
Internal quotes in names should be escaped with backslashes: chat."#channel"."say-\"hello\"".

[event-tag]: tags-event.html
[external-tag]: tags-external.html
[module-tag]: tags-module.html
