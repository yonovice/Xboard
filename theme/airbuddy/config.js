/**
 * Configuration file for the application
 * 主题配置文件
 * created by AirBuddy on https://github.com/vlesstop/v2board-theme-buddy
 */

/**
 * 全局配置
 * @type {import('../src/theme-classic/composables/useClassicConfig.ts').IClassicConfig}
 */
window.CONFIG = {
    // 通用配置
    logo: 'https://github.com/budingyun123/picx-images-hosting/raw/master/App/IMAGE-2025-06-09-00:08:21.2obry9scyb.webp', // 网站logo
    title: "布丁云", // 网站标题.

    // 主题配置
    theme: {
        primary: '#f7707e', // 主题色
        mode: 'light', // 默认主题模式: dark 暗色，light 亮色，auto 自动
    },

    // 国际化配置
    internationalize: {
        default: 'zh-CN', // 默认语言
        // 支持的语言列表，可按需增加和删减，key 是显示名称，value 是对应 JSON 语言包的文件名
        support: {
            '简体中文':'zh-CN',
            '繁體中文':'zh-HK',
            'English':'en',
            '日本語':'jp',
            'Deutsch':'de',
            '한국어':'kr',
        }
    },

    // Crisp 配置
    crisp: {
        id: '', // Crisp ID
        enable: true, // 是否启用 Crisp 聊天窗口
    },

    // 全局页面配置
    page: {
        layout: 'common', // 布局模式: common 常规布局，concise 简约布局
        loader: {
            skeleton: true, // 是否显示骨架屏
            minimum: 1200, // 骨架屏最低显示时间，单位毫秒
        },
        redirect: 'Home', // 访问根路径时重定向的页面，可选值：'Home' | 'Dashboard'，如果是 Dashboard 但用户未登录将重定向到登录注册页

        // 页面配置，控制显示/隐藏页面，同时将控制 siderbar / topbar 的路由菜单
        pages: {
            dashboard: true, // 控制台首页
            knowledge: true, // 使用教程页面
            shop: true, // 商店页面
            node: true, // 节点页面
            order: true, // 订单页面
            invite: true, // 邀请页面
            profile: true, // 个人中心页面
            ticket: true, // 工单页面
            traffic: true, // 流量页面
        },
        // 功能菜单显示配置
        menus: {
            language: true, // 是否显示语言切换
            theme: true, // 是否显示主题模式切换
            user: true, // 是否显示用户按钮，包含个人中心、退出登录等
            giftCard: false, // 是否显示礼品卡按钮，请确保 giftCard 模块的 switch 为 true，以及后端支持礼品卡功能
            couponExchange: false, // 是否显示优惠券兑换按钮，建议和礼品卡不要同时使用，容易造成歧义
        },
        // common 布局下的 siderbar 侧边栏配置
        siderbar: {
            collapsible: true, // PC端是否可折叠
            label: true, // 是否显示菜单分组标签
        },
        // concise 布局下的 navbar 底部导航栏配置
        navbar: {
            // 重要菜单，重要菜单会在顶部导航栏中显示，其他菜单会在下拉更多菜单中显示，必须是 pages 中的 key, 最多四个，否则移动端会显示不全，超过会忽略，只取前四个
            important: ['dashboard', 'shop', 'invite', 'profile'],
            more: true, // 是否显示更多菜单
        },
        // 图标配置，主要配置图标风格，目前只影响主要的路由导航菜单图标
        // 可选风格：'tabler' | 'fluent' | 'mingcute' | 'mdi' | 'iconpark' | 'solar' 默认值：tabler
        icon: 'tabler'
    },

    // 全局用户配置
    user: {
        adminAvatar: 'https://github.com/dc8683/picx-images-hosting/raw/master/rocket/Admin-Image.3nrslt4k8f.webp', // 管理员头像，工单对话中显示的管理回复头像
        userAvatar: 'https://github.com/dc8683/picx-images-hosting/raw/master/rocket/Avatar-Image.pfiiawar3.webp', // 用户头像，适用于全局所有页面中显示的用户头像，即工单对话中显示的用户头像
        // 用户阈值配置，用户阈值会影响到首页的欢迎卡片和公告模块中界定当前用户属于什么状态，用户状态一共有如下几种：
        // - 新用户：可以在下面 newUserTime 设定阈值，如设置 48，则代表注册时间 48 小时都还属于新用户
        // - 从未订阅过的用户：既不是新用户、也从来没买过的订阅套餐的用户
        // - 订阅已过期的用户：即已经超出套餐过期时间的用户
        // - 流量已用完的用户：即套餐流量为 0GB 的用户
        // - 订阅快到期的用户：可以在下面 expiredTime 设定阈值，如设置 72，则代表订阅套餐在 72 小时内过期就属于快到期的用户
        // - 流量快用完的用户：可以在下面 trafficLow 设定阈值，如设置 10，则代表流量等于或者小于 10GB 的就属于流量快用完的用户
        // - 订阅中的正常用户：一切正常的用户
        // 以上几种状态优先级为 新用户 > 从未订阅过的用户 > 订阅已过期的用户 > 流量已用完的用户 > 订阅快到期的用户 > 流量快用完的用户 > 订阅中的正常用户
        // 优先级会在 欢迎卡片、公告模块中展示信息中进行算法决策
        thresholdValue: {
            newUserTime: 48, // 新用户时间阈值，单位：小时
            expirySoonTime: 72, // 快到期时间阈值，单位：小时
            trafficLow: 10, // 流量快用完的阈值，单位：GB
        },
    },

    // 展示性首页配置
    home: {
        poster: {
            earth_texture: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/8k_earth_nightmap.3yemews86x.1lc2nj81v4.webp', // 地球纹理图片
            universe_background: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/space-unsplash.6m42pbctq4.8s3k0v6k56.webp', // 宇宙背景图片
            feature_number: 5, // 轨道特性展示数量，最大 6 个，特性文案内容请在国际化配置中修改
        },
        matrix: {
            bgImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/App-Matrix-1025hx.8ojvddbere.7eh0wtvi4f.webp'
        },
        shopPlan: {
            cycle: true,
            flow: true
        },
        nodes: {
            country: ["cn-hk", "ca", "de", "in", "en", "us", "kr", "kp", "jp", "aq", "sg", "tw", "th", "vn", "my", "ph", "id", "tr", "ru", "fr", "es", "it", "br", "mx", "ar", "au", "nz", "za", "eg", "il", "ae", "fi", "se", "dk", "nl", "be", "no", "rs", "rw", "sa", "sb", "sc", "sd", "sh", "si", "sk", "sl", "sm", "sn", "so", "sr", "ss", "su", "sv", "sx", "sy", "sz", "td", "tg", "tj", "tk", "tl", "tm", "tn", "to", "tv", "tz", "ua", "ug", "uk", "uy", "uz", "va", "ve", "vu", "ws", "xk", "ye", "yt", "yu", "zm", "zw"] // 节点国家代码，用于显示国旗，ISO 3166-1 alpha-2，可以根据需要删减，国家名称在国际化配置
        },
        // 首页每一个模块的显示配置
        display: {
            poster: true,
            client: true,
            matrix: true,
            nodes: true,
            privacy: true,
            shop: false,
            service: true,
        }
    },

    // 登录/注册/忘记密码页面配置
    auth: {
        // 特性介绍
        features: [
            {
                key: 'first',
                image: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-cloud-upload.4n7vyz7bf1.7zqoj4pyf4.webp',
            },
            {
                key: 'second',
                image: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-ai.8hgnhxp9c8.3rbh9azpmp.webp',
            },
            {
                key: 'third',
                image: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-media.1vytqwl7cz.wit3ikiv5.webp',
            }
        ],
        backgroundMode: 'img', // 背景模式: earth 地球动画，img 图片，none 无背景；earth 地球动画请配置 home.poster.xx
        backgroundImage: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Fluid-gradient-background.1e8s2bjtsj.45hx0680hv.webp', // 背景图片，如果背景模式为 img，则使用此图片

        inviteCodeEdit: false, // 是否允许用户修改邀请码, true 可以，false 不可以
        inviteDisplay: true, // 是否显示邀请码输入框，true 显示，false 不显示
        confirmPassword: true, // 是否显示确认密码输入框，true 显示，false 不显示
    },

    // 客户端模块配置，将应用于使用教程页面、 Home 页面、dashboard 页面的客户端模块
    // windows/mac/ios/android 不同操作系统的客户配置如下：
    // id: 知识库文章 ID，
    // downloadLink: 对应平台的客户端下载链接，如果 downloadNow 为 true，则点击时会直接下载客户端并打开对应的教程页面
    // docLink: 教程外链，设置后点击时会打开新窗口跳转到，如果不设置则跳转到对应的知识库文章 ID 页面
    client: {
        display: true, // 是否显示
        downloadNow: true, // 点击卡片时是否马上下载客户端
        ios: {
            id: 1,
            downloadLink: 'sing-box://import-remote-profile?url=https%3A%2F%2Fbudingyun.com%2Fs%2Fa8f1141deb89ab75b0cc41c4162e818a%26flag%3Dsing-box#%E5%B8%83%E4%B8%81%E4%BA%91', // iOS 客户端下载链接
            docLink: undefined,
        },
        android: {
            id: 2,
            downloadLink: 'https://github.com/budingyun123/picx-images-hosting/releases/download/MixTools/clash_android.apk', // Android 客户端下载链接
            docLink: undefined,
        },
        mac: {
            id: 3,
            downloadLink: 'https://github.com/budingyun123/picx-images-hosting/releases/download/MixTools/mac_clash_apple.dmg', // macOS 客户端下载链接
            docLink: undefined,
        },
        windows: {
            id: 4,
            downloadLink: 'https://github.com/budingyun123/picx-images-hosting/releases/download/MixTools/clash_win.exe', // Windows 客户端下载链接
            docLink: undefined,
        },
        //  Home 页面中的客户端 mockup 图片
        mockup: {
            macbook: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/New-MacBook-Pro-16-Inch-Mockup.175k6vxoc2.6t7dajh51y.webp',
            iphone: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/iPhone-14-Pro-Max---Mockup.3rbejixmy9.39lfkqef9z.webp'
        }
    },

    // 商店页面配置
    shop: {
        sort: 'cycle', // 优先显示套餐列表: cycle 周期套餐列表，flow 流量套餐列表
        deduct_enable: true, // 是否开启折抵，和后台 - 系统设置 - 订阅 - 是否开启折抵同步，由于后端折抵开关配置并未向前端传递，因此这里需要手动配置同步和后台中的配置
        cycle: {
            primary_plan: 6, // 订阅套餐列表中默认高亮显示的套餐 ID，null 为不高亮显示
            feature: {
                max_num: 5, // 卡片中显示的特性数量，超过此数量的特性将被隐藏，需要 hover 查看更多，0 为全部显示
            },
            displayMonthYear: true, // 是否显示年月 tab 切换和是否显示年付购买按钮
            displayDiscount: true, // 是否显示折扣描述信息，前提是保证月付和年付价格不为 0
        },
        flow: {
            primary_plan: null, // 按量套餐列表中默认高亮显示的套餐 ID，null 为不高亮显示
            feature: {
                max_num: 0, // 卡片中显示的特性数量，超过此数量的特性将被隐藏，需要 hover 查看更多，0 为全部显示
            }
        }
    },

    // 节点配置
    node: {
        customNodeBanner: {
            display: true,
            elementImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-server.lvwkl381q.67xpo8morc.webp',
        },
        ssLink: false // 是否显示 ss 订阅链接复制打开按钮
    },

    // 订单配置
    order: {
        payPendingImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-order.2vex42nyi6.13m0yymriz.webp',
        overrideConfirm: true, // 用户在变更套餐时是否要弹窗二次确认
        payUrlDisplay: false, // 是否显示支付链接，true 显示，false 不显示
    },

    // 邀请配置
    invite: {
        bannerDisplay: true, // 是否显示首页的邀请 banner
        bannerImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-cash.26lnk20fhk.1e8us41zod.webp',
        inviteCodeUrlPrefix: window.location.origin, // 邀请码链接前缀，默认是当前网站的域名
    },

    // 工单配置
    ticket: {
        elementImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-hand-pen.9gwqv3s0h3.2obryfjyzi.webp'
    },

    // 公告配置
    notices: {
        box: true, // 是否显示公告盒子，公告盒子会显示所有的公告
        detail: {
            img: false,
        },
        // 首页公告栏配置
        section: {
            display: true, // 是否显示在首页
            max: 2, // 首页公告栏最大显示数量，0 为全部显示，超过此数量的公告将被收进公告盒子，数量不宜过多，否则会影响流量详情卡片的显示
        },
        // 重要公告配置，重要公告即弹窗公告
        important: {
            display: true, // 是否显示
            tagKey: '弹窗', // 弹窗显示的公告标签，仅支持时间最新的一条公告弹窗显示
        },
        // 特色公告配置
        special: {
            display: true,
            tagKey: '特色公告', // 特色公告标签
            // 特色公告预设，可以将对象传入，优先级：公告接口数据 > 预设数据
            presets: [
                // 面向所有用户的弹窗
                // {
                //     toUser: 'everyone',
                //     code: 'HappyNewYear',
                //     title: 'EveryOne\n收下这份礼物吧！',
                //     cardComponent: 'BagDrawer',
                //     countdown: {
                //         startTime: new Date('2025-04-25').getTime(),
                //         effectiveTime: 48
                //     }
                // },
                // 面向新用户的弹窗
                {
                    toUser: 'newUser',
                    code: 'HappyNewYear',
                    title: '初次相见\n立即领券下单',
                    cardComponent: 'VipCard',
                    countdown: {
                        effectiveTime: 48
                    }
                },
                // 面向已过期用户的弹窗
                {
                    toUser: 'expiredUser',
                    title: '您的套餐快到期啦',
                    btnText: '点击续费',
                    cardComponent: 'RenewPlan',
                },
                // 面向流量快用完用户的弹窗
                {
                    toUser: 'trafficLowUser',
                    title: '流量告急\n您的流量即将用完',
                    btnText: '点击重置流量',
                    cardComponent: 'ResetTraffic',
                    countdown: {
                        startTime: new Date('2025-04-25').getTime(),
                        effectiveTime: 48
                    }
                }
            ]
        },
        /**
         * 自动弹窗显示配置
         */
        autoDisplay: {
            interval: 0, // 同一公告显示时间间隔，单位：天，0 为每次打开页面都显示
            repeat: true, // 是否重复显示同一公告，false 为只显示一次
            onlyHome: false, // 是否只在首页显示公告
        },
        /**
         * 特色公告元素图片资源
         */
        element: {
            bagDrawerText: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Super-Speed-Kill-Text-Element.7w6zvmetmy.1sfaizaajk.webp',
            bagDrawerBg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Red-envelope-gold-coin-elements.1vytqw57zb.8z6rwb8std.webp',
            blackGift: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/black-gift-element.m8y9ssdi.2324c4pioy.webp',
            cashBox: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Cash-Box-Element.4n7vyyrc0y.1sfaizaajn.webp',
            vipCard: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/hand-vip-card-element.9dd4xdiydo.67xpo8moro.webp'
        }
    },

    // 订阅模块配置
    subscription: {
        display: true, // 是否显示订阅模块, 首页 / 账号设置页面都会有此模块
        clash: {
            display:true, // 是否显示 Clash
            icon: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Clash.9gwri62wr1.5j4g47z5r8.webp'
        },
        shadowrocket: {
            display:true, // 是否显示 Shadowrocket
            icon: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Shadowrocket.8z6ptl1j67.1vywgp3d9h.webp'
        },
        singbox: {
            display:true, // 是否显示 Singbox
            icon: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Singbox.espc7ryvj.6bhblyfrhh.svg'
        },
        surfboard: {
            display:true, // 是否显示 Surfboard
            icon: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Surfboard.8vn3vv8ggg.6pnrcto2cm.svg'
        },
        surge: {
            display:true, // 是否显示 Surge
            icon: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Surge.8s3hy5fdqo.b95h865t2.svg'
        },
        quantumult: {
            display:true, // 是否显示 Quantumult
            icon: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Quantumult.102cyimf66.4xushx4pgn.webp'
        },
        subscribeLink: true, // 是否显示订阅链接
    },

    // 充值模块配置
    recharge: {
        switch: false, // 是否启用余额充值功能，请确保后端服务支持此功能
        // 充值金额预设选项，请在面板后台 - 系统设置 - 充值奖励中保持一致，才能确保充值奖励生效
        preset: ['30', '50', '100:20', '200:50', '300:100', '500:200'],
        customInput: true, // 是否允许用户自定义输入充值金额
        min: 100,
        max: 9999,
        float: false,
    },

    // 礼品卡模块配置
    giftCard: {
        switch: false, // 是否启用礼品卡功能，请确保后端服务支持此功能
        elementImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/3d-element-gift.lvwkl3813.8hgq7q7f8o.webp'
    },

    // 100% 优惠券兑换配置，建议和礼品卡不要同时使用，容易造成歧义，如果您的面板是 v2board / xboard，没有礼品卡功能，建议使用这个
    couponExchange: {
        elementImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/Gift3D.6bh9l0f6qj.3uv3718vl4.webp'
    },

    // 新用户/未购买订阅用户的欢迎卡片
    welcomeCard: {
        // 组件类型: 'element' | 'wallet' | 'traffic' | 'plan'
        // element: 元素组件，需要配置元素图片
        // wallet: 钱包组件，会展示佣金、余额和充值按钮
        // traffic: 流量统计组件，会展示流量使用详情
        // plan: 推荐套餐组件，会展示推荐套餐
        newUser: 'plan', // 新用户显示什么组件
        unsubscribedUser: 'plan', // 从未订阅过的用户显示什么组件
        expiredUser: 'plan', // 订阅已过期的用户显示什么组件
        trafficEmptyUser: 'traffic', // 流量已用完的用户显示什么组件
        expirySoonUser: 'plan', // 订阅快到期的用户显示什么组件
        trafficLowUser: 'traffic', // 流量快用完的用户显示什么组件
        subscriptionUser: 'wallet', // 订阅中的正常用户显示什么组件
        // plan 组件推荐套餐配置，前提是上面配置中对应的用户状态下的组件是 plan
        // 每一个 ID 都会影响按钮点击最终跳转的套餐下单页，ID 为 0 则是他购买过的套餐
        planId: {
            newUser: 5, // 新用户的推荐套餐 ID
            unsubscribedUser: 1, // 从未订阅过的用户推荐套餐 ID
            expiredUser: 0, // 订阅已过期的用户推荐套餐 ID
            trafficEmptyUser: 0, // 流量已用完的用户推荐套餐 ID
            expirySoonUser: 7, // 订阅快到期的用户推荐套餐 ID
            trafficLowUser: 0, // 流量快用完的用户推荐套餐 ID
            subscriptionUser: 1, // 订阅中的正常用户推荐套餐 ID
        },
        // 购买/续费按钮什么用户状态下显示，可填入多个，例如流量快用完和订阅快到期的用户都显示购买按钮，可以填入 ['trafficLowUser', 'expirySoonUser']
        // 可选值有  "newUser" | "expiredUser" | "trafficEmptyUser" | "expirySoonUser" | "trafficLowUser" | "subscriptionUser" | "unsubscribedUser"
        // Tips: 如果对应的用户状态标签你设置了 plan 组件，那么就不建议你在这里设置购买按钮了，因为 plan 组件本身就有购买按钮
        buyButton: ['expiredUser', 'trafficEmptyUser', 'expirySoonUser', 'trafficLowUser'],
        // element 的图片资源
        elementImg: 'https://github.com/budingyun123/picx-images-hosting/raw/master/budingHome/game-machine.3rbf9panfp.lvzadldyh.webp',
        // 背景模式，'blurImg' | 'none' , 'blurImg' 为以 elementImg 来模糊背景，none 则不处理
        backgroundMode: 'none',
    }
}