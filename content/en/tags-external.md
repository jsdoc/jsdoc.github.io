---
tag: external
description: Document an external class/namespace/module.
synonyms:
    - host
---

## Syntax

`@external <NameOfExternal>`


## Overview

The @external tag is used for documenting a class or namespace or module that is external to the
project. It is then known within JSDoc so you can [@extend][augments-tag] it, be a
[@memberof][memberof-tag] it and so on as you would any other class/namespace/module.

When you refer to an external object, prefix "external:" to it - for example, "{@link external:Foo}"
or "@augments external:Foo".

[augments-tag]: tags-augments.html
[memberof-tag]: tags-memberof.html


## Examples

{% example "Documenting methods added to built-in classes." %}

```js
/**
 * The built in string object.
 * @external String
 * @see {@link https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String String}
 */

/**
 * Adds a new method to the built-in string.
 * @function external:String#rot13
 * @example
 * var greeting = new String('hello world');
 * console.log( greeting.rot13() ); // uryyb jbeyq
 */
```
{% endexample %}

Suppose we added function `rot13` to the String class. The above adds documentation for the String
class as an external, allowing `rot13` to be properly documented as an instance member of String.

{% example "Documenting external namespaces." %}

```js
/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide}
 */

/**
 * A jQuery plugin to make stars fly around your home page.
 * @function external:"jQuery.fn".starfairy
 */
```
{% endexample %}

The above creates `jQuery.fn` as an external namespace, allowing us to document our `starfairy`
function as a member of it.

{% example "Extending an external." %}

```js
/**
 * Namespace provided by the browser.
 * @external XMLHttpRequest
 * @see https://developer.mozilla.org/en/xmlhttprequest
 */

/**
 * Extends the built in XMLHttpRequest to send data encoded with a secret key.
 * @class EncryptedRequest
 * @extends external:XMLHttpRequest
 */
```
{% endexample %}

One can even [@extend][augments-tag] an external. `EncryptedRequest` is a class that extends
(external) `XMLHttpRequest`.

[augments-tag]: tags-augments.html
