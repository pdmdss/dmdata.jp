module.exports = {
    title: 'DMDATA.JP Document',
    url: 'https://dmdata.jp',
    baseUrl: '/doc/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    themeConfig: {
        navbar: {
            title: 'Top',
            logo: {
                alt: 'logo',
                src: 'img/logo.png'
            },
            items: [
                {
                    to: '/reference/',
                    label: 'API Reference',
                    position: 'left'
                },
                {
                    to: '/telegrams/',
                    label: '配信データ',
                    position: 'left'
                },
                {
                    href: 'https://github.com/pdmdss/doc.dmdata.jp',
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
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: '/'
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            }
        ]
    ]
};
