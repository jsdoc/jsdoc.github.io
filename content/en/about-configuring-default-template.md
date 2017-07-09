---
title: Configuring JSDoc's default template
description: How to configure the output from JSDoc's default template.
related:
    - about-configuring-jsdoc.html
---

JSDoc's default template provides several options that you can use to customize the appearance and
content of generated documentation.

To use these options, you must [create a configuration file][about-config] for JSDoc and set the
appropriate options in the configuration file.

[about-config]: about-configuring-jsdoc.html


## Generating pretty-printed source files

By default, JSDoc's default template generates pretty-printed versions of your source files. It also
links to these pretty-printed files in the documentation.

To disable pretty-printed files, set the option `templates.default.outputSourceFiles` to `false`.
Using this option also removes links to your source files from the documentation. This option is
available in JSDoc 3.3.0 and later.


## Copying static files to the output directory

JSDoc's default template automatically copies a few static files, such as CSS stylesheets, to the
output directory. In JSDoc 3.3.0 and later, you can tell the default template to copy additional
static files to the output directory. For example, you might want to copy a directory of images to
the output directory so you can display these images in your documentation.

To copy additional static files to the output directory, use the following options:

+ `templates.default.staticFiles.include`: An array of paths whose contents should be copied to the
output directory. Subdirectories will be copied as well.
+ `templates.default.staticFiles.exclude`: An array of paths that should _not_ be copied to the
output directory.
+ `templates.default.staticFiles.includePattern`: A regular expression indicating which files to
copy. If this property is not defined, all files will be copied.
+ `templates.default.staticFiles.excludePattern`: A regular expression indicating which files to
skip. If this property is not defined, nothing will be skipped.

{% example "Copying a directory of images to the output directory" %}

To copy all of the static files in `./myproject/static` to the output directory:

```json
{
  "templates": {
    "default": {
      "staticFiles": {
        "include": [
        	"./myproject/static"
        ]
      }
    }
  }
}
```

If your static files directory contains the file `./myproject/static/img/screen.png`, you can
display the image in your docs by using the HTML tag `<img src="img/screen.png">`.

{% endexample %}


## Showing the current date in the page footer

By default, JSDoc's default template always shows the current date in the footer of the generated
documentation. In JSDoc 3.3.0 and later, you can omit the current date by setting the option
`templates.default.includeDate` to `false`.


## Showing longnames in the navigation column

By default, JSDoc's default template shows a shortened version of each symbol's name in the
navigation column. For example, the symbol `my.namespace.MyClass` would be displayed simply as
`MyClass`. To show the complete longname instead, set the option
`templates.default.useLongnameInNav` to `true`. This option is available in JSDoc 3.4.0 and later.


## Overriding the default template's layout file

The default template uses a file named `layout.tmpl` to specify the header and footer for each
page in the generated documentation. In particular, this file defines which CSS and JavaScript files
are loaded for each page. In JSDoc 3.3.0 and later, you can specify your own `layout.tmpl` file to
use, which allows you to load your own custom CSS and JavaScript files in addition to, or instead
of, the standard files.

To use this feature, set the option `templates.default.layoutFile` to the path to your customized
layout file. Relative paths are resolved against the current working directory; the path to the
configuration file; and the JSDoc directory, in that order.
