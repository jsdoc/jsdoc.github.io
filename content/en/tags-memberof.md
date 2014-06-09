---
tag: memberof
description: This symbol belongs to a parent symbol.
related:
    - tags-name.html
---

## Syntax

+ `@memberof <parentNamepath>`
+ `@memberof! <parentNamepath>`


## Overview

The @memberof tag identifies a member symbol that belongs to a parent symbol.

By default, the @memberof tag documents member symbols as static members. For inner and instance
members, you can use scoping punctuation after the namepath, or you can add the [@inner][inner-tag]
or [@instance][instance-tag] tag.

The "forced" @memberof tag, @memberof!, forces the object to be documented as belonging to a specific
parent even if it appears to have a different parent.

[inner-tag]: tags-inner.html
[instance-tag]: tags-instance.html


## Examples

In the following example, the `hammer` function would normally be documented as a global function.
That's because, in fact, it is a global function, but it is also a member of the `Tools` namespace,
and that's how you wish to document it. The solution is to add a @memberof tag:

{% example "Using @memberof" %}

```js
/** @namespace */
var Tools = {};

/** @memberof Tools */
var hammer = function() {
};

Tools.hammer = hammer;
```
{% endexample %}

For instance members of a class, use the syntax "@memberof ClassName.prototype" or "@memberof
ClassName#". Alternatively, you can combine "@memberof ClassName" with the "@instance" tag.

{% example "Using @memberof with a class prototype" %}

```js
/** @class Observable */
create(
    'Observable',
    {
        /**
         * This will be a static member, Observable.cache.
         * @memberof Observable
         */
        cache: [],

        /**
         * This will be an instance member, Observable#publish.
         * @memberof Observable.prototype
         */
        publish: function(msg) {},

        /**
         * This will also be an instance member, Observable#save.
         * @memberof Observable#
         */
        save: function() {},

        /**
         * This will also be an instance member, Observable#end.
         * @memberof Observable
         * @instance
         */
        end: function() {}
    }
);
```
{% endexample %}

The following example uses the forced @memberof tag, "@memberof!", to document a property of an
object (Data#point) that is an instance member of a class (Data).

When you use the @property tag to document a property, you cannot link to the property using its
longname. We can force the property to be linkable by using "@alias" and "@memberof!" to tell JSDoc
that Data#point.y should be documented as a member "point.y" of "Data#", rather than a member "y" of
"point" of "Data#".

{% example "Using @memberof! for object properties" %}

```js
/** @class */
function Data() {
    /**
     * @type {object}
     * @property {number} y This will show up as a property of `Data#point`,
     * but you cannot link to the property as {@link Data#point.y}.
     */
    this.point = {
        /**
         * The @alias and @memberof! tags force JSDoc to document the
         * property as `point.x` (rather than `x`) and to be a member of
         * `Data#`. You can link to the property as {@link Data#point.x}.
         * @alias point.x
         * @memberof! Data#
         */
        x: 0,
        y: 1
    };
}
```
{% endexample %}
