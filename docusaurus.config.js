// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'JSDoc Docs',
    tagline: 'An API documentation generator for JavaScript.',

    // Set the production url of your site here
    url: 'https://jsdoc.app',
    baseUrl: '/',
    organizationName: 'JSDoc',
    projectName: 'jsdoc.github.io',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: '/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: '@jsdoc',
                items: [
                    {
                        href: 'https://github.com/jsdoc/jsdoc',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),

    plugins: [
        [
            // See: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects#installation
            '@docusaurus/plugin-client-redirects',
            {
                fromExtensions: ['html'],
                redirects: [
                    {
                        to: '/about-block-inline-tags',
                        from: '/about-inline-tags',
                    },
                    {
                        to: '/tags-class',
                        from: '/tags-constructor',
                    },
                    {
                        to: '/tags-inline-link',
                        from: '/tags-link',
                    },
                    {
                        to: '/tags-function',
                        from: '/tags-method',
                    },
                ],
            },
        ],
    ],
};

module.exports = config;
