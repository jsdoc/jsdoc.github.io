---
tag: param
description: Document the parameter to a function.
synonyms:
    - arg
    - argument
related:
    - tags-callback.html
    - tags-returns.html
    - tags-type.html
    - tags-typedef.html
---

## Overview

The `@param` tag provides the name, type, and description of a function parameter.

The `@param` tag requires you to specify the name of the parameter you are documenting. You can also
include the parameter's type, enclosed in curly brackets, and a description of the parameter.

The parameter type can be a built-in JavaScript type, such as `string` or `Object`, or a
[JSDoc namepath][namepath] to another symbol in your code. If you have written documentation for the
symbol at that namepath, JSDoc will automatically link to the documentation for that symbol. You can
also use a type expression to indicate, for example, that a parameter is not nullable or can accept
any type; see the [`@type` tag documentation][type-tag] for details.

If you provide a description, you can make the JSDoc comment more readable by inserting a hyphen
before the description. Be sure to include a space before and after the hyphen.

[namepath]: about-namepaths.html
[type-tag]: tags-type.html


## Examples

### Names, types, and descriptions
The following examples show how to include names, types, and descriptions in a `@param` tag.

{% example "Name only" %}

```js
/**
 * @param somebody
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```
{% endexample %}

{% example "Name and type" %}

```js
/**
 * @param {string} somebody
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```
{% endexample %}

{% example "Name, type, and description" %}

```js
/**
 * @param {string} somebody Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```
{% endexample %}

You can add a hyphen before the description to make it more readable. Be sure to include a space
before and after the hyphen.

{% example "Name, type, and description, with a hyphen before the description" %}

```js
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```
{% endexample %}

### Parameters with properties
If a parameter is expected to have a specific property, you can document that property by providing
an additional `@param` tag. For example, if an `employee` parameter is expected to have `name` and
`department` properties, you can document it as follows:

{% example "Documenting a parameter's properties" %}

```js
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function(employee) {
    // ...
};
```
{% endexample %}

If a parameter is destructured without an explicit name, you can give the object an appropriate one and
document its properties.

{% example "Documenting a destructuring parameter" %}
```js
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function({ name, department }) {
    // ...
};
```
{% endexample %}

You can also combine this syntax with JSDoc's syntax for array parameters. For example, if multiple
employees can be assigned to a project:

{% example "Documenting properties of values in an array" %}

```js
/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
Project.prototype.assign = function(employees) {
    // ...
};
```
{% endexample %}

### Optional parameters and default values
The following examples show how to indicate that a parameter is optional and has a default value.

{% example "An optional parameter (using JSDoc syntax)" %}

```js
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}
```
{% endexample %}

{% example "An optional parameter (using Google Closure Compiler syntax)" %}

```js
/**
 * @param {string=} somebody - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}
```
{% endexample %}

{% example "An optional parameter and default value" %}

```js
/**
 * @param {string} [somebody=John Doe] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
}
```
{% endexample %}

### Multiple types and repeatable parameters
The following examples show how to use type expressions to indicate that a parameter can accept
multiple types (or any type), and that a parameter can be provided more than once. See the
[`@type` tag documentation][type-tag] for details about the type expressions that JSDoc supports.

{% example "Allows one type OR another type (type union)" %}

```js
/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    } else if (Array.isArray(somebody)) {
        somebody = somebody.join(', ');
    }
    alert('Hello ' + somebody);
}
```
{% endexample %}

{% example "Allows any type" %}

```js
/**
 * @param {*} somebody - Whatever you want.
 */
function sayHello(somebody) {
    console.log('Hello ' + JSON.stringify(somebody));
}
```
{% endexample %}

{% example "Allows a parameter to be repeated" %}

```js
/**
 * Returns the sum of all numbers passed to the function.
 * @param {...number} num - A positive or negative number.
 */
function sum(num) {
    var i = 0, n = arguments.length, t = 0;
    for (; i &lt; n; i++) {
        t += arguments[i];
    }
    return t;
}
```
{% endexample %}

### Callback functions
If a parameter accepts a callback function, you can use the [`@callback` tag][callback-tag] to
define a callback type, then include the callback type in the `@param` tag.

{% example "Parameters that accept a callback" %}

```js
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */

/**
 * Does something asynchronously and executes the callback on completion.
 * @param {requestCallback} cb - The callback that handles the response.
 */
function doSomethingAsynchronously(cb) {
    // code
};
```
{% endexample %}

[callback-tag]: tags-callback.html
[type-tag]: tags-type.html
