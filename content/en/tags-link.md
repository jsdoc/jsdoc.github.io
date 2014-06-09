---
tag: link
description: Inline tag - create a link.
related:
    - about-configuring-jsdoc.html
    - about-inline-tags.html
    - about-namepaths.html
    - tags-tutorial.html
---

## Syntax

+ `{@link someSymbol}`
+ `{@link http://some.url.com}`
+ `[caption here]{@link someSymbol}`
+ `[caption here]{@link http://some.url.com}`
+ `{@link someSymbol|caption here}`
+ `{@link http://some.url.com|caption here}`
+ `{@link http://some.url.com Caption Here (after the first space)}`
+ `{@link someSymbol Caption Here (after the first space)}`

The following work in the same way as @link but render in monospace or normal font respectively:

+ `{@linkcode ...}`
+ `{@linkplain ...}`


## Overview

The @link, @linkcode and @linkplain tags allow links to other documented objects or external URLs to
be created within doclets (i.e., within the content of other tags).

You need to use a symbol's full name to have it linked (e.g. `{@link MyNamespace.MyClass#property}`
rather than `MyClass#property`). Also, remember that [@module][module-tag]s,
[@external][external-tag]s and [@event][event-tag]s are prefixed by the tag name (e.g.
"module:myModule").

The {@link ...} tag creates a (HTML) link in the generated output to the specified symbol or URL. A
link caption different to the link itself may be provided using the syntax specified above. If the
linked object doesn't exist, then the output is kept as text rather than turned into a link.

By default, {@link ...} just generates the HTML `<a href="link URL">link text</a>`. It may be of
interest to have link texts always rendered in monospace, particularly if it's a link to another
code object. For example, you may want "{@link MY_CONSTANT}" to be rendered as
`<a href="#"><code>MY_CONSTANT</code></a>` rather than `<a href="#">MY_CONSTANT</a>`.

To achieve this one can use @linkcode. It is exactly the same as @link, but renders the link caption in monospace.
For example, "{@linkcode fooBar}" turns into `<a href="#"><code>fooBar</code></a>`.

The @linkplain tag is opposite to @linkcode; it ensures that the link text is kept as-is, i.e. _not_
turned into monospace.

If you want _all_ @links to be rendered in monospace by default, you can set the
`templates.monospaceLinks` option to true in your `conf.json`. If you want @links to be rendered in
normal text if they are links to external URLs (http, ftp) and in monospace otherwise, set the
`templates.cleverLinks` option to true in your `conf.json`. By default, all @links are rendered in
normal font. See the [configuring JSDoc][configuring] page for more information on setting these.

[configuring]: about-configuring-jsdoc.html
[event-tag]: tags-event.html
[external-tag]: tags-external.html
[module-tag]: tags-module.html


## Examples

{% example "Linking modules, externals and events." %}

```js
/** A module. Refer to it using {@link module:foo/bar}.
 * @module foo/bar
 */
/** The built in string object. Refer to it with {@link external:String}.
 * @external String
 */
/** An event. Refer to with {@link module:foo/bar.event:MyEvent}.
 * @event module:foo/bar.event:MyEvent
 */
```
{% endexample %}

{% example "Using @link" %}

```js
/** See {@link MyClass} and [MyClass's foo property]{@link MyClass#foo}.
 * Also check out {@link http://www.google.com|Google} and {@link http://github.com GitHub}.
 */
function myFunction() {}

/** A class.
 * @class */
function MyClass() {
    /** foo property */
    this.foo = 1;
}
```
{% endexample %}

The above produces (except that the first two links actually link to the generated documentation for
MyClass and MyClass#foo):

> See <a href="#">MyClass</a> and <a href="#">MyClass's foo property</a>. Also check out
> <a href="http://www.google.com">Google</a> and <a href="http://github.com">GitHub</a>.

{% example "Linking to unusually-named objects." %}

```js
/** @namespace */
var chat = {
    /** Refer to this by {@link chat."#channel"}.
     * @namespace */
    "#channel": {
        /** Refer to this by {@link chat."#channel".open}.
         * @type {boolean}
         * @defaultvalue */
        open: true,
        /** Internal quotes have to be escaped by backslash. This is
         * {@link chat."#channel"."say-\"hello\""}. */
        'say-"hello"': function (msg) {};
    }
};

/** Now we define an event in our {@link chat.#channel} namespace.
	@event chat."#channel"."op:announce-motd"
 */
```
{% endexample %}

Above is an example of a namespace with "unusual" characters in its member names. To refer to these
you just need quote the names: chat."#channel", chat."#channel"."op:announce-motd", and so on.
Internal quotes in names should be escaped with backslashes: chat."#channel"."say-\"hello\"".

{% example "Example with @linkplain and @linkcode" %}

```js
/**
 * This is a variable {@link FOO}, cleverLinks makes this monospace.
 * This is a link to external site {@link http://www.github.com|GitHub}, not monospace as it's external.
 * This is a link to {@linkplain FOO}, but we forced it not to be monospace.
 * This is a link to {@linkcode http://www.github.com GitHub}, but we forced it to be monospace.
 * @const
 */
var FOO = 1;
```
{% endexample %}

With the default configuration, this would produce:

> This is a variable <a href="#">FOO</a>, cleverLinks makes this monospace. This is a link to
> external site <a href="http://www.github.com">GitHub</a>, not monospace as it's external. This is
> a link to <a href="#">FOO</a>, but we forced it not to be monospace. This is a link to
> <a href="http://www.github.com"><code>GitHub</code></a>, but we forced it to be monospace.

If `templates.cleverLinks` was on, it would produce:

> This is a variable <a href="#"><code>FOO</code></a>, cleverLinks makes this monospace. This is a
> link to external site <a href="http://www.github.com">GitHub</a>, not monospace as it's external.
> This is a link to <a href="#">FOO</a>, but we forced it not to be monospace. This is a link to
> <a href="http://www.github.com"><code>GitHub</code></a>, but we forced it to be monospace.

If `template.monospaceLinks` was on instead, all the links would be monospace except for the
@linkplain.
