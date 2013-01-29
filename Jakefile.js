// see: http://howtonode.org/intro-to-jake

desc('Building the site.');
task('default', [], function (params) {
    var fs = require('fs'),
    sys = require('sys');
    
    // import the Mustache template tool
    eval(fs.readFileSync('Jake/lib/mustache.js', 'utf8'));
    
    var templates = {
        head : fs.readFileSync('Jake/templates/head.mustache', 'utf8'),
        foot : fs.readFileSync('Jake/templates/foot.mustache', 'utf8'),
        article : fs.readFileSync('Jake/templates/article.mustache', 'utf8'),
        example : fs.readFileSync('Jake/templates/example.mustache', 'utf8'),
        tagRefEntry : fs.readFileSync('Jake/templates/tagRefEntry.mustache', 'utf8')
    };
    
    var outdir = './',
    srcdir = 'Jake/articles/',
    articles = [];
    
    console.log('Building index...');
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
        
        meta.body = body.split('}-->')[1];
        articles.push(meta);
    });
    
    console.log('Cleaning gh-pages...');
    fs.readdirSync(outdir).forEach(function (file) {
        if (/\.html$/.test(file)) {
            fs.unlinkSync(outdir + file);
            console.log('> removed ' + outdir + file);
        }
    });
    
    console.log('Building new gh-pages...');
    
    articles.forEach(function (article) {
        var html = convertEOL(Mustache.to_html(
                templates.article, {
                title : article.title,
                description : article.description,
                keywords : article.keywords,
                example : function () {
                    return function (text, render) {
                        return formatExample(text);
                    };
                },
                tagRefEntry : function () {
                    return function () {
                        return generateTagsReference();
                    };
                }
            }, {
                head : templates.head,
                foot : templates.foot,
                article : article.body
            }), '\n');
        
        fs.writeFileSync(outdir + article.out, html, 'utf8');
        console.log('> created ' + outdir + article.out);
    });
    
    /**
     * Autogenerates the tag dictionary from jake articles. 
     * The articles whose filename begins with 'tags-' 
     * will be included in the tag dictionary. The metadata 
     * will be used from each file. The title is mapped to be 
     * the displayed text of the link, the out (filename) is 
     * mapped to the href of the link, and the description 
     * is mapped to the description shown below the link. 
     */
    function generateTagsReference() {
        var out = '';
        articles.forEach(function (article) {
            if (article.out.indexOf('tags-') !== 0) {
                return '';
            }
            var p = article.out;
            var tr = article.title;
            var td = article.description;
            out += Mustache.to_html(
                templates.tagRefEntry, {
                href : p,
                tagRef : tr,
                tagDesc : td
            });
        });
        return out;
    }
    
    function formatExample(text) {
        // the first line of the text is the title of the example code
        var parts,
            title,
            offset,            
            code;
            
        // normalizing line endings
        text = convertEOL(text, '\n');
        
        parts = text.split('\n');
        title = parts.shift().trim();
        
        // converting any tabs in white space preceeding the line, into four spaces.
        parts = parts.map(normalizeWhiteSpacePrefix);
        
        // Since indentation in the article is directly transferred to the displayed 
        // example, we may need to remove some white space. (thinks of shift+tab).
        offset = getOffset(parts[0]);
        parts = parts.map(function(text) {
            return offsetWhiteSpace(text, offset);
        });
        
        code = parts.join('\n');
        code = code.replace(/[<]/g, '&lt;');
        
        return Mustache.to_html(
            templates.example, {
            codeTitle : title,
            codeBody : code
        });
    }
    
    /**
     * Counts the number of leading space or tab characters but not both.
     * @param {String} text The text to analyze.
     * @returns {Number} Returns the quantity of leading spaces or tabs.
     */
    function getOffset(text) {
        var offset = 0,
            leadingChar = text.charAt(0);
            
        if( leadingChar === ' ' || leadingChar === '\t') {
            while(text.charAt(offset) === leadingChar && offset < text.length) {
                offset++;
            }
        }
        return offset;
    }
    
    /**
     * Removes a quantity of leading spaces specified by offset.
     * @param {String} text The text to process.
     * @param {Number} offset The amount of spaces you want removed 
     * from the beginning of the text.
     * @returns Returns the processed text.
     */
    function offsetWhiteSpace(text, offset) {
        regx = new RegExp('^ {' + offset + '}');
        text = text.replace(regx, '');
        return text;
    }
    
    /**
     * Converts all tabs in leading whitespace into four spaces.
     * @param {String} text The text to process
     * @returns {String} Returns the processed text.
     */
    function normalizeWhiteSpacePrefix(text) {
        var prefix = text.match(/^\s*/);
        if(prefix) {
            prefix = prefix[0];
            prefix = prefix.replace(/\t/g, '    ');
            text = text.replace(/^\s*/, prefix);
        }
        return text;
    }
    
    /**
     * Converts end of line markers into whatever you want. 
     * Automatically detects any of \r\n, \n, or \r and 
     * replaces it with the user specified EOL marker.
     * @param {String} text The text you want processed.
     * @param {String} newEOL The replacement for the current EOL marks.
     * @returns {String} Returns the processed text.
     */
    function convertEOL(text, newEOL) {
        return text.replace(/(\r\n|\n|\r)/g, newEOL);
    }
    //console.log(sys.inspect(arguments));
});
