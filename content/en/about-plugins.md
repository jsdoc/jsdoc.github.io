---
title: About JSDoc plugins
description: How to create and use JSDoc plugins.
---

## Creating and Enabling a Plugin

There are two steps required to create and enable a new JSDoc plugin:

1. Create a JavaScript module to contain your plugin code.
2. Include that module in the `plugins` array of `conf.json`. You can specify an absolute or
relative path. If you use a relative path, JSDoc searches for the plugin in the current working
directory and the JSDoc directory, in that order.

For example, if your plugin source code was saved in the `plugins/shout.js` file in the current
working directory, you would include it by adding a reference to it in `conf.json` like so:

{% example "Example" %}

```
...
"plugins": [
    "plugins/shout"
]
...
```
{% endexample %}


## Authoring JSDoc 3 Plugins

JSDoc 3's plugin system offers extensive control over the parsing process. A plugin can affect the
parse results by doing any of the following:

+ Defining event handlers
+ Defining tags
+ Defining a visitor for abstract syntax tree nodes

### Event Handlers

At the highest level, a plugin may register handlers for specific named-events that occur in the
documentation generation process. JSDoc will pass the handler an event object containing pertinent
information. Your plugin module should export a `handlers` object that contains your handler, like
so:

{% example "Example" %}

```js
exports.handlers = {
    newDoclet: function(e) {
        // Do something when we see a new doclet
    }
};
```
{% endexample %}

On Node.js, JSDoc fires events in the same order as the underlying code. On Mozilla Rhino, JSDoc
fires all of the `jsdocCommentFound` events at once as soon as it starts parsing a file; all other
events are fired in the same order as the underlying code.

#### Event: parseBegin

The `parseBegin` event is fired before JSDoc starts loading and parsing the source files. Your
plugin can control which files JSDoc will parse by modifying the event's contents.

**Note**: This event is fired in JSDoc 3.2 and later.

The event object contains the following properties:

+ `sourcefiles`: An array of paths to source files that will be parsed.

#### Event: fileBegin

The `fileBegin` event is fired when the parser is about to parse a file. Your plugin can use this
event to trigger per-file initialization if necessary.

The event object contains the following properties:

+ `filename`: The name of the file.

#### Event: beforeParse

The `beforeParse` event is fired before parsing has begun. Plugins can use this method to modify the
source code that will be parsed. For instance, your plugin could add a JSDoc comment, or it could
remove preprocessing tags that are not valid JavaScript.

The event object contains the following properties:

+ `filename`: The name of the file.
+ `source`: The contents of the file.

Below is an example that adds a virtual doclet for a function to the source so that it will get
parsed and added to the documentation. This might be done to document methods that will be available
to users, but might not appear in the source code being documented, such as methods provided by an
external superclass:

{% example "Example" %}

```js
exports.handlers = {
    beforeParse: function(e) {
        var extraDoc = [
            '/**',
            ' * Function provided by a superclass.',
            ' * @name superFunc',
            ' * @memberof ui.mywidget',
            ' * @function',
            ' */'
        ];
        e.source += extraDoc.join('\n');
    }
};
```
{% endexample %}

#### Event: jsdocCommentFound

The `jsdocCommentFound` event is fired whenever a JSDoc comment is found. The comment may or may not
be associated with any code. You might use this event to modify the contents of a comment before it
is processed.

The event object contains the following properties:

+ `filename`: The name of the file.
+ `comment`: The text of the JSDoc comment.
+ `lineno`: The line number on which the comment was found.

#### Event: symbolFound

The `symbolFound` event is fired when the parser comes across a symbol in the code that may need to
be documented. For example, the parser fires a `symbolFound` event for each variable, function, and
object literal in a source file.

The event object contains the following properties:

