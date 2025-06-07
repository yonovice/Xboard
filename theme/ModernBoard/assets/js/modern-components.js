/**
 * ModernBoard Theme Components
 * UI组件的JavaScript功能
 */

class ModernComponents {
    constructor() {
        this.init();
    }

    init() {
        this.initModals();
        this.initDropdowns();
        this.initTabs();
        this.initToasts();
        this.initProgressBars();
        this.initCollapse();
        this.initCarousel();
        
        console.log('📦 ModernBoard组件已加载');
    }

    // ===== 模态框 =====
    initModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-modal-target');
                this.openModal(targetId);
            });
        });

        modalCloses.forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = closeBtn.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // 点击背景关闭模态框
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.active');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 聚焦到模态框内容
            const content = modal.querySelector('.modal-content');
            if (content) {
                content.focus();
            }
            
            // 触发打开事件
            modal.dispatchEvent(new CustomEvent('modal:open'));
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // 触发关闭事件
            modal.dispatchEvent(new CustomEvent('modal:close'));
        }
    }

    // ===== 下拉菜单 =====
    initDropdowns() {
        const dropdownTriggers = document.querySelectorAll('[data-dropdown-toggle]');
        
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetId = trigger.getAttribute('data-dropdown-toggle');
                this.toggleDropdown(targetId);
            });
        });

        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });
    }

    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            const isOpen = dropdown.classList.contains('active');
            
            // 关闭所有其他下拉菜单
            this.closeAllDropdowns();
            
            if (!isOpen) {
                dropdown.classList.add('active');
                
                // 位置调整
                this.positionDropdown(dropdown);
                
                // 触发打开事件
                dropdown.dispatchEvent(new CustomEvent('dropdown:open'));
            }
        }
    }

    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.dispatchEvent(new CustomEvent('dropdown:close'));
        });
    }

    positionDropdown(dropdown) {
        const rect = dropdown.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // 防止下拉菜单超出视口
        if (rect.right > viewport.width) {
            dropdown.style.left = 'auto';
            dropdown.style.right = '0';
        }

        if (rect.bottom > viewport.height) {
            dropdown.style.top = 'auto';
            dropdown.style.bottom = '100%';
        }
    }

    // ===== 标签页 =====
    initTabs() {
        const tabButtons = document.querySelectorAll('[data-tab-target]');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('data-tab-target');
                const tabGroup = button.closest('.tabs');
                
                if (tabGroup) {
                    this.switchTab(tabGroup, targetId);
                }
            });
        });
    }

    switchTab(tabGroup, targetId) {
        // 移除所有激活状态
        const tabButtons = tabGroup.querySelectorAll('[data-tab-target]');
        const tabPanes = tabGroup.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // 激活目标标签
        const targetButton = tabGroup.querySelector(`[data-tab-target="${targetId}"]`);
        const targetPane = tabGroup.querySelector(`#${targetId}`);
        
        if (targetButton && targetPane) {
            targetButton.classList.add('active');
            targetPane.classList.add('active');
            
            // 触发切换事件
            tabGroup.dispatchEvent(new CustomEvent('tab:switch', {
                detail: { targetId }
            }));
        }
    }

    // ===== 提示消息 =====
    initToasts() {
        // 自动关闭现有的提示消息
        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(toast => {
            this.autoCloseToast(toast);
        });
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close" aria-label="关闭">×</button>
            </div>
        `;

        // 添加到页面
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        toastContainer.appendChild(toast);

        // 显示动画
        setTimeout(() => toast.classList.add('show'), 100);

        // 绑定关闭事件
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.closeToast(toast);
        });

        // 自动关闭
        if (duration > 0) {
            setTimeout(() => this.closeToast(toast), duration);
        }

        return toast;
    }

    closeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    autoCloseToast(toast) {
        const duration = parseInt(toast.getAttribute('data-duration')) || 3000;
        setTimeout(() => this.closeToast(toast), duration);
    }

    // ===== 进度条 =====
    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value') || '0';
            this.animateProgressBar(bar, parseInt(value));
        });
    }

    animateProgressBar(bar, targetValue) {
        let currentValue = 0;
        const increment = targetValue / 100;
        
        const animate = () => {
            currentValue += increment;
            if (currentValue < targetValue) {
                bar.style.width = `${currentValue}%`;
                requestAnimationFrame(animate);
            } else {
                bar.style.width = `${targetValue}%`;
            }
        };
        
        animate();
    }

    setProgressValue(progressId, value) {
        const progress = document.getElementById(progressId);
        if (progress) {
            const bar = progress.querySelector('.progress-bar');
            if (bar) {
                this.animateProgressBar(bar, value);
            }
        }
    }

    // ===== 折叠面板 =====
    initCollapse() {
        const collapseTriggers = document.querySelectorAll('[data-collapse-toggle]');
        
        collapseTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-collapse-toggle');
                this.toggleCollapse(targetId);
            });
        });
    }

    toggleCollapse(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const isOpen = target.classList.contains('active');
            
            if (isOpen) {
                this.closeCollapse(target);
            } else {
                this.openCollapse(target);
            }
        }
    }

    openCollapse(element) {
        element.classList.add('active');
        element.style.height = element.scrollHeight + 'px';
        
        // 动画完成后移除固定高度
        setTimeout(() => {
            element.style.height = 'auto';
        }, 300);
        
        element.dispatchEvent(new CustomEvent('collapse:open'));
    }

    closeCollapse(element) {
        element.style.height = element.scrollHeight + 'px';
        
        requestAnimationFrame(() => {
            element.style.height = '0';
            element.classList.remove('active');
        });
        
        element.dispatchEvent(new CustomEvent('collapse:close'));
    }

    // ===== 轮播图 =====
    initCarousel() {
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            this.setupCarousel(carousel);
        });
    }

    setupCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // 上一张
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
                this.updateCarousel(carousel, currentIndex);
            });
        }
        
        // 下一张
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
                this.updateCarousel(carousel, currentIndex);
            });
        }
        
        // 指示器
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                this.updateCarousel(carousel, currentIndex);
            });
        });
        
        // 自动播放
        const autoplay = carousel.getAttribute('data-autoplay');
        if (autoplay) {
            const interval = parseInt(autoplay) || 3000;
            setInterval(() => {
                currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
                this.updateCarousel(carousel, currentIndex);
            }, interval);
        }
    }

    updateCarousel(carousel, index) {
        const track = carousel.querySelector('.carousel-track');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        // 更新轨道位置
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;
        }
        
        // 更新指示器
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // 触发切换事件
        carousel.dispatchEvent(new CustomEvent('carousel:change', {
            detail: { index }
        }));
    }

    // ===== 公共方法 =====
    
    // 显示加载状态
    showLoading(element, text = '加载中...') {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">${text}</div>
            </div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(loader);
        
        return loader;
    }
    
    // 隐藏加载状态
    hideLoading(element) {
        const loader = element.querySelector('.loading-overlay');
        if (loader) {
            loader.remove();
        }
    }
    
    // 确认对话框
    confirm(message, callback) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>确认</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-ghost confirm-cancel">取消</button>
                    <button class="btn btn-primary confirm-ok">确认</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        const okBtn = modal.querySelector('.confirm-ok');
        const cancelBtn = modal.querySelector('.confirm-cancel');
        
        const cleanup = () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        };
        
        okBtn.addEventListener('click', () => {
            cleanup();
            if (callback) callback(true);
        });
        
        cancelBtn.addEventListener('click', () => {
            cleanup();
            if (callback) callback(false);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cleanup();
                if (callback) callback(false);
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.modernComponents = new ModernComponents();
});

// 添加CSS样式
const componentStyles = `
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    pointer-events: none;
}

