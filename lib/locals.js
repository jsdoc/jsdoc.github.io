// Swig locals for generating usejsdoc.org.
'use strict';

var hasOwnProp = Object.prototype.hasOwnProperty;

function filenameForLink(link) {
    return link.replace(/\#.*$/, '');
}

// Use a filename to look up a page title. If the filename includes a fragment ID (for example,
// foo.html#bar), the fragment ID will be stripped.
exports.titleForFilename = function(files, link) {
    link = filenameForLink(link);

    if (!hasOwnProp.call(files, link)) {
        return '';
    }

    return files[link].title;
};

// Use a filename to look up a description. If the filename includes a fragment ID (for example,
// foo.html#bar), the fragment ID will be stripped.
exports.descriptionForFilename = function(files, link) {
    link = filenameForLink(link);

    if (!hasOwnProp.call(files, link)) {
        return '';
    }

    return files[link].description;
};

// Use a tag name to look up a filename.
exports.filenameForTag = function(metadata, tagName) {
    if (!hasOwnProp.call(metadata.tags, tagName)) {
        return '';
    }

    return metadata.tags[tagName].filename;
};

function getTagObjects(metadata, key) {
    var tags = [];

    Object.keys(metadata[key]).sort().forEach(function(tagName) {
        if (!metadata[key][tagName].isSynonym) {
            tags.push(metadata[key][tagName]);
        }
    });

    return tags;
}

// Retrieve a sorted array of objects representing the HTML files for JSDoc block tags.
exports.getBlockTags = function(metadata) {
    return getTagObjects(metadata, 'tags');
};

// Retrieve a sorted array of objects representing the HTML files for JSDoc inline tags.
exports.getInlineTags = function(metadata) {
    return getTagObjects(metadata, 'inlineTags');
};

// Check whether we should render the per-page table of contents.
exports.renderPageToc = function(items) {
    // Don't render a TOC if there are no headings, or if there's only one top-level heading with
    // no children
    if (items.length === 0 || (items.length === 1 && items[0].children.length === 0)) {
        return false;
    }

    return true;
};
