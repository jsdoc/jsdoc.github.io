---
tag: external
description: Identifies an external class, namespace, or module.
synonyms:
    - host
---

## Syntax

`@external <NameOfExternal>`


## Overview

The `@external` tag identifies a class, namespace, or module that is defined outside of the current
package. By using this tag, you can document your package's extensions to the external symbol, or
you can provide information about the external symbol to your package's users. You can also refer to
the external symbol's namepath in any other JSDoc tag.

The namepath for an external symbol always uses the prefix `external:` (for example,
`{@link external:Foo}` or `@augments external:Foo`). However, you can omit this prefix from the
`@external` tag.

**Note**: You should only add the `@external` tag to the highest-level symbol that is defined
outside of your project. See "[Documenting a nested external symbol][nested-external]" for an
example.

[augments-tag]: tags-augments.html
[memberof-tag]: tags-memberof.html
[nested-external]: #nested-external-symbol

## Examples

The following example shows how to document the built-in `String` object as an external, along with
the new instance method `external:String#rot13`:

{% example "Documenting methods added to built-in classes" %}

```js
/**
 * The built in string object.
 * @external String
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String|String}
 */

/**
 * Create a ROT13-encoded version of the string. Added by the `foo` package.
 * @function external:String#rot13
 * @example
 * var greeting = new String('hello world');
 * console.log( greeting.rot13() ); // uryyb jbeyq
 */
```
{% endexample %}

The following example documents a new `starfairy` function added to the external namespace
`"jQuery.fn"`:

{% example "Documenting external namespaces" %}

```js
/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
 */

/**
 * A jQuery plugin to make stars fly around your home page.
 * @function external:"jQuery.fn".starfairy
 */
```
{% endexample %}

In the following example, the class `EncryptedRequest` is documented as a subclass of the built-in
class `XMLHttpRequest`:

{% example "Extending an external." %}

```js
/**
 * The built-in class for sending HTTP requests.
 * @external XMLHttpRequest
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */

/**
 * Extends the built-in `XMLHttpRequest` class to send data encoded with a secret key.
 * @class EncodedRequest
 * @extends external:XMLHttpRequest
 */
```
{% endexample %}

[augments-tag]: tags-augments.html

<a name="nested-external-symbol"></a>
You should only add the `@external` tag to the highest-level symbol that is defined outside of your
project. In the following example, the documentation refers to the external class
`security.TLS`. As a result, the `@external` tag is used to document the external namespace
`external:security`, but _not_ the external class `external:security.TLS`.

{% example "Documenting a nested external symbol" %}

```js
/**
 * External namespace for security-related classes.
 * @external security
 * @see http://example.org/docs/security
 */

/**
 * External class that provides Transport Layer Security (TLS) encryption.
 * @class TLS
 * @memberof external:security
 */
```
{% endexample %}
