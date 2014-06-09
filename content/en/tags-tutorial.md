---
tag: tutorial
description: Insert a link to an included tutorial file.
related:
    - about-tutorials.html
    - tags-link.html
    - tags-see.html
---

## Syntax

As a block tag:

`@tutorial <tutorialID>`

As an inline tag:

`{@tutorial <tutorialID>}`


## Overview

The @tutorial tag can be used both as a block and inline tag. It inserts a link to a tutorial file
that is provided as part of the documentation. See the [tutorials overview][tutorials] for
instructions on creating tutorials.

You can use the @tutorial tag more than once in a single JSDoc comment.

[tutorials]: about-tutorials.html


## Examples

In the following example, the documentation for MyClass will link to the tutorials that have the
identifiers tutorial-1 and tutorial-2:

{% example "Using the @tutorial block tag" %}

```js
/**
 * Description
 * @class
 * @tutorial tutorial-1
 * @tutorial tutorial-2
 */
function MyClass() {}
```
{% endexample %}

The following example inserts inline links to tutorial-1 and tutorial-2 within the description of
MyClass:

{% example "Using the @tutorial inline tag" %}

```js
/**
 * Description.
 * Check out {@tutorial tutorial-1} and {@tutorial tutorial-2}.
 * @class
 */
function MyClass() {}
```
{% endexample %}
