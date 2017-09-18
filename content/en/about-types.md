---
title: Types
description: The JSDoc type system.
---

JSDoc allows you to specify type expressions identifying the type of value that a symbol may
contain, a parameter type, or the type of a value returned by a function. These type expressions
are specified with the [`@type` tag][type-tag], the [`@param` tag][param-tag], and many others.

[type-tag]: tags-type.html
[param-tag]: tags-param.html

## Overview

A type expression can include the JSDoc namepath to a symbol (for example, `myNamespace.MyClass`); a
built-in JavaScript type (for example, `string`); or a combination of these. You can use any
[Google Closure Compiler type expression][closure], as well as several other formats that are
specific to JSDoc.

If JSDoc determines that a type expression is invalid, it will display an error message. To force JSDoc to stop running when a type expression is invalid, use the `--pedantic` option.

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
{% example %}
<pre class="prettyprint"><code>{boolean}
{myNamespace.MyClass}
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  Specifies the name of a symbol. If you have documented the symbol, JSDoc creates a link to the
  documentation for that symbol.
  </p>
 </td>
</tr>

<tr>
 <td>
  Multiple types (type union)
 </td>
 <td>
{% example "This can be a number or a boolean." %}
<pre class="prettyprint"><code>{(number|boolean)}
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  This means a value can have one of several types, with the entire list of types enclosed in
  parentheses and separated by <code>|</code>. The parentheses are suggested for Closure Compiler,
  but may be omitted in JSDoc.
  </p>
 </td>
</tr>

<tr>
 <td>
  Arrays and objects (type applications and record types)
 </td>
 <td>
{% example "An array of MyClass instances." %}
<pre class="prettyprint"><code>{Array.&lt;MyClass&gt;}
// or:
{MyClass[]}
</code></pre>
{% endexample %}

{% example "An object with string keys and number values:" %}
<pre class="prettyprint"><code>{Object.&lt;string, number&gt;}
</code></pre>
{% endexample %}

{% example "An object called 'myObj' with properties 'a' (a number), 'b' (a string), and 'c' (any type)." %}
<pre class="prettyprint"><code>&#123;{a: number, b: string, c}} myObj
// or:
{Object} myObj
{number} myObj.a
{string} myObj.b
{&ast;} myObj.c
</code></pre>
{% endexample %}
 </td>
 <td><p>
  JSDoc supports Closure Compiler's syntax for defining array and object types.
  <p>
  <p>
  You can also indicate an array by appending <code>[]</code> to the type that is contained in the
  array. For example, the expression <code>string[]</code> indicates an array of strings.
  </p>
  <p>
  For objects that have a known set of properties, you can use Closure Compiler's syntax for
  documenting record types. As an alternative, you can document each property individually, which
  enables you to provide more detailed information about each property.
  </p>
 </td>
</tr>

<tr>
 <td>
  Nullable type
 </td>
 <td>
{% example "A number or null." %}
<pre class="prettyprint"><code>{?number}
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  This indicates that the type is either the specified type, or <code>null</code>.
  </p>
 </td>
</tr>

<tr>
 <td>
  Non-nullable type
 </td>
 <td>
{% example "A number, but never null." %}
<pre class="prettyprint"><code>{!number}
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
   Indicates that the value is of the specified type, but cannot be <code>null</code>.
  </p>
 </td>
</tr>

<tr>
 <td>
  Variable number of that type
 </td>
 <td>
{% example "This function accepts a variable number of numeric parameters." %}
<pre class="prettyprint"><code>@param {...number} num
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  Indicates that the function accepts a variable number of parameters, and specifies a type for the
  parameters. For example:
  </p>
{% example %}
<pre class="prettyprint"><code>/&ast;&ast;
 &ast; Returns the sum of all numbers passed to the function.
 &ast; @param {...number} num A positive or negative number
 &ast;/
function sum(num) {
    var i=0, n=arguments.length, t=0;
    for (; i&lt;n; i++) {
        t += arguments[i];
    }
    return t;
}
</code></pre>
{% endexample %}
 </td>
</tr>

<tr>
 <td>
  Optional parameter
 </td>
 <td>
{% example "An optional parameter named foo." %}
<pre class="prettyprint"><code>@param {number} [foo]
// or:
@param {number=} foo
</code></pre>
{% endexample %}

{% example "An optional parameter foo with default value 1." %}
<pre class="prettyprint"><code>@param {number} [foo=1]
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  Indicates that the parameter is optional. When using JSDoc's syntax for optional parameters, you
  can also indicate the value that will be used if a parameter is omitted.
  </p>
 </td>
</tr>

<tr>
 <td>
  Callbacks
 </td>
 <td>
{% example %}
<pre class="prettyprint"><code>/&ast;&ast;
 &ast; @callback myCallback
 &ast; @param {number} x - ...
 &ast;/

/&ast;&ast; @type {myCallback} &ast;/
var cb;
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  Document a callback using the <a href="tags-callback.html"><code>@callback</code></a> tag. The
  syntax is identical to the <code>@typedef</code> tag, except that a callback's type is always
  <code>function</code>.
  </p>
 </td>
</tr>

<tr>
 <td>
  Type definitions
 </td>
 <td>
{% example "Documenting a type with properties 'id', 'name', 'age'." %}
<pre class="prettyprint"><code>/&ast;&ast;
 &ast; @typedef PropertiesHash
 &ast; @type {object}
 &ast; @property {string} id - an ID.
 &ast; @property {string} name - your name.
 &ast; @property {number} age - your age.
 &ast;/

/&ast;&ast; @type {PropertiesHash} &ast;/
var props;
</code></pre>
{% endexample %}
 </td>
 <td>
  <p>
  You can document complex types using the <a href="tags-typedef.html">@typedef</a> tag, then refer
  to the type definition elsewhere in your documentation.
  </p>
 </td>
</tr>
</table>

[closure]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#type-expressions
[param-tag]: tags-param.html