.toast {
    background: var(--card-bg);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    margin-bottom: 10px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    pointer-events: auto;
    max-width: 300px;
}

.toast.show {
    transform: translateX(0);
}

.toast-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
}

.toast-message {
    color: var(--text-primary);
    font-size: 14px;
}

.toast-close {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 0;
    margin-left: 12px;
}

.toast-success { border-left: 4px solid var(--success-500); }
.toast-warning { border-left: 4px solid var(--warning-500); }
.toast-error { border-left: 4px solid var(--error-500); }
.toast-info { border-left: 4px solid var(--primary-500); }

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

[data-theme="dark"] .loading-overlay {
    background: rgba(0, 0, 0, 0.8);
}

.loading-content {
    text-align: center;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-primary);
    border-top-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 10px;
}

.loading-text {
    color: var(--text-secondary);
    font-size: 14px;
}

.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--card-bg);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 200px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    z-index: 1000;
}

.dropdown.active .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.dropdown-item {
    display: block;
    padding: 8px 16px;
    color: var(--text-secondary);
    text-decoration: none;
    border-bottom: 1px solid var(--border-primary);
    transition: background-color 0.15s ease;
}

.dropdown-item:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
    text-decoration: none;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.collapse {
    overflow: hidden;
    height: 0;
    transition: height 0.3s ease;
}

.collapse.active {
    height: auto;
}

.carousel {
    position: relative;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    transition: transform 0.3s ease;
}

.carousel-slide {
    flex: 0 0 100%;
}

.carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
}

.carousel-prev { left: 10px; }
.carousel-next { right: 10px; }

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
}

.carousel-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--border-secondary);
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.carousel-indicator.active {
    background: var(--accent-primary);
}
`;

// 插入样式
const styleSheet = document.createElement('style');
styleSheet.textContent = componentStyles;
document.head.appendChild(styleSheet); 