// see: http://howtonode.org/intro-to-jake

desc('separating extended article info from tags articles build files.');
task('default', [], function (params) {
    var fs = require('fs');
    var path = require('path');
    
    var bodyOutDir = 'Jake/extended_docs/tags/',
    articleOutDir = 'Jake/articles/',
    srcdir = 'C:/Users/kastor/Documents/GitHub/jsdoc3.github.com/Jake/articles/',
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
        if (article.fileName.indexOf('tags-') === 0) {
            var articleContent, tagname;
            tagname = article.fileName.replace(/tags-/, '');
            articleContent  = '<!--{\n';
            articleContent += '    "title" :       "' + article.title + '",\n';
            articleContent += '    "out" :         "' + article.out + '",\n';
            articleContent += '    "description" : "' + article.description + '"\n';
            articleContent += '}-->\n\n';
            articleContent += '<h2 name="definition" id="definition">Definition</h2>\n';
            articleContent += '{{#include}}\n';
            articleContent += '    jake/API/describeTags/' + article.out + '\n';
            articleContent += '{{/include}}\n\n';
            articleContent += '<h2 name="Extended_Info" id="Extended_Info">Extended Info</h2>\n';
            articleContent += '<div class="tags-overview" id="' + tagname + '-overview">\n';
            articleContent += '{{#include}}\n';
            articleContent += '    jake/extended_docs/tags/' + article.fileName + '\n';
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