+ `filename`: The name of the file.
+ `comment`: The text of the comment associated with the symbol, if any.
+ `id`: The unique ID of the symbol.
+ `lineno`: The line number on which the symbol was found.
+ `range`: An array containing the numeric index of the first and last characters in the source file
that are associated with the symbol.
+ `astnode`: The symbol's node from the abstract syntax tree.
+ `code`: Object with detailed information about the code. This object usually contains `name`,
`type`, and `node` properties. The object might also have `value`, `paramnames`, or `funcscope`
properties depending on the symbol.

[node-visitors]: #node-visitors

#### Event: newDoclet

The `newDoclet` event is the highest-level event. It is fired when a new doclet has been created.
This means that a JSDoc comment or a symbol has been processed, and the actual doclet that will be
passed to the template has been created.

The event object contains the following properties:

+ `doclet`: The new doclet that was created.

The doclet's properties can vary depending on the comment or symbol that the doclet represents. Some
common properties you're likely to see include:

+ `comment`: The text of the JSDoc comment, or an empty string if the symbol is undocumented.
+ `meta`: Object that describes how the doclet relates to the source file (for example, the location
within the source file).
+ `description`: A description of the symbol being documented.
+ `kind`: The kind of symbol being documented (for example, `class` or `function`).
+ `name`: The short name for the symbol (for example, `myMethod`).
+ `longname`: The fully qualified name, including memberof info (for example, `MyClass#myMethod`).
+ `memberof`: The module, namespace, or class that this symbol belongs to (for example, `MyClass`),
or an empty string if the symbol does not have a parent.
+ `scope`: The scope of the symbol within its parent (for example, `global`, `static`, `instance`,
or `inner`).
+ `undocumented`: Set to `true` if the symbol did not have a JSDoc comment.
+ `defaultvalue`: The default value for a symbol.
+ `type`: Object containing details about the symbol's type.
+ `params`: Object containing the list of parameters to a function.
+ `tags`: Object containing a list of tags that JSDoc did not recognize. Only available if
`allowUnknownTags` is set to `true` in JSDoc's configuration file.

Below is an example of a `newDoclet` handler that shouts the descriptions:

{% example "Example" %}

```js
exports.handlers = {
    newDoclet: function(e) {
        // e.doclet will refer to the newly created doclet
        // you can read and modify properties of that doclet if you wish
        if (typeof e.doclet.description === 'string') {
            e.doclet.description = e.doclet.description.toUpperCase();
        }
    }
};
```
{% endexample %}

#### Event: fileComplete

The `fileComplete` event is fired when the parser has finished parsing a file. Your plugin could use
this event to trigger per-file cleanup.

The event object contains the following properties:

+ `filename`: The name of the file.
+ `source`: The contents of the file.

#### Event: parseComplete

The `parseComplete` event is fired after JSDoc has parsed all of the specified source files.

**Note**: This event is fired in JSDoc 3.2 and later.

The event object contains the following properties:

+ `sourcefiles`: An array of paths to source files that were parsed.
+ `doclets`: An array of doclet objects. See the [newDoclet event][newdoclet-event] for details
about the properties that each doclet can contain. **Note**: This property is available in JSDoc
3.2.1 and later.

[newdoclet-event]: #event-newdoclet

#### Event: processingComplete

The `processingComplete` event is fired after JSDoc updates the parse results to reflect inherited
and borrowed symbols.

**Note**: This event is fired in JSDoc 3.2.1 and later.

The event object contains the following properties:

+ doclets: An array of doclet objects. See the [newDoclet event][newdoclet-event] for details about
the properties that each doclet can contain.

[newdoclet-event]: #event-newdoclet

### Tag Definitions

Adding tags to the tag dictionary is a mid-level way to affect documentation generation. Before a
`newDoclet` event is triggered, JSDoc comment blocks are parsed to determine the description and any
JSDoc tags that may be present. When a tag is found, if it has been defined in the tag dictionary,
it is given a chance to modify the doclet.

Plugins can define tags by exporting a `defineTags` function. That function will be passed a
dictionary that can be used to define tags, like so:

{% example "Example" %}

```js
exports.defineTags = function(dictionary) {
    // define tags here
};
```
{% endexample %}

