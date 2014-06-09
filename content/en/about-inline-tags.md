---
title: Inline tags
description: Details about the inline tags @link, @linkplain, @linkcode, and @tutorial.
related:
    - about-tutorials.html
    - about-namepaths.html
    - tags-tutorial.html
    - tags-link.html
---

JSDoc has several tags that can be used within a tag description. You can use these tags to create
links or cross-references to other parts of the documentation:

+ {@link}: Link to a JSDoc [namepath][namepaths] or an external URL. By default, links are rendered in plain text. If you prefer links to be rendered in a monospace font, you can use the [configuration options][config-options] `template.monospaceLinks` and `templates.cleverLinks` to change this behavior.
+ {@linkcode}: Insert a link that should be rendered in a monospace font.
+ {@linkplain}: Insert a link that should not be rendered in a monospace font.
+ {@tutorial}: Link to a tutorial.

Inline tags and their associated text must be enclosed in curly braces (`{` and `}`). If your tag text includes a closing brace, you must escape it with a backslash (`\`).

{% example "Enclosing inline tags in curly braces" %}

```js
/**
 * This description links to the {@link Macaroni} class.
 */
function Cheese() {
}
```
{% endexample %}

{% example "Escaping a closing braces in inline tags" %}

```js
/**
 * This description includes {@link Cheese|link text with {curly braces\}}.
 */
function Macaroni() {
}
```
{% endexample %}

[config-options]: about-configuring-jsdoc.html#configuration-file-templates
[namepaths]: about-namepaths.html


## Links to other symbols

The {@link}, {@linkcode}, and {@linkplain} tags allow you to link to other documented objects or external URLs within a doclet.

You need to use a symbol's full namepath to have it linked (for example, {@link MyNamespace.MyClass#property} rather than {@link MyClass#property}).
Also, remember that any [@module][module-tag], [@external][external-tag], or [@event][event-tag] must be prefixed by the tag name (for example, "module:myModule").

{% example "Linking to modules, externals, and events" %}

```js
/**
 * A module. Refer to it using {@link module:foo/bar}.
 * @module foo/bar
 */
/**
 * The built-in string object. Refer to it with {@link external:String}.
 * @external String
 */
/**
 * An event. Refer to with {@link module:foo/bar.event:MyEvent}.
 * @event module:foo/bar.event:MyEvent
 */
```
{% endexample %}

You can also link to symbols whose names include "unusual" characters (the hash character, dashes, even quotes).
To link to these, simply quote the names: `chat."#channel"`, `chat."#channel"."op:announce-motd"`, and so on.
Internal quotes in names should be escaped with backslashes: `chat."#channel"."say-\"hello\""`.
</p>

{% example "Linking to objects with special characters in the name" %}

```js
/** @namespace */
var chat = {
    /**
     * Refer to this as {@link chat."#channel"}.
     * @namespace
     */
    "#channel": {
        /**
         * Refer to this as {@link chat."#channel".open}.
         * @type {boolean}
         * @defaultvalue
         */
        open: true,
        /**
         * Internal quotes have to be escaped by a backslash. This is
         * {@link chat."#channel"."say-\"hello\""}.
         */
        'say-"hello"': function (msg) {};
    }
};

/**
 * Now we define an event in our {@link chat.#channel} namespace.
 * @event chat."#channel"."op:announce-motd"
 */
```
{% endexample %}

[event-tag]: tags-event.html
[external-tag]: tags-external.html
[module-tag]: tags-module.html


### The {@link} tag

The {@link} tag creates an HTML link in the generated output to the specified symbol or URL.
A link text may be provided using the forms specified above.
If link text is not provided, then the URL or namepath is used as the link text.
If the namepath doesn't exist, then the link is not created, although the link text is still displayed.

{% example "Syntax" %}

```
{@link someNamepathOrURL}
[link text here]{@link someNamepathOrURL}
{@link someNamepathOrURL|link text here}
{@link someNamepathOrURL Link text here (after the first space)}
```
{% endexample %}

{% example "Using {@link}" %}

```js
/**
 * See {@link MyClass} and [MyClass's foo property]{@link MyClass#foo}.
 * Also, check out {@link http://www.google.com|Google} and
 * {@link https://github.com GitHub}.
 */
function myFunction() {}

/**
 * A class.
 * @class
 */
function MyClass() {
    /** foo property */
    this.foo = 1;
}
```
{% endexample %}

The example above produces output similar to the following:

{% example "Output for {@link} tags" %}

```html
See &lt;a href="MyClass.html">MyClass&lt;/a> and &lt;a href="MyClass.html#foo">MyClass's foo
property&lt;/a>. Also, check out &lt;a href="http://www.google.com">Google&lt;/a> and
&lt;a href="https://github.com">GitHub&lt;/a>.
```
{% endexample %}

By default, {@link} generates standard HTML anchor tags. However, you may prefer to render certain
links in a monospace font, or to specify the format of individual links. JSDoc provides several ways
to control the format of links:

+ Use the [{@linkplain}][linkplain] tag to force a link's text to render in plain text.
+ Use the [{@linkcode}][linkcode] tag to force a link's text to render in monospace font.
+ Add a [configuration option][link-config] to change JSDoc's default rendering of {@link} tags.

**Note**: Although the default JSDoc template renders all of these tags correctly,
other templates may not recognize the {@linkplain} and {@linkcode} tags, and they may ignore the
configuration options for link rendering.

[link-config]: #configuring-link-output
[linkcode]: #the-linkcode-tag
[linkplain]: #the-linkplain-tag


### Configuring {@link} output

The [configuration options][template-config] `templates.monospaceLinks` and `templates.cleverLinks` can be used to specify how {@link} text is rendered.

By default, both options are switched off. Turn either of them on by modifying your `conf.json` file:

{% example "{@link} rendering options in conf.json" %}

```js
{
    "templates": {
        // In this example, we turn cleverLinks on.
        "cleverLinks": true,
        "monospaceLinks": false
    }
}
```
{% endexample %}

When `templates.monospaceLinks` is true, all {@link} tags appear in monospace font.
For example, "{@link asdf}" will become `<a href="#"><code>asdf</code></a>`.
Use [{@linkplain}][linkplain] to render a single link in plain text.

When `templates.cleverLinks` is true, a {@link} that points to an external URL appears in
plain text, while a {@link} to a JSDoc namepath will appear in monospace. Use {@linkplain} and
{@linkcode} to override this formatting for an individual link.

If _both_ options are true, `templates.cleverLinks` is used.

[linkplain]: #the-linkplain-tag
[template-config]: about-configuring-jsdoc.html


### The {@linkplain} tag

{% example "Syntax" %}

```
{@linkplain someNamepathOrURL}
[link text here]{@linkplain someNamepathOrURL}
{@linkplain someNamepathOrURL|link text here}
{@linkplain someNamepathOrURL Link text here (after the first space)}
```
{% endexample %}

The {@linkplain} tag is exactly the same as {@link}, except that it forces JSDoc to render the link
in plain text regardless of your configuration options.

For example, if the `templates.monospaceLinks` option is enabled, "{@link fooBar}" will
be converted to `<a href="#"><code>fooBar</code></a>`. However,
"{@linkplain fooBar}" will be converted to `<a href="#">fooBar</a>`.


### The {@linkcode} tag

{% example "Syntax" %}

```
{@linkcode someNamepathOrURL}
[link text here]{@linkcode someNamepathOrURL}
{@linkcode someNamepathOrURL|link text here}
{@linkcode someNamepathOrURL Link text here (after the first space)}
```
{% endexample %}

The {@linkcode} tag is exactly the same as {@link}, except that it forces JSDoc to render the link in
a monospace font regardless of your configuration options. For example, "{@linkcode fooBar}" will be
converted to `<a href="#"><code>fooBar</code></a>`.


## Links to tutorials ({@tutorial})

{% example "Syntax" %}

```
{@tutorial tutorialID}
```
{% endexample %}

The inline {@tutorial} tag is used to link to a tutorial. The link text for a {@tutorial} tag is
always rendered in plain text. See the [tutorials overview][tutorial-overview] for more information on setting up tutorials.

The @tutorial tag may also be used as a block tag; see the [@tutorial][tutorial-tag] page for more information.

{% example "Inline {@tutorial} tag} %}

```js
/**
 * Description.
 * Check out {@tutorial tutorial1} and {@tutorial tutorial2}.
 * @class
 */
```
{% endexample %}

[tutorial-overview]: about-tutorials.html
[tutorial-tag]: tags-tutorial.html
