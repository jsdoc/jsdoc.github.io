---
title: Configuring JSDoc with conf.json
description: How to configure JSDoc using a configuration file.
related:
    - about-commandline.html
    - about-plugins.html
    - plugins-markdown.html
---

## Configuration File

To customise JSDoc's behaviour one can provide a configuration file in JSON format to JSDoc using
the `-c` option, e.g. `jsdoc -c /path/to/conf.json`.

This file (typically named "conf.json") provides options in JSON format. Have a look at
"conf.json.EXAMPLE" in the JSDoc directory as a basic example. If you do not specify a configuration
file, this is what JSDoc will use:

{% example %}
```js
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```
{% endexample %}

This means:

+ Only files ending in ".js" and ".jsdoc" will be processed (`source.includePattern`);
+ Any file starting with an underscore or in a directory starting with an underscore will be
_ignored_ (`source.excludePattern`);
+ No plugins are loaded (`plugins`);
+ `@link` tags are rendered in plain text (`templates.cleverLinks`, `templates.monospaceLinks`).

These options and others will be further explained on this page.

Further settings may be added to the file as requested by various plugins or templates (for example,
the [Markdown plugin][markdown] can be configured by including a "markdown" key).

[markdown]: plugins-markdown.html

## Specifying input files

The "source" set of options, in combination with paths given to JSDoc on the command-line, determine
what files JSDoc generates documentation for. (Remove the comments before adding this example to
your own .json file.)

{% example %}

```js
"source": {
    "include": [ /* array of paths to files to generate documentation for */ ],
    "exclude": [ /* array of paths to exclude */ ],
    "includePattern": ".+\\.js(doc)?$",
    "excludePattern": "(^|\\/|\\\\)_"
}
```
{% endexample %}

+ `source.include`: an optional array of paths that JSDoc should generate documentation for. The
paths given to JSDoc on the command line are combined with these to form the set of files JSDoc will
scan. Recall that if a path is a directory, the `-r` option may be used to recurse into it.
+ `source.exclude`: an optional array of paths that JSDoc should ignore.
+ `source.includePattern`: an optional string, interpreted as a regular expression. If present, all
files _must_ match this in order to be scanned by JSDoc. By default this is set to
".+&#92;.js(doc)?$", meaning that only files that end in `.js` or `.jsdoc` will be scanned.
+ `source.excludePattern`: an optional string, interpreted as a regular expression. If present, any
file matching this will be ignored. By default this is set so that files beginning with an
underscore (or anything under a directory beginning with an underscore) is ignored.

The order that these options are used in is:

1. Start with all paths given on the command line and in `source.include` for files (recall that
using the `-r` command-line option will search within subdirectories).
2. For each file found in Step 1, if the regular expression `source.includePattern` is present, the
file _must_ match it or it is ignored.
3. For each file left from Step 2, if the regular expression `source.excludePattern` is present, any
file matching this is ignored.
4. For each file left from Step 3, if the path is in `source.exclude` it is ignored.

All remaining files after these four steps are parsed by JSDoc.

As an example, suppose I have the following file structure:

{% example %}

```
myProject/
|- a.js
|- b.js
|- c.js
|- _private
|  |- a.js
|- lib/
   |- a.js
   |- ignore.js
   |- d.txt
```
{% endexample %}

And I set the "source" part of my conf.json like so:

{% example %}

```js
"source": {
    "include": [ "myProject/a.js", "myProject/lib", "myProject/_private" ],
    "exclude": [ "myProject/lib/ignore.js" ],
    "includePattern": ".+\\.js(doc)?$",
    "excludePattern": "(^|\\/|\\\\)_"
}
```
{% endexample %}

If I run JSDoc like this from the file containing the `myProject` folder:

{% example %}

```
jsdoc myProject/c.js -c /path/to/my/conf.json -r
```
{% endexample %}

Then JSDoc will make documentation for the files:

+ `myProject/a.js`
+ `myProject/c.js`
+ `myProject/lib/a.js`

The reasoning is as follows:

1. Based off `source.include` and the paths given on the command line, we start off with files
    + `myProject/c.js` (from the command line)
    + `myProject/a.js` (from `source.include`)
    + `myProject/lib/a.js`, `myProject/lib/ignore.js`, `myProject/lib/d.txt` (from `source.include`
    and using the `-r` option)
    + `myProject/_private/a.js` (from `source.include`)
2. Apply `source.includePattern`, so that we are left with all of the above _except_
`myProject/lib/d.txt` (as it does not end in ".js" or ".jsdoc").
3. Apply `source.excludePattern`, which will remove `myProject/_private/a.js`.
4. Apply `source.exclude`, which will remove `myProject/lib/ignore.js`.

## Incorporating command-line options into the configuration file

It is possible to put many of JSDoc's [command-line options][options] into the configuration file
instead of specifying them on the command-line.
To do this, use the longnames of the relevant options in an "opts" section of conf.json with the
value being the option's value.

[options]: about-commandline.html

{% example "Command-line options set in the configuration file" %}

```js
"opts": {
    "template": "templates/default",  // same as -t templates/default
    "encoding": "utf8",               // same as -e utf8
    "destination": "./out/",          // same as -d ./out/
    "recurse": true,                  // same as -r
    "tutorials": "path/to/tutorials", // same as -u path/to/tutorials
}
```
{% endexample %}

Hence between `source.include` and `opts` it's possible to put _all_ of jsdoc's arguments in a
configuration file so that the command-line reduces to:

```
jsdoc -c /path/to/conf.json
```

In the case of options being provided on the command line _and_ in conf.json, the command line takes
precedence.


## Plugins

To enable plugins, add their paths (relative to the JSDoc folder) into the `plugins` array.

For example, the following will include the Markdown plugin, which converts Markdown-formatted text
to HTML, and the "summarize" plugin, which autogenerates a summary for each doclet:

{% example %}

```
"plugins": [
    "plugins/markdown",
    "plugins/summarize"
]
```
{% endexample %}

See the [plugin reference][plugins] for further information, and look in `jsdoc/plugins` for the
plugins built-in to JSDoc.

The Markdown plugin can be configured by including a "markdown" object into conf.json; see
[Configuring the Markdown Plugin][markdown] for further information.

[plugins]: about-plugins.html
[markdown]: plugins-markdown.html


## Output style configuration

The options in `templates` affect how JSDoc's output looks (although custom templates may not be
affected by these, depending on how they are coded).

{% example %}

```js
"templates": {
    "cleverLinks": false,
    "monospaceLinks": false
}
```
{% endexample %}

If `templates.monospaceLinks` is true, all link texts from the [@link][link-tag] tag will be
rendered in monospace.

If `templates.cleverLinks` is true, {@link asdf} will be rendered in normal font if "asdf" is a URL,
and monospace otherwise. For example, `{@link http://github.com}` will render in plain-text but
`{@link MyNamespace.myFunction}` will be in monospace.

If `templates.cleverLinks` is true, it is used and `templates.monospaceLinks` is ignored.

Also, there are {@linkcode ...} and {@linkplain ...} if one wishes to force the link to be rendered
in monospace or normal font respectively (see [@link, @linkcode and @linkplain][link-tag] for
further information).

[link-tag]: tags-inline-link.html

### Miscellaneous

The `tags.allowUnknownTags` property determines whether tags unrecognised by JSDoc are permitted. If
this is false and JSDoc encounters a tag it does not recognise (e.g. `@foobar`), it will throw an
error. Otherwise, it will just ignore the tag.

By default, it is true.

{% example %}

```
"tags": {
    "allowUnknownTags": true
}
```
{% endexample %}
