/**
 * @ts-check
 */


const lastUpdate = new Date();

lastUpdate.setMinutes(lastUpdate.getMinutes() + (lastUpdate.getTimezoneOffset() + 540));

/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
const themeConfig = {
    navbar: {
        logo: {
            alt: 'logo',
            src: 'img/logo.svg'
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
                label: '電文データ',
                position: 'left'
            },
            {
                to: 'docs/jmafile/',
                label: 'ファイル形式データ',
                position: 'left'
            },
            {
                to: 'eewclient',
                label: 'EEW Client',
                position: 'left'
            },
            {
                type: 'html',
                value: '<span>lastUpdate: ' + `${lastUpdate.getFullYear()}/${lastUpdate.getMonth() + 1}/${lastUpdate.getDate()}` + '</span>',
                position: 'right'

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
                        label: 'コントロールパネル',
                        href: 'https://manager.dmdata.jp/control/'
                    },
                    {
                        label: 'Service status',
                        href: 'https://status.dmdata.jp/'
                    }
                ]
            },
            {
                title: 'Social',
                items: [
                    {
                        label: '公式 Twitter (@pdmdata)',
                        href: 'https://twitter.com/pdmdata'
                    },
                    {
                        label: '運営者 Twitter (@soshi1822)',
                        href: 'https://twitter.com/soshi1822'
                    },
                    {
                        label: 'Discord',
                        href: 'https://discord.gg/uP6gfgzKnA'
                    }
                ]
            }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} dmdata.jp<br/>予報業務許可（地震動）第237号`,
    },
    tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6
    },
    announcementBar: {
        id: 'information-cookie',
        content: 'Cookie等の外部送信については、<a href="/policy">プライバシーポリシー</a>をご覧ください。',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
    }
};


/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'DMDATA.JP',
    url: 'https://dmdata.jp',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/icon.png',
    themeConfig,
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js')
                },
                pages: {
                    path: 'site'
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            }
        ]
    ],
    i18n: {
        defaultLocale: 'ja',
        locales: ['ja'],
        localeConfigs:{
            ja: {
                htmlLang: 'ja-JP'
            }
        }
    },
    onBrokenAnchors: 'ignore'
};

module.exports = config;