#### The Dictionary

The dictionary provides the following methods:

+ `defineTag(title, opts)`: Used to define tags. The first parameter is the name of the tag (for
example, `param` or `overview`). The second is an object containing options for the tag. You can
include any of the following options; the default value for each option is `false`:
    + `canHaveType (boolean)`: Set to `true` if the tag text can include a type expression (such as
    `{string}` in `@param {string} name - Description`).
    + `canHaveName (boolean)`: Set to `true` if the tag text can include a name (such as `name` in
    `@param {string} name - Description`).
    + `isNamespace (boolean)`: Set to `true` if the tag should be applied to the doclet's longname
    as a namespace. For example, the `@module` tag sets this option to `true`, and using the tag
    `@module myModuleName` results in the longname `module:myModuleName`.
    + `mustHaveValue (boolean)`: Set to `true` if the tag must have a value (such as `TheName` in
    `@name TheName`).
    + `mustNotHaveDescription (boolean)`: Set to `true` if the tag may have a value but must not
    have a description (such as `TheDescription` in `@tag {typeExpr} TheDescription`).
    + `mustNotHaveValue (boolean)`: Set to `true` if the tag must not have a value.
    + `onTagged (function)`: A callback function executed when the tag is found. The function is
    passed two parameters: the doclet and the tag object.
+ `lookUp(tagName)`: Retrieve a tag object by name. Returns the tag object, including its options,
or `false` if the tag is not defined.
+ `isNamespace(tagName)`: Returns `true` if the tag is applied to a doclet's longname as a
namespace.
+ `normalise(tagName)`: Returns the canonical name of a tag. For example, the `@const` tag is a
synonym for `@constant`; as a result, if you call `normalise('const')`, it returns the string
`constant`.

A tag's `onTagged` callback can modify the contents of the doclet or tag.

{% example "Defining an onTagged callback" %}

```js
dictionary.defineTag('instance', {
    onTagged: function(doclet, tag) {
        doclet.scope = "instance";
    }
});
```
{% endexample %}

The `defineTag` method returns a `Tag` object, which has a `synonym` method that can be used to
declare a synonym for the tag.

{% example "Defining a tag synonym" %}

```js
dictionary.defineTag('exception', { /* options for exception tag */ })
    .synonym('throws');
```
{% endexample %}

### Node Visitors

At the lowest level, plugin authors can process each node in the abstract syntax tree (AST) by
defining a node visitor that will visit each node, creating an opportunity to do things like modify
comments and trigger parser events for any arbitrary piece of code.

Plugins can define a node visitor by exporting a `nodeVisitor` object that contains a `visitNode`
function, like so:

{% example "Example" %}

```js
exports.nodeVisitor = {
    visitNode: function(node, e, parser, currentSourceName) {
        // do all sorts of crazy things here
    }
};
```
{% endexample %}

The function is called on each node with the following parameters:

+ `node`: The AST node.
+ `e`: The event. If the node is one that the parser handles, the event object will already be
populated with the same things described in the `symbolFound` event above. Otherwise, it will be an
empty object on which to set various properties.
+ `parser`: The JSDoc parser instance.
+ `currentSourceName`: The name of the file being parsed.

#### Making things happen

The primary reasons to implement a node visitor are to be able to document things that aren't
normally documented (like function calls that create classes) or to auto generate documentation for
code that isn't documented. For instance, a plugin might look for calls to a `_trigger` method since
it knows that means an event is fired and then generate documentation for the event.

To make things happen, the `visitNode` function should modify properties of the event parameter. In
general the goal is to construct a comment and then get an event to fire. After the parser lets all
of the node visitors have a look at the node, it looks to see if the event object has a `comment`
property and an `event` property. If it has both, the event named in the event property is fired.
The event is usually `symbolFound` or `jsdocCommentFound`, but theoretically, a plugin could define
its own events and handle them.

#### Example of a node visitor

