<!DOCTYPE html>
<html lang="zh-CN" data-theme="auto">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'ModernBoard Pro' }}</title>
    <meta name="description" content="{{ $description ?? 'ModernBoard Pro - 基于AirBuddy设计语言的现代化主题' }}">
    <meta name="keywords" content="ModernBoard, VPN, 代理服务, 现代化设计">
    <meta name="author" content="ModernBoard Team">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/theme/{{ $theme }}/assets/images/favicon.svg">
    <link rel="apple-touch-icon" href="/theme/{{ $theme }}/assets/images/icon-192.png">
    
    <!-- 预加载关键资源 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
    
    <!-- Google Fonts - Inter字体族 -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- 主题样式文件 -->
    <link rel="stylesheet" href="/theme/{{ $theme }}/assets/css/modern-core.css?v=3.0">
    <link rel="stylesheet" href="/theme/{{ $theme }}/assets/css/modern-components.css?v=3.0">
    
    <!-- 配置脚本 -->
    <script>
        window.modernboard = {
            theme: {
                name: '{{ $theme }}',
                version: '3.0.0',
                baseUrl: '/theme/{{ $theme }}',
                // 主题配置
                primaryColor: '{!! $theme_config['primary_color'] ?? '#667eea' !!}',
                secondaryColor: '{!! $theme_config['secondary_color'] ?? '#764ba2' !!}',
                mode: '{!! $theme_config['theme_mode'] ?? 'auto' !!}',
                layoutStyle: '{!! $theme_config['layout_style'] ?? 'modern' !!}',
                navbarStyle: '{!! $theme_config['navbar_style'] ?? 'glass' !!}',
                enableShadows: {{ ($theme_config['enable_shadows'] ?? 'true') === 'true' ? 'true' : 'false' }},
                enableAnimations: {{ ($theme_config['enable_animations'] ?? 'true') === 'true' ? 'true' : 'false' }},
                backgroundImage: '{!! $theme_config['background_image'] ?? '' !!}',
                customCSS: `{!! $theme_config['custom_css'] ?? '' !!}`,
                customJS: `{!! $theme_config['custom_js'] ?? '' !!}`
            },
            app: {
                title: '{{ $title ?? "ModernBoard Pro" }}',
                version: '{{ $version ?? "2.0.0" }}',
                logo: '{{ $logo ?? "" }}'
            },
            api: {
                baseUrl: '/api/v1',
                guestUrl: '/api/v1/guest',
                userUrl: '/api/v1/user',
                passportUrl: '/api/v1/passport'
            }
        };
    </script>
    
    <!-- 自定义CSS -->
    @if(!empty($theme_config['custom_css']))
    <style id="custom-theme-styles">
        {!! $theme_config['custom_css'] !!}
    </style>
    @endif
