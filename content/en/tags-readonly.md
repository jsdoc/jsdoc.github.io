---
tag: readonly
description: This symbol is meant to be read-only.
---

## Overview

The @readonly tag indicates that a symbol is intended to be read-only. Note this is for the purpose
of documentation only - JSDoc won't check whether you've _actually_ treated the symbol as read-only
in your code.


## Examples

{% example "Using the @readonly tag" %}

```js
/**
 * A constant.
 * @readonly
 * @const {number}
 */
const FOO = 1;
```
{% endexample %}

{% example "Using the @readonly tag with a getter" %}

```js
/**
 * Options for ordering a delicious slice of pie.
 * @namespace
 */
var pieOptions = {
	/**
	 * Plain.
	 */
	plain: 'pie',
	/**
	 * A la mode.
	 * @readonly
	 */
	get aLaMode() {
		return this.plain + ' with ice cream';
	}
};
```
{% endexample %}
