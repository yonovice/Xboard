/**
 * ModernBoard Pro - 主应用程序
 * 基于AirBuddy设计语言的现代化主题
 * Version 3.0 - 完全重构
 */

class ModernBoardApp {
    constructor() {
        this.apiConfig = {
            baseURL: '/api/v1',
            userURL: '/api/v1/user',
            passportURL: '/api/v1/passport'
        };
        this.user = null;
        this.currentPage = 'dashboard';
        this.init();
    }

    async init() {
        try {
            await this.loadUser();
            this.setupEventListeners();
            this.renderDashboard();
        } catch (error) {
            console.error('应用初始化失败:', error);
        }
    }

    async loadUser() {
        try {
            const response = await this.apiRequest('GET', `${this.apiConfig.userURL}/info`);
            this.user = response.data;
            return this.user;
        } catch (error) {
            console.error('加载用户信息失败:', error);
            return null;
        }
    }

    async apiRequest(method, url, data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        return await response.json();
    }

    async loadSubscriptionInfo() {
        try {
            const response = await this.apiRequest('GET', `${this.apiConfig.userURL}/getSubscribe`);
            return response.data || {};
        } catch (error) {
            console.error('加载订阅信息失败:', error);
            return {};
        }
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '1';
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    setupEventListeners() {
        // 设置页面导航
        document.addEventListener('click', (e) => {
            const pageLink = e.target.closest('[data-page]');
            if (pageLink) {
                e.preventDefault();
                const page = pageLink.dataset.page;
                this.navigateToPage(page);
            }
        });
    }

    navigateToPage(page) {
        this.currentPage = page;
        switch (page) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'plans':
                this.renderPlans();
                break;
            default:
                this.renderDashboard();
        }
    }

    /**
     * 渲染仪表盘 - 精确复制AirBuddy的设计
     */
    async renderDashboard() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        this.showLoading();

        try {
            // 加载统计数据
            const statsResponse = await this.apiRequest('GET', `${this.apiConfig.userURL}/getStat`);
            const stats = statsResponse.data || {};

            // 加载订阅信息
            const subscriptionInfo = await this.loadSubscriptionInfo();

            mainContent.innerHTML = `
                <!-- Hero用户卡片 - 精确复制AirBuddy主卡片 -->
                <div class="hero-user-card">
                    <div class="hero-header">
                        <div class="hero-avatar">
                            ${this.user?.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div class="hero-info">
                            <div class="hero-greeting">Halo, ${this.user?.email?.split('@')[0] || 'User'}</div>
                            <div class="hero-plan">${subscriptionInfo.plan_name || '测试1'}</div>
                            <div class="hero-meta">
                                <div class="meta-item">
                                    <span class="meta-label">到期时间</span>
                                    <span class="meta-value">${subscriptionInfo.expired_at || '2025.07.06'}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">剩余流量</span>
                                    <span class="meta-value">${subscriptionInfo.transfer_enable ? this.formatBytes(Math.max(0, subscriptionInfo.transfer_enable - subscriptionInfo.transfer_used)) : '24 天后重置'}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">套餐总流量</span>
                                    <span class="meta-value">${this.formatBytes(subscriptionInfo.transfer_enable || 11811160064)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="hero-balance">
                            <div class="balance-label">我的余额</div>
                            <div class="balance-amount">
                                <span class="balance-currency">¥</span>${(this.user?.balance / 100 || 0).toFixed(2)}
                            </div>
                            <button class="recharge-btn">充值</button>
                        </div>
                    </div>
                </div>

                <!-- 平台客户端下载 - 精确复制AirBuddy的4个卡片 -->
                <div class="platforms-grid">
                    <a href="#" class="platform-card windows">
                        <div class="platform-icon">🪟</div>
                        <div class="platform-title">Windows 客户端</div>
                    </a>
                    
                    <a href="#" class="platform-card ios">
                        <div class="platform-icon">📱</div>
                        <div class="platform-title">iOS 客户端</div>
                    </a>
                    
                    <a href="#" class="platform-card android">
                        <div class="platform-icon">🤖</div>
                        <div class="platform-title">Android 客户端</div>
                    </a>
                    
                    <a href="#" class="platform-card macos">
                        <div class="platform-icon">💻</div>
                        <div class="platform-title">macOS 客户端</div>
                    </a>
                </div>

                ${subscriptionInfo.subscribe_url ? `
                <!-- 订阅信息卡片 -->
                <div class="subscription-card">
                    <div class="subscription-header">
                        <div class="subscription-title">订阅链接</div>
                    </div>
                    
                    <div class="subscription-url-container">
                        <input type="text" class="subscription-url-input" value="${subscriptionInfo.subscribe_url}" readonly>
                        <button class="url-copy-btn copy-btn">复制</button>
                    </div>
                </div>
                ` : ''}

                <!-- 推广邀请区域 - 复制AirBuddy底部卡片风格 -->
                <div class="promotion-section">
                    <div class="promotion-content">
                        <div class="promotion-text">
                            <div class="promotion-title">邀请好友<br>赚取丰厚佣金</div>
                            <div class="promotion-subtitle">立即邀请好友注册，可获得丰厚佣金奖励</div>
                            <div class="promotion-stats">
                                <div class="promotion-stat">
                                    <div class="stat-number">10%</div>
                                    <div class="stat-label">佣金比例</div>
                                </div>
                                <div class="promotion-stat">
                                    <div class="stat-number">¥${(stats.commission_balance / 100 || 0).toFixed(2)}</div>
                                    <div class="stat-label">已获佣金</div>
                                </div>
                                <div class="promotion-stat">
                                    <div class="stat-number">${stats.pending_commission || 0}</div>
                                    <div class="stat-label">待结算</div>
                                </div>
                            </div>
                        </div>
                        <div class="promotion-action">
                            <a href="#invite" class="promotion-btn" data-page="invite">
                                开始邀请
                            </a>
                        </div>
                    </div>
                </div>

                ${subscriptionInfo.subscribe_url ? `
                <!-- 二维码分享 -->
                <div class="qr-code-container">
                    <div class="qr-code-wrapper">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(subscriptionInfo.subscribe_url)}" 
                             alt="订阅二维码" class="qr-code-image">
                    </div>
                    <div class="qr-code-caption">扫描二维码导入订阅 / Shadowrocket / Clash 客户端</div>
                </div>
                ` : ''}
            `;

        } catch (error) {
            console.error('加载仪表盘失败:', error);
            mainContent.innerHTML = `
                <div class="welcome-placeholder">
                    <div class="welcome-icon">😞</div>
                    <h2>加载失败</h2>
                    <p>无法加载仪表盘数据，请检查网络连接后刷新页面重试</p>
                </div>
            `;
        } finally {
            this.hideLoading();
        }
    }

    async renderPlans() {
        // 套餐页面渲染
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        mainContent.innerHTML = `
            <div class="welcome-placeholder">
                <div class="welcome-icon">💎</div>
                <h2>订阅套餐</h2>
                <p>正在开发中...</p>
            </div>
        `;
    }
}

// 应用启动
document.addEventListener('DOMContentLoaded', () => {
    window.modernBoardApp = new ModernBoardApp();
});