Below is an example of what a plugin for documenting jQuery UI widgets might do. jQuery UI uses a
factory function call to create widget classes. The plugin looks for that function call and creates
a symbol with documentation. It also looks for any `this._trigger` function calls and automatically
creates documentation for the events that are triggered:

{% example "Example" %}

```js
exports.nodeVisitor = {
    visitNode: function(node, e, parser, currentSourceName) {
        if (node.type === Token.OBJECTLIT && node.parent && node.parent.type === Token.CALL &&
                isInWidgetFactory(node, 1)) {
            var widgetName = node.parent.arguments.get(0).toSource();
            e.id = 'astnode' + node.hashCode(); // the id of the object literal node
            e.comment = String(node.parent.jsDoc||'');
            e.lineno = node.parent.getLineno();
            e.filename = currentSourceName;
            e.astnode = node;
            e.code = {
                name: "" + widgetName.substring(1, widgetName.length() - 1),
                type: "class",
                node: node
            };
            e.event = "symbolFound";
            e.finishers = [parser.addDocletRef];

            addCommentTag(e, "param", "{Object=} options A set of configuration options");
        }
        else if (isTriggerCall(node)) {
            var nameNode = node.arguments.get(0);
                eventName = String((nameNode.type == Token.STRING) ? nameNode.value : nameNode.toSource()),
                func = {},
                comment = "@event\n",
                eventKey = "";

            if (node.enclosingFunction) {
                func.id = 'astnode'+node.enclosingFunction.hashCode();
                func.doclet = parser.refs[func.id];
            }
            if (func.doclet) {
                func.doclet.addTag("fires", eventName);
                if (func.doclet.memberof) {
                    eventKey = func.doclet.memberof + "#event:" + eventName;
                    comment += "@name " + func.doclet.memberof + "#" + eventName;
                }
            }
            e.comment = comment;
            e.lineno = node.getLineno();
            e.filename = currentSourceName;
            e.event = "jsdocCommentFound";
        }
    }
};

function isTriggerCall(node) {
    if(node.type != Token.CALL) { return false; }
    var target = node.getTarget(),
        left = target && target.left && String(target.left.toSource()),
        right = target && target.right && String(target.right.toSource());
    return (left === "this" && right === "_trigger");
}

function isInWidgetFactory(node, depth) {
    var parent = node.parent,
        d = 0;
    while (parent && (!depth || d &lt; depth)) {
        if (parent.type === Token.CALL) {
            var target = parent.getTarget(),
                left = target && target.left && String(target.left.toSource()),
                right = target && target.right && String(target.right.toSource());
            return ((left === "$" || left === "jQuery") && right === "widget");
        } else {
            parent = parent.parent;
            d++;
        }
    }
    return false;
}
```
{% endexample %}

You'll notice a `finishers` property set. The finishers property should contain an array of
functions to be called after the event is fired and all the handlers have processed it. The parser
provides an `addDocletRef` function that adds the doclet to the map (keyed off of the id property)
of doclets it knows about.

Lastly, the visitors are executed in the order the plugins are listed in the conf.json file. A
plugin can stop later plugins from visiting a node by setting a `stopPropagation` property on the
event object (`e.stopPropagation = true`). A plugin can stop the event from firing by setting a
`preventDefault` property.

### Reporting Errors

If your plugin needs to report an error, use one of the following methods in the `jsdoc/util/logger`
module:

+ `logger.warn`: Warn the user about a possible problem.
+ `logger.error`: Report an error from which the plugin can recover.
+ `logger.fatal`: Report an error that should cause JSDoc to stop running.

Using these methods creates a better user experience than simply throwing an error.

**Note**: Do not use the `jsdoc/util/error` module to report errors. This module is deprecated and
will be removed in a future version of JSDoc.

{% example "Reporting a non-fatal error" %}

```js
var logger = require('jsdoc/util/logger');

exports.handlers = {
    newDoclet: function(e) {
        // Your code here.

        if (somethingBadHappened) {
            logger.error('Oh, no, something bad happened!');
        }
    }
}
```
{% endexample %}
