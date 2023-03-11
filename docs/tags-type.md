---
tag: type
description: Document the type of an object.
related:
    - tags-callback.html
    - tags-typedef.html
    - tags-param.html
    - tags-property.html
---

## Syntax

`@type {typeName}`

## Overview

The @type tag allows you to provide a type expression identifying the type of value that a symbol
may contain, or the type of value returned by a function. You can also include type expressions with
many other JSDoc tags, such as the [@param tag][param-tag].

A type expression can include the JSDoc namepath to a symbol (for example, `myNamespace.MyClass`); a
built-in JavaScript type (for example, `string`); or a combination of these. You can use any
[Google Closure Compiler type expression][closure], as well as several other formats that are
specific to JSDoc.

If JSDoc determines that a type expression is invalid, it will display an error and stop running.
You can turn this error into a warning by running JSDoc with the `--lenient` option.

**Note**: Full support for Google Closure Compiler-style type expressions is available
in JSDoc 3.2 and later. Earlier versions of JSDoc included partial support for Closure Compiler type
expressions.

Each type is specified by providing a type expression, using one of the formats described below.
Where appropriate, JSDoc will automatically create links to the documentation for other symbols. For
example, `@type {MyClass}` will link to the MyClass documentation if that symbol has been
documented.

<table id="jsdoc-types" name="jsdoc-types">
<tr>
    <th>Type name</th>
    <th>Syntax examples</th>
    <th>Description</th>
</tr>

<tr>
    <td>Symbol name (name expression)</td>
    <td>
        <pre><code>
{`{boolean}
{myNamespace.MyClass}`}
        </code></pre>
    </td>
    <td>
        <p>
            Specifies the name of a symbol. If you have documented the symbol, JSDoc creates a link to the
            documentation for that symbol.
        </p>
    </td>
</tr>

<tr>
    <td>Multiple types (type union)</td>
    <td>
        <b><i>* This can be a number or a boolean.</i></b>
        <pre><code>
            {`{(number|boolean)}`}
        </code></pre>
    </td>
    <td>
        <p>
            This means a value can have one of several types, with the entire list of types enclosed in
            parentheses and separated by <code>|</code>.
        </p>
    </td>
</tr>

<tr>
    <td>Arrays and objects (type applications and record types)</td>
    <td>
        <b><i>* An array of MyClass instances.</i></b>
        <pre><code>
{`{Array.<MyClass>}
// or:
{MyClass[]}`}
        </code></pre>
        <b><i>* An object with string keys and number values.</i></b>
        <pre><code>
            {`{Object.<string, number>}`}
        </code></pre>
        <b><i>* An object called 'myObj' with properties 'a' (a number), 'b' (a string) and 'c' (any type).</i></b>
        <pre><code>
{`{{a: number, b: string, c}} myObj
// or:
{Object} myObj
{number} myObj.a
{string} myObj.b
{*} myObj.c`}
        </code></pre>
    </td>
    <td>
    <p>JSDoc supports Closure Compiler's syntax for defining array and object types.
</p>
    <p>
        You can also indicate an array by appending <code>[]</code> to the type that is contained in the
        array. For example, the expression <code>string[]</code> indicates an array of strings.
    </p>
    <p>
        For objects that have a known set of properties, you can use Closure Compiler's syntax for
        documenting record types. You can document each property individually, which enables you to
        provide more detailed information about each property.
    </p>
    </td>
</tr>

<tr>
    <td>Nullable type</td>
<td>
    <b><i>* A number or null.</i></b>
    <pre><code>{`{?number}`}</code></pre>
</td>
<td>
    <p>
        This indicates that the type is either the specified type, or <code>null</code>.
    </p>
</td>
</tr>

<tr>
<td>Non-nullable type</td>
<td>
    <b><i>* A number, but never null.</i></b>
    <pre><code>{`{!number}`}</code></pre>
</td>
<td>
    <p>
    Indicates that the value is of the specified type, but cannot be <code>null</code>.
    </p>
</td>
</tr>

<tr>
    <td>Variable number of that type</td>
    <td>
        <b><i>* This function accepts a variable number of numeric parameters.</i></b>
        <pre><code>{`@param {...number} num`}</code></pre>
    </td>
    <td>
        <p>
            Indicates that the function accepts a variable number of parameters, and specifies a type for the parameters. For example:
        </p>
        <pre><code>
{`/**
* Returns the sum of all numbers passed to the function.
* @param {...number} num A positive or negative number
*/
function sum(num) {
    var i=0, n=arguments.length, t=0;
    for (; i < n; i++) {
        t += arguments[i];
    }
    return t;
}`}
        </code></pre>
    </td>
</tr>

<tr>
<td>Optional parameter</td>
<td>
    <b><i>* An optional parameter named foo.</i></b>
    <pre><code>
{`@param {number} [foo]
// or:
@param {number=} foo`}
    </code></pre>
    <b><i>* An optional parameter foo with default value 1.</i></b>
    <pre><code>{`@param {number} [foo=1]`}</code></pre>
</td>
<td>
    <p>
        Indicates that the parameter is optional. When using JSDoc's syntax for optional parameters, you can also indicate the value that will be used if a parameter is omitted.
    </p>
</td>
</tr>

<tr>
    <td>Callbacks</td>
    <td>
        <pre><code>
{`/**
* @callback myCallback
* @param {number} x - ...
* /
`}
{`
/** @type {myCallback} */
var cb;
`}
        </code></pre>
    </td>
<td>
    <p>
        Document a callback using the <a href="tags-callback">@callback</a> tag. The syntax is identical to the @typedef tag, except that a callback's type is always "function."
    </p>
</td>
</tr>

<tr>
    <td>Type definitions</td>
    <td>
        <b><i>* Documenting a type with properties 'id', 'name', 'age'.</i></b>
        <pre><code>
{`/**
* @typedef PropertiesHash
* @type {object}
* @property {string} id - an ID.
* @property {string} name - your name.
* @property {number} age - your age.
*/ 
`}
{`
/** @type {PropertiesHash} */
var props;
`}
        </code></pre>
    </td>
    <td>
        <p>
            You can document complex types using the <a href="tags-typedef">@typedef</a> tag, then refer to the type definition elsewhere in your documentation.
        </p>
    </td>
</tr>
</table>

## Examples

-   Example

```js
/** @type {(string|Array.<string>)} */
var foo;
/** @type {number} */
var bar = 1;
```

In many cases, you can include a type expression as part of another tag, rather than including a
separate @type tag in your JSDoc comment.

-   Type expressions can accompany many tags.

```js
/**
 * @type {number}
 * @const
 */
var FOO = 1;

// same as:

/** @const {number} */
var FOO = 1;
```

[closure]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#type-expressions
[param-tag]: tags-param
