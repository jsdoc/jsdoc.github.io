/*jslint indent: 4, maxerr: 50, white: true, vars: true, node: true, sloppy: true, stupid: true, evil: true */
/*global desc: true, task: true */

// see: http://howtonode.org/intro-to-jake

desc('separating extended article info from tags articles build files.');
task('default', [], function (params) {
    var fs = require('fs');
    var path = require('path');
    
    var articlePrefix = 'plugins-',
        apiFolder = 'plugins',
        extended_docsFolder = 'plugins',
        srcRoot = 'C:/Users/kastor/Documents/GitHub/jsdoc3.github.com/',
        outRoot = 'C:/Users/kastor/Documents/GitHub/jsdoc3.github.com/';
        
    var apiDocs = 'jake/API/' + apiFolder + '/',
        apiDocsDir = srcRoot + apiDocs,
        bodyDocs = 'Jake/extended_docs/' + extended_docsFolder + '/',
        articleDocs = 'Jake/articles/',
        bodyOutDir = outRoot + bodyDocs,
        articleOutDir = outRoot + articleDocs,
        srcdir = srcRoot + articleDocs,
        articles = [];
    
    fs.readdirSync(srcdir).forEach(function (file) {
        if (String(file)[0] === '.') {
            return;
        }
        
        var body = fs.readFileSync(srcdir + file, 'utf8'),
        meta = body.match(/^<!--(\{[\s\S]*\})-->/)[1];
        
        if (!meta) {
            return;
        }
        
        eval('meta = ' + meta);
        
        meta.fileName = String(file);
        meta.body = body.split('}-->')[1];
        articles.push(meta);
    });
    
    articles.forEach(function(article) {
        if (article.fileName.indexOf(articlePrefix) === 0) {
            var articleContent, contentName, regx;
            regx = new RegExp(articlePrefix);
            contentName = article.fileName.replace(regx, '');
            articleContent  = '<!--{\n';
            articleContent += '    "title" :       "' + article.title + '",\n';
            articleContent += '    "out" :         "' + article.out + '",\n';
            articleContent += '    "description" : "' + article.description + '"\n';
            articleContent += '}-->\n\n';
            articleContent += '<div class="' + articlePrefix + 'overview" id="' + contentName + '-overview">\n';
            articleContent += '{{#include}}\n';
            articleContent += '    ' + bodyDocs + article.fileName + '\n';
            articleContent += '{{/include}}\n';
            articleContent += '</div>\n';
            
            var articleOutFile = path.resolve(articleOutDir + article.fileName);
            fs.writeFile(articleOutFile, articleContent, 'utf-8', function (err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('> created ' + articleOutFile);
                }
            });
            
            var bodyOutFile = path.resolve(bodyOutDir, article.fileName);
            fs.writeFile(bodyOutFile, article.body, 'utf-8', function (err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('> created ' + bodyOutFile);
                }
            });
        }
    });
});
