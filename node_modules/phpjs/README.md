node-phpjs
==========

This package provides a port for [php.js](http://phpjs.org) to Node.js.

### Install
`npm install phpjs`

### Usage
Is as simple as require it:

    phpjs = require('phpjs');
    console.log(phpjs.ucfirst('hello world!'));
    // Will output: Hello world!

You can register those functions globally too:

    phpjs = require('phpjs').registerGlobals();
    ucfirst('hello world!');
    // Will output: Hello world!

### php.js license
[php.js](http://phpjs.org) is dual licensed under the [MIT](http://phpjs.org/pages/license/#MIT) and [GPL](http://phpjs.org/licenses/GPL-LICENSE.txt) licenses.    

### node-phpjs MIT license

    Copyright (C) 2012 Cranic Tecnologia e Informática LTDA

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

