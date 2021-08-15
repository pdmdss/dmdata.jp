module.exports = {
    docs: {
        'Manual': ['index', 'parameter', 'sample/javascript'],
        'Reference': [
            'reference/index',
            {
                'API v2': [
                    'reference/api/v2/index',
                    {
                        'Contract v2': [
                            'reference/api/v2/contract.list'
                        ],
                        'Socket v2': [
                            'reference/api/v2/socket.list',
                            'reference/api/v2/socket.start',
                            'reference/api/v2/socket.close'
                        ],
                        'Telegram v2': [
                            'reference/api/v2/telegram.list'
                        ],
                        'WebSocket v2': [
                            'reference/api/v2/websocket'
                        ],
                        'Parameter v2': [
                            'reference/api/v2/parameter.earthquake',
                            'reference/api/v2/parameter.tsunami'
                        ],
                        'GD Earthquake v2': [
                            'reference/api/v2/gd.earthquake.list',
                            'reference/api/v2/gd.earthquake.event'
                        ]
                    }
                ],
                'API v1': [
                    {
                        'Socket v1': [
                            'reference/api/socket.v1/start'
                        ],
                        'Telegram v1': [
                            'reference/api/telegram.v1/list',
                            'reference/api/v1/telegram.data'
                        ],
                        'Parameters v1': [
                            'reference/api/parameters/tsunami',
                            'reference/api/parameters/earthquake'
                        ],
                        'WebSocket v1': [
                            'reference/api/websocket.v1/websocket'
                        ]
                    }
                ]
            },
            'reference/oauth2/v1/index',
            'reference/conversion/json/index'
        ],
        '配信データ': [
            'telegrams/index',
            {
                '地震津波 区分': [
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
                    'telegrams/et01410',
                    'telegrams/et01420',
                    'telegrams/et01421'
                ],
                '火山 区分': [
                    'telegrams/vo01020',
                    'telegrams/vo01710',
                    'telegrams/vo01720',
                    'telegrams/vo01730',
                    'telegrams/vo01740',
                    'telegrams/vo01750',
                    'telegrams/vo01810',
                    'telegrams/vo01820',
                    'telegrams/vo01830'
                ],
                '気象警報・注意報 区分': [
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
                ],
                '定時・その他 区分': [
                    'telegrams/sc02070',
                    'telegrams/sc02110',
                    'telegrams/sc02115',
                    'telegrams/sc02120'
                ]
            }
        ]
    }
};
