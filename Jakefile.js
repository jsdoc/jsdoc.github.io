/*jslint indent: 4, maxerr: 50, white: true, node: true */
/*global desc:true, task:true */

// see: http://howtonode.org/intro-to-jake

'use strict';

desc('Building the site.');
task('default', [], function () {
    var builder;
    console.log('Rebuilding site...');
    builder = new (require('Jsdoc3SiteBuilder').Jsdoc3SiteBuilder)();
    builder.buildSite();
    //console.log(sys.inspect(arguments));
});
