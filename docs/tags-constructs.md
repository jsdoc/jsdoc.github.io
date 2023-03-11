---
tag: constructs
description: This function member will be the constructor for the previous class.
related:
    - tags-lends.html
---

## Overview

When using an object literal to define a class (for example with the `@lends` tag) the `@constructs`
tag allows you to document that a particular function will be used to construct instances of that
class.


## Syntax

`@constructs [<name>]`


## Examples

- **Using the @constructs tag with @lends**

```js
var Person = makeClass(
    /** @lends Person.prototype */
    {
        /** @constructs */
        initialize: function(name) {
            this.name = name;
        },
        /** Describe me. */
        say: function(message) {
            return this.name + " says: " + message;
        }
    }
);
```


- **Without @lends you must provide the name of the class**

```js
makeClass('Menu',
    /**
     * @constructs Menu
     * @param items
     */
    function (items) { },
    {
        /** @memberof Menu# */
        show: function(){
        }
    }
);
```