</head>
<body class="modern-body" data-layout="{{ $theme_config['layout_style'] ?? 'modern' }}">
    <!-- 加载屏幕 - AirBuddy风格 -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-content">
            <div class="loading-logo">
                @if($logo)
                    <img src="{{ $logo }}" alt="{{ $title }}" class="logo-image">
                @else
                    <div class="logo-text">{{ $title ?? 'ModernBoard' }}</div>
                @endif
            </div>
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="loading-text">正在加载精美界面...</div>
            <div class="loading-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    </div>

    <!-- 应用容器 -->
    <div id="app" class="app-container">
        <!-- 顶部导航栏 - 毛玻璃效果 -->
        <nav id="navbar" class="navbar navbar-{{ $theme_config['navbar_style'] ?? 'glass' }}">
            <div class="navbar-container">
                <!-- 品牌Logo -->
                <div class="navbar-brand">
                    @if($logo)
                        <img src="{{ $logo }}" alt="{{ $title }}" class="brand-logo">
                    @else
                        <div class="brand-text">
                            <span class="brand-icon">✨</span>
                            {{ $title ?? 'ModernBoard' }}
                        </div>
                    @endif
                </div>

                <!-- 导航菜单 -->
                <div class="navbar-menu" id="navbar-menu">
                    <a href="#dashboard" class="nav-item active" data-page="dashboard">
                        <i class="nav-icon">📊</i>
                        <span class="nav-text">仪表盘</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <a href="#plans" class="nav-item" data-page="plans">
                        <i class="nav-icon">💎</i>
                        <span class="nav-text">订阅套餐</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <a href="#orders" class="nav-item" data-page="orders">
                        <i class="nav-icon">🛒</i>
                        <span class="nav-text">我的订单</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <a href="#servers" class="nav-item" data-page="servers">
                        <i class="nav-icon">🌐</i>
                        <span class="nav-text">节点列表</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <a href="#invite" class="nav-item" data-page="invite">
                        <i class="nav-icon">🎁</i>
                        <span class="nav-text">邀请好友</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <a href="#tickets" class="nav-item" data-page="tickets">
                        <i class="nav-icon">🎫</i>
                        <span class="nav-text">工单系统</span>
                        <div class="nav-indicator"></div>
                    </a>
                    <a href="#profile" class="nav-item" data-page="profile">
                        <i class="nav-icon">👤</i>
                        <span class="nav-text">个人资料</span>
                        <div class="nav-indicator"></div>
                    </a>
                </div>

                <!-- 用户信息区域 -->
                <div class="navbar-user">
                    <div class="user-info">
                        <div class="user-avatar" id="user-avatar">
                            <span>U</span>
                        </div>
                        <div class="user-details">
                            <div class="user-email" id="user-email">未登录</div>
                            <div class="user-balance" id="user-balance">余额: ¥0.00</div>
                        </div>
                        <div class="user-dropdown-trigger">
                            <i class="dropdown-arrow">▼</i>
                        </div>
                    </div>
                    
                    <!-- 用户下拉菜单 -->
                    <div class="user-dropdown">
                        <div class="dropdown-header">
                            <div class="dropdown-avatar" id="dropdown-avatar">U</div>
                            <div class="dropdown-info">
                                <div class="dropdown-email" id="dropdown-email">未登录</div>
                                <div class="dropdown-balance" id="dropdown-balance">¥0.00</div>
                            </div>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="#profile" class="dropdown-item" data-page="profile">
                            <i class="dropdown-icon">⚙️</i>
                            <span>个人设置</span>
                        </a>
                        <a href="#orders" class="dropdown-item" data-page="orders">
                            <i class="dropdown-icon">📋</i>
                            <span>订单历史</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#logout" class="dropdown-item logout-btn">
                            <i class="dropdown-icon">🚪</i>
                            <span>退出登录</span>
                        </a>
                    </div>
                </div>

                <!-- 移动端菜单按钮 -->
                <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </nav>

        <!-- 移动端侧边栏 -->
        <div id="mobile-sidebar" class="mobile-sidebar">
            <div class="sidebar-overlay"></div>
            <div class="sidebar-content">
                <div class="sidebar-header">
                    <div class="sidebar-brand">
                        @if($logo)
                            <img src="{{ $logo }}" alt="{{ $title }}" class="sidebar-logo">
                        @else
                            <div class="sidebar-brand-text">{{ $title ?? 'ModernBoard' }}</div>
                        @endif
                    </div>
                    <button class="sidebar-close">✕</button>
                </div>
                
                <div class="sidebar-menu">
                    <a href="#dashboard" class="sidebar-item active" data-page="dashboard">
                        <i class="sidebar-icon">📊</i>
                        <span>仪表盘</span>
                    </a>
                    <a href="#plans" class="sidebar-item" data-page="plans">
                        <i class="sidebar-icon">💎</i>
                        <span>订阅套餐</span>
                    </a>
                    <a href="#orders" class="sidebar-item" data-page="orders">
                        <i class="sidebar-icon">🛒</i>
                        <span>我的订单</span>
                    </a>
                    <a href="#servers" class="sidebar-item" data-page="servers">
                        <i class="sidebar-icon">🌐</i>
                        <span>节点列表</span>
                    </a>
                    <a href="#invite" class="sidebar-item" data-page="invite">
                        <i class="sidebar-icon">🎁</i>
                        <span>邀请好友</span>
                    </a>
                    <a href="#tickets" class="sidebar-item" data-page="tickets">
                        <i class="sidebar-icon">🎫</i>
                        <span>工单系统</span>
                    </a>
                    <a href="#profile" class="sidebar-item" data-page="profile">
                        <i class="sidebar-icon">👤</i>
                        <span>个人资料</span>
                    </a>
                </div>
                
                <div class="sidebar-footer">
                    <a href="#logout" class="sidebar-logout logout-btn">
                        <i class="sidebar-icon">🚪</i>
                        <span>退出登录</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- 主内容区域 -->
        <main id="main-content" class="main-content">
            <!-- 页面内容将在这里动态加载 -->
            <div class="welcome-placeholder">
                <div class="welcome-icon">✨</div>
                <h2>欢迎使用 ModernBoard Pro</h2>
                <p>基于 AirBuddy 设计语言的现代化界面正在为您加载...</p>
            </div>
        </main>

        <!-- 浮动操作按钮 -->
        <div class="fab-container">
            <button id="fab-main" class="fab fab-main" title="快速操作">
                <i class="fab-icon">⚡</i>
            </button>
            <div class="fab-menu">
                <button class="fab fab-item" data-action="buy-plan" title="购买套餐">
                    <i class="fab-icon">💎</i>
                </button>
                <button class="fab fab-item" data-action="contact-support" title="联系客服">
                    <i class="fab-icon">💬</i>
                </button>
                <button class="fab fab-item" data-action="scroll-top" title="回到顶部">
                    <i class="fab-icon">⬆️</i>
                </button>
            </div>
        </div>
    </div>

    <!-- 模态框容器 -->
    <div id="modal-container" class="modal-container"></div>

    <!-- Toast通知容器 -->
    <div id="toast-container" class="toast-container"></div>

    <!-- 核心JavaScript文件 -->
    <script src="/theme/{{ $theme }}/assets/js/modern-app.js?v=3.0"></script>

    <!-- 自定义JavaScript -->
    @if(!empty($theme_config['custom_js']))
    <script id="custom-theme-scripts">
        {!! $theme_config['custom_js'] !!}
    </script>
    @endif

    <!-- 页脚HTML -->
    @if(!empty($theme_config['footer_html']))
    <footer class="custom-footer">
        <div class="footer-content">
            {!! $theme_config['footer_html'] !!}
        </div>
    </footer>
    @endif

    <!-- 性能监控 -->
    <script>
        // 页面加载性能监控
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`🚀 ModernBoard Pro 加载完成，耗时: ${loadTime.toFixed(2)}ms`);
            
            // 隐藏加载屏幕
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 800);
        });

        // 错误监控
        window.addEventListener('error', function(e) {
            console.error('💥 JavaScript错误:', e.error);
        });

        // 未处理的Promise拒绝
        window.addEventListener('unhandledrejection', function(e) {
            console.error('💥 未处理的Promise拒绝:', e.reason);
        });
    </script>
</body>
</html> 