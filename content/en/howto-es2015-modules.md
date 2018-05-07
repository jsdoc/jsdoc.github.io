---
title: ES 2015 Modules
description: How to add JSDoc comments to ECMAScript 2015 modules.
related:
    - about-namepaths.html
    - tags-module.html
---

JSDoc 3 makes it possible to document modules that follow the [ECMAScript 2015
specification][es2015-modules]. ES 2015 modules are supported in JSDoc 3.4.0 and later.


## Module identifiers

When you document an ES 2015 module, you'll use a [`@module` tag][module-tag] to document the
identifier for the module. For example, if users load the module by calling `import * as myShirt
from 'my/shirt'`, you'll write a JSDoc comment that contains the tag `@module my/shirt`.

If you use the `@module` tag without a value, JSDoc will try to guess the correct module identifier
based on the filepath.

When you use a JSDoc [namepath][namepaths] to refer to a module from another JSDoc comment, you must
add the prefix `module:`. For example, if you want the documentation for the module `my/pants` to
link to the module `my/shirt`, you could use the [`@see` tag][see-tag] to document `my/pants` as
follows:

```js
/**
 * Pants module.
 * @module my/pants
 * @see module:my/shirt
 */
```

Similarly, the namepath for each member of the module will start with `module:`, followed by the
module name. For example, if your `my/pants` module exports a `Jeans` class, and `Jeans` has an
instance method named `hem`, the instance method's longname is `module:my/pants.Jeans#hem`.

[module-tag]: tags-module.html
[namepaths]: about-namepaths.html
[see-tag]: tags-see.html


## Exported values

The following example shows how to document different kinds of exported values in an ES 2015 module.
In most cases, you can simply add a JSDoc comment to the `export` statement that defines the
exported value. If you are exporting a value under another name, you can document the exported value
within its `export` block.

{% example "Documenting values exported by a module" %}

```js
/** @module color/mixer */

/** The name of the module. */
export const name = 'mixer';

/** The most recent blended color. */
export var lastColor = null;

/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexadecimal format.
 * @param {string} color2 - The second color, in hexadecimal format.
 * @return {string} The blended color.
 */
export function blend(color1, color2) {}

// convert color to array of RGB values (0-255)
function rgbify(color) {}

export {
    /**
     * Get the red, green, and blue values of a color.
     * @function
     * @param {string} color - A color, in hexadecimal format.
     * @returns {Array.&lt;number>} An array of the red, green, and blue values,
     * each ranging from 0 to 255.
     */
    rgbify as toRgb
}
```

{% endexample %}

[es2015-modules]: http://www.ecma-international.org/ecma-262/6.0/#sec-modules
