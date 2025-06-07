/**
 * ModernBoard Theme Core JavaScript
 * 现代化主题的核心功能
 */

class ModernThemeCore {
    constructor() {
        this.config = window.modernTheme || {};
        this.currentTheme = this.getStoredTheme() || this.config.theme?.mode || 'auto';
        this.animations = this.config.theme?.animations !== false;
        this.sidebar = {
            collapsed: this.getStoredSidebarState() || false
        };
        
        this.init();
    }

    init() {
        this.initTheme();
        this.initEventListeners();
        this.initAnimations();
        this.initSidebar();
        this.initScrollEffects();
        this.initTooltips();
        this.applyCustomStyles();
        
        console.log('🚀 ModernBoard主题已加载');
    }

    // ===== 主题管理 =====
    initTheme() {
        // 应用主题
        this.applyTheme(this.currentTheme);
        
        // 如果是自动模式，监听系统主题变化
        if (this.currentTheme === 'auto') {
            this.watchSystemTheme();
        }
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        // 移除现有主题类
        root.removeAttribute('data-theme');
        
        if (theme === 'auto') {
            // 自动模式：根据系统偏好设置
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            root.setAttribute('data-theme', theme);
        }
        
        // 更新主题色
        this.updateThemeColors();
        
        this.currentTheme = theme;
        this.storeTheme(theme);
    }

    updateThemeColors() {
        const root = document.documentElement;
        const primary = this.config.theme?.primary || '#6366f1';
        const secondary = this.config.theme?.secondary || '#8b5cf6';
        
        // 动态更新CSS变量
        root.style.setProperty('--accent-primary', primary);
        root.style.setProperty('--accent-secondary', secondary);
        
        // 更新meta标签的主题色
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.content = primary;
        }
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (this.currentTheme === 'auto') {
                this.applyTheme('auto');
            }
        });
    }

    toggleTheme() {
        const currentActualTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentActualTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('modernboard-theme');
        } catch (e) {
            return null;
        }
    }

    storeTheme(theme) {
        try {
            localStorage.setItem('modernboard-theme', theme);
        } catch (e) {
            // 忽略存储错误
        }
    }

    // ===== 侧边栏管理 =====
    initSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            if (this.sidebar.collapsed) {
                sidebar.classList.add('sidebar-collapsed');
                mainContent.classList.add('sidebar-collapsed');
            }
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            this.sidebar.collapsed = !this.sidebar.collapsed;
            
            sidebar.classList.toggle('sidebar-collapsed', this.sidebar.collapsed);
            mainContent.classList.toggle('sidebar-collapsed', this.sidebar.collapsed);
            
            this.storeSidebarState(this.sidebar.collapsed);
            
            // 触发自定义事件
            window.dispatchEvent(new CustomEvent('sidebar-toggle', {
                detail: { collapsed: this.sidebar.collapsed }
            }));
        }
    }

    getStoredSidebarState() {
        try {
            return JSON.parse(localStorage.getItem('modernboard-sidebar-collapsed') || 'false');
        } catch (e) {
            return false;
        }
    }

    storeSidebarState(collapsed) {
        try {
            localStorage.setItem('modernboard-sidebar-collapsed', JSON.stringify(collapsed));
        } catch (e) {
            // 忽略存储错误
        }
    }

    // ===== 动画处理 =====
    initAnimations() {
        if (!this.animations) {
            document.body.classList.add('no-animations');
            return;
        }

        // 页面加载动画
        this.animateOnLoad();
        
        // 滚动触发动画
        this.initScrollAnimations();
    }

    animateOnLoad() {
        const elements = document.querySelectorAll('.card, .navbar, .sidebar');
        elements.forEach((el, index) => {
            if (this.animations) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    el.style.transition = 'all 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }

    initScrollAnimations() {
        if (!this.animations) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-scale');
                }
            });
        }, observerOptions);

        // 观察卡片元素
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            observer.observe(card);
        });
    }

    // ===== 滚动效果 =====
    initScrollEffects() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateScrollEffects() {
        const scrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            // 导航栏背景透明度
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // 视差效果
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const rate = scrollY * -0.5;
            el.style.transform = `translateY(${rate}px)`;
        });
    }

    // ===== 工具提示 =====
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    showTooltip(event) {
        const element = event.target;
        const text = element.getAttribute('data-tooltip');
        
        if (!text) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        element._tooltip = tooltip;
    }

    hideTooltip(event) {
        const element = event.target;
        if (element._tooltip) {
            element._tooltip.remove();
            element._tooltip = null;
        }
    }

    // ===== 自定义样式应用 =====
    applyCustomStyles() {
        const config = this.config.theme || {};
        
        // 应用布局样式
        if (config.layout) {
            document.body.classList.add(`layout-${config.layout}`);
        }
        
        // 应用导航栏样式
        if (config.navbar) {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.add(`navbar-${config.navbar}`);
            }
        }
        
        // 应用卡片阴影
        if (config.shadow) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.classList.add(`shadow-${config.shadow}`);
            });
        }
        
        // 应用背景图片
        if (this.config.background_url) {
            document.body.style.backgroundImage = `url(${this.config.background_url})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        }
    }

    // ===== 事件监听器 =====
    initEventListeners() {
        // 主题切换按钮
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
            
            if (e.target.closest('.sidebar-toggle')) {
                this.toggleSidebar();
            }
        });

        // 移动端侧边栏
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                const clickedInsideSidebar = e.target.closest('.sidebar');
                const clickedToggle = e.target.closest('.sidebar-toggle');
                
                if (!clickedInsideSidebar && !clickedToggle && sidebar?.classList.contains('mobile-open')) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        });

        // 响应式处理
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + D: 切换深色模式
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // Ctrl/Cmd + B: 切换侧边栏
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleSidebar();
            }
        });
    }

    handleResize() {
        const sidebar = document.querySelector('.sidebar');
        
        if (window.innerWidth > 768) {
            // 桌面端：恢复侧边栏状态
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
        }
    }

    // ===== 公共方法 =====
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // 动画显示
        setTimeout(() => notification.classList.add('show'), 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.applyCustomStyles();
        this.updateThemeColors();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.modernBoard = new ModernThemeCore();
});

// 防止页面闪烁
if (window.modernTheme?.theme?.mode) {
    const preferredTheme = localStorage.getItem('modernboard-theme') || window.modernTheme.theme.mode;
    if (preferredTheme === 'dark' || (preferredTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
} 