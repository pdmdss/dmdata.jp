/**
 * @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').Sidebars}
 */
const sidebar = {
    docs: [
        {
            type: 'category',
            label: 'マニュアル',
            link: {
                type: 'doc',
                id: 'index'
            },
            items: [
                'parameter', 'sample/javascript', 'eew', 'testing', 'payment'
            ]
        },
        {
            type: 'category',
            label: 'リファレンス',
            link: {
                type: 'doc',
                id: 'reference/index'
            },
            items: [
                {
                    type: 'category',
                    label: 'API v2',
                    link: {
                        type: 'doc',
                        id: 'reference/api/v2/index'
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'Contract v2',
                            items: [
                                'reference/api/v2/contract.list'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Socket v2',
                            items: [
                                'reference/api/v2/socket.list',
                                'reference/api/v2/socket.start',
                                'reference/api/v2/socket.close'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Telegram v2',
                            items: [
                                'reference/api/v2/telegram.list',
                                'reference/api/v1/telegram.data'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'JmaFile v2',
                            items: [
                                'reference/api/v2/jmafile.list',
                                'reference/api/v1/jmafile.data'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'WebSocket v2',
                            items: [
                                'reference/api/v2/websocket'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Parameter v2',
                            items: [
                                'reference/api/v2/parameter.earthquake',
                                'reference/api/v2/parameter.realtime',
                                'reference/api/v2/parameter.tsunami'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'GD Earthquake v2',
                            items: [
                                'reference/api/v2/gd.earthquake.list',
                                'reference/api/v2/gd.earthquake.event'
                            ]
                        },
                        {
                            type: 'category',
                            label: 'GD Eew v2',
                            items: [
                                'reference/api/v2/gd.eew.list',
                                'reference/api/v2/gd.eew.event'
                            ]
                        }
                    ]
                },
                {
                    type: 'doc',
                    label: 'OAuth2',
                    id: 'reference/oauth2/v1/index'
                },
                {
                    type: 'category',
                    label: 'JSON化データ',
                    link: {
                        type: 'doc',
                        id: 'reference/conversion/json/index'
                    },
                    items: [
                        'reference/conversion/json/schema/eew-information',
                        'reference/conversion/json/schema/earthquake-information',
                        'reference/conversion/json/schema/earthquake-explanation',
                        'reference/conversion/json/schema/earthquake-counts',
                        'reference/conversion/json/schema/earthquake-hypocenter-update',
                        'reference/conversion/json/schema/earthquake-nankai',
                        'reference/conversion/json/schema/tsunami-information',
                        'reference/conversion/json/schema/volcano-information',
                        'reference/conversion/json/schema/weather-warning',
                        'reference/conversion/json/schema/weather-information',
                        'reference/conversion/json/schema/weather-impact-society',
                        'reference/conversion/json/schema/weather-early',
                        'reference/conversion/json/schema/weather-tornado',
                        'reference/conversion/json/schema/weather-typhoon',
                        'reference/conversion/json/schema/weather-landslide',
                        'reference/conversion/json/schema/weather-river-flood',
                        'reference/conversion/json/schema/forecast-prefecture',
                        'reference/conversion/json/schema/forecast-warning-possibility',
                        'reference/conversion/json/schema/forecast-season',
                        'reference/conversion/json/schema/forecast-2week-temperature',
                        'reference/conversion/json/schema/forecast-weathermap',
                        'reference/conversion/json/component',
                        'reference/conversion/json/errors'
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: '電文データ',
            link: {
                type: 'doc',
                id: 'telegrams/index'
            },
            items: [
                {
                    type: 'category',
                    label: '緊急地震（予報）区分',
                    items: [
                        'telegrams/ew09010',
                        'telegrams/ew09030',
                        'telegrams/ew09040'
                    ]
                },
                {
                    type: 'category',
                    label: '緊急地震（警報） 区分',
                    items: [
                        'telegrams/ew09020'
                    ]
                },
                {
                    type: 'category',
                    label: '緊急地震（リアルタイム震度） 区分',
                    items: [
                        'telegrams/ew09080'
                    ]
                },
                {
                    type: 'category',
                    label: '地震津波 区分',
                    items: [
                        'telegrams/et01010',
                        'telegrams/et01110',
                        'telegrams/et01120',
                        'telegrams/et01121',
                        'telegrams/et01130',
                        'telegrams/et01310',
                        'telegrams/et01320',
                        'telegrams/et01330',
                        'telegrams/et01340',
                        'telegrams/et01350',
                        'telegrams/et01360',
                        'telegrams/et01370',
                        'telegrams/et01380',
                        'telegrams/et01410',
                        'telegrams/et01420',
                        'telegrams/et01421',
                        'telegrams/et01430'
                    ]
                },
                {
                    type: 'category',
                    label: '火山 区分',
                    items: [
                        'telegrams/vo01020',
                        'telegrams/vo01710',
                        'telegrams/vo01720',
                        'telegrams/vo01730',
                        'telegrams/vo01740',
                        'telegrams/vo01750',
                        'telegrams/vo01760',
                        'telegrams/vo01810',
                        'telegrams/vo01820',
                        'telegrams/vo01830'
                    ]
                },
                {
                    type: 'category',
                    label: '気象警報・注意報 区分',
                    items: [
                        'telegrams/we02010',
                        'telegrams/we02050',
                        'telegrams/we02020',
                        'telegrams/we02030',
                        'telegrams/we02210',
                        'telegrams/we02220',
                        'telegrams/we02230',
                        'telegrams/we02310',
                        'telegrams/we02320',
                        'telegrams/we02330',
                        'telegrams/we02410',
                        'telegrams/we02420',
                        'telegrams/we02430',
                        'telegrams/we02560',
                        'telegrams/we02520',
                        'telegrams/we02521',
                        'telegrams/we02530',
                        'telegrams/we02540',
                        'telegrams/we02550',
                        'telegrams/we02551',
                        'telegrams/we02610',
                        'telegrams/we02620',
                        'telegrams/we02630',
                        'telegrams/we02650',
                        'telegrams/we02660',
                        'telegrams/we02670',
                        'telegrams/we02690',
                        'telegrams/we02695',
                        'telegrams/we02691',
                        'telegrams/we02680',
                        'telegrams/we02710',
                        'telegrams/we02810'
                    ]
                },
                {
                    type: 'category',
                    label: '天気予報 区分',
                    items: [
                        'telegrams/fo03010',
                        'telegrams/fo03020',
                        'telegrams/fo03050',
                        'telegrams/fo03130',
                        'telegrams/fo03150',
                        'telegrams/fo03210',
                        'telegrams/fo03220',
                        'telegrams/fo03230',
                        'telegrams/fo03240',
                        'telegrams/fo03510',
                        'telegrams/fo03520',
                        'telegrams/fo03530',
                        'telegrams/fo03540',
                        'telegrams/fo03550',
                        'telegrams/fo03560'
                    ]
                },
                {
                    type: 'category',
                    label: '気象観測 区分',
                    items: [
                        'telegrams/ob04010',
                        'telegrams/ob04015',
                        'telegrams/ob04020',
                        'telegrams/ob04021',
                        'telegrams/ob04022',
                        'telegrams/ob04023',
                        'telegrams/ob04025',
                        'telegrams/ob04026',
                        'telegrams/ob04110',
                        'telegrams/ob04120',
                        'telegrams/ob04125',
                        'telegrams/ob04210',
                        'telegrams/ob04310',
                        'telegrams/ob04320',
                        'telegrams/ob04330',
                        'telegrams/ob04410',
                        'telegrams/ob04510',
                        'telegrams/ob04610',
                        'telegrams/ob05010',
                        'telegrams/ob05011',
                        'telegrams/ob05110',
                    ]
                },
                {
                    type: 'category',
                    label: '定時・その他 区分',
                    items: [
                        'telegrams/sc02070',
                        'telegrams/sc02110',
                        'telegrams/sc02115',
                        'telegrams/sc02120',
                        'telegrams/sc03310'
                    ]
                },
                {
                    type: 'category',
                    label: '雷観測データ 区分',
                    items: [
                        'telegrams/li10010',
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: 'ファイル形式データ',
            link: {
                type: 'doc',
                id: 'jmafile/index'
            },
            items: [
                'jmafile/jf02140',
                'jmafile/jf02130',
                'jmafile/jf03011',
                'jmafile/jf03012',
                'jmafile/jf03130',
                'jmafile/jf03131',
                'jmafile/jf03190',
                'jmafile/jf03090',
                'jmafile/jf03711',
                'jmafile/jf03712',
                'jmafile/jf03722',
                'jmafile/jf03140',
                'jmafile/jf03150',
                'jmafile/jf03511',
                'jmafile/jf03512',
                'jmafile/jf03513',
                'jmafile/jf03261',
                'jmafile/jf03262',
                'jmafile/jf03310',
                'jmafile/jf04100',
                'jmafile/jf06035',
                'jmafile/jf06310',
                'jmafile/jf06320',
                'jmafile/jf06330',
                'jmafile/jf06340',
                'jmafile/jf06251',
                'jmafile/jf06252',
                'jmafile/jf06241',
                'jmafile/jf06242',
                'jmafile/jf06243',
                'jmafile/jf06231',
                'jmafile/jf06232',
                'jmafile/jf06233',
                'jmafile/jf06111',
                'jmafile/jf06112',
                'jmafile/jf07010'
            ]
        }
    ]
};

module.exports = sidebar;
