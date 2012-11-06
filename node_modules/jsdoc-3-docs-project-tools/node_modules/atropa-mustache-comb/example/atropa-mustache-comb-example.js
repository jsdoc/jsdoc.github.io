var MustacheComb, comb;

MustacheComb = require('atropa-mustache-comb').MustacheComb;

comb = new MustacheComb();

/**
 * Main mustache function for generating pages. This may
 *  be used to process a single view.
 * @param {Object} view The view object to process.
 * @returns {String} Returns the html view as transformed by mustache.
 */
MustacheComb.prototype.mainMustache = function mainMustache(view) {
    var out, mustacheTemplateParts;
    // the generic page structure used repeatedly.
    mustacheTemplateParts = {
        "body" : view.body
    };
    this.mustacheTagHandlers.title = view.title;
    out = this.Mustache.to_html(this.templates.html, this.mustacheTagHandlers, mustacheTemplateParts);
    return out;
};

function lame(view) {
    var out, mustacheTemplateParts;
    // the generic page structure used repeatedly.
    mustacheTemplateParts = {
        "body" : view.body
    };
    
    comb.mustacheTagHandlers.title = view.title;
    out = comb.Mustache.to_html(comb.templates.html, comb.mustacheTagHandlers, mustacheTemplateParts);
    return out;
};


comb.addTemplateByFile('html', 'html.mustache');

comb.views.push(
    {
        "body" : "<p>weeeeee</p>",
        "title" : "Awesome"
    },
    {
        "body" : "<p>Wohoooo!</p>",
        "title" : "Awesome2"
    }
);
function cb(v) {
    console.log(lame(v));
}

comb.renderViews(cb);