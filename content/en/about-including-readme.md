---
title: Including a Readme File With JSDoc 3
description: A guide to including a readme file in your documentation.
---

To include a readme file in your documentation, you simply specify the location of your readme file on the command line along with the location of your source files. The readme file will be incorporated into the index.html of your documentation in the default template. The file must be written in markdown and given a .md extension.

{% example "Including a readme file in your documentation" %}

```
jsdoc C:\path\to\my\JS\project\sourceFiles C:\path\to\my\JS\project\README.md
```
{% endexample %}

If your file is successfully incorporated into the default template, it's content will be rendered in beautiful HTML just before the files list.
