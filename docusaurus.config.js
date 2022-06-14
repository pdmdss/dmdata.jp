/**
 * @ts-check
 */


/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
const themeConfig = {
    navbar: {
        logo: {
            alt: 'logo',
            src: 'img/logo.png'
        },
        items: [
            {
                to: 'docs/manual',
                label: 'Docs',
                position: 'left'
            },
            {
                to: 'docs/reference/',
                label: 'API Reference',
                position: 'left'
            },
            {
                to: 'docs/telegrams/',
                label: '配信データ',
                position: 'left'
            },
            {
                href: 'https://github.com/pdmdss/dmdata.jp',
                label: 'GitHub',
                position: 'right'

            }
        ]
    },
    footer: {
        style: 'dark',
        links: [
            {
                title: 'Site',
                items: [
                    {
                        label: '利用規約',
                        href: '/terms'
                    },
                    {
                        label: 'プライバシーポリシー',
                        href: '/policy'
                    },
                    {
                        label: '法的表記',
                        href: '/legal'
                    },
                    {
                        label: 'お問い合わせ',
                        href: '/contact'
                    }
                ]
            },
            {
                title: 'ServicePanel',
                items: [
                    {
                        label: 'サービストップページ',
                        href: 'https://dmdata.jp'
                    },
                    {
                        label: 'コントロールパネル',
                        href: 'https://manager.dmdata.jp/control/'
                    },
                    {
                        label: 'Service status',
                        href: 'https://dmdata.statuspage.io/'
                    }
                ]
            },
            {
                title: 'Social',
                items: [
                    {
                        label: 'Twitter (@pdmdata)',
                        href: 'https://twitter.com/pdmdata'
                    },
                    {
                        label: 'Discord',
                        href: 'https://discord.gg/uP6gfgzKnA'
                    }
                ]
            }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} dmdata.jp`
    },
    tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6
    }
};


/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'DMDATA.JP',
    url: 'https://dmdata.jp',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    themeConfig,
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js')
                },
                pages: {
                    path: 'site',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            }
        ]
    ]
};

module.exports = config;
