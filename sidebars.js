// @ts-check

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const docsDir = path.join(cwd, 'docs');
const fileNames = fs.readdirSync(docsDir);
// Create list of inline and block tags to use it in categories
const inlineTags = [];
const blockTags = [];
fileNames.forEach((fileName) => {
    if (fileName.startsWith('tags-inline'))
        inlineTags.push(fileName.replace('.md', ''));
    else if (fileName.startsWith('tags-'))
        blockTags.push(fileName.replace('.md', ''));
});

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docsSidebar: [
        {
            'Getting Started': [
                'about-getting-started',
                'about-namepaths',
                'about-commandline',
                'about-configuring-jsdoc',
                'about-configuring-default-template',
                'about-block-inline-tags',
                'about-plugins',
                'plugins-markdown',
                'about-tutorials',
                'about-including-package',
                'about-including-readme',
                'about-license-jsdoc3',
            ],
        },
        {
            Examples: [
                'howto-es2015-classes',
                'howto-es2015-modules',
                'howto-commonjs-modules',
                'howto-amd-modules',
            ],
        },
        { 'Block Tags': blockTags },
        { 'Inline Tags': inlineTags },
        'contribute',
    ],
};

module.exports = sidebars;
