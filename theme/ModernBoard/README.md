# ModernBoard Pro 主题

一个现代化、优雅的管理面板主题，专为 Xboard 项目设计。

## ✨ 特性

- 🎨 **现代化设计** - 采用最新的设计趋势，简洁优雅
- 🌙 **深色/浅色模式** - 支持自动切换和手动切换
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **高性能** - 优化的CSS和JavaScript，快速加载
- 🎛️ **高度可定制** - 丰富的配置选项
- 🔧 **易于集成** - 无缝集成到现有项目

## 🎨 设计特点

### 配色方案
- **主色调**: Indigo (#6366f1) - 现代、专业
- **辅助色**: Purple (#8b5cf6) - 活力、创新
- **语义颜色**: 成功绿、警告橙、错误红

### 布局样式
- **现代风格** - 大圆角、柔和阴影
- **紧凑风格** - 节省空间的紧密布局
- **宽松风格** - 舒适的大间距布局

### 导航栏样式
- **毛玻璃效果** - 现代透明感
- **实色背景** - 经典稳重
- **完全透明** - 极简主义

## 🛠️ 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `primary_color` | 颜色 | `#6366f1` | 主题主色调 |
| `secondary_color` | 颜色 | `#8b5cf6` | 主题辅助色 |
| `theme_mode` | 选择 | `auto` | 主题模式（浅色/深色/自动） |
| `layout_style` | 选择 | `modern` | 布局风格 |
| `navbar_style` | 选择 | `blur` | 导航栏风格 |
| `card_shadow` | 选择 | `medium` | 卡片阴影强度 |
| `enable_animations` | 开关 | `true` | 是否启用动画效果 |
| `background_url` | 输入 | - | 自定义背景图片 |
| `custom_css` | 文本 | - | 自定义CSS样式 |
| `custom_js` | 文本 | - | 自定义JavaScript代码 |
| `custom_html` | 文本 | - | 自定义页脚HTML |

## 🚀 安装使用

1. 将 `ModernBoard` 文件夹上传到 `theme/` 目录
2. 在管理后台选择 `ModernBoard Pro` 主题
3. 根据需要调整主题配置
4. 保存并享受全新的管理体验

## 📁 文件结构

```
ModernBoard/
├── config.json              # 主题配置文件
├── dashboard.blade.php      # 主模板文件
├── README.md               # 说明文档
└── assets/                 # 资源文件目录
    ├── css/               # 样式文件
    │   ├── modern-core.css       # 核心样式
    │   ├── modern-components.css # 组件样式
    │   └── modern-themes.css     # 主题样式
    ├── js/                # JavaScript文件
    │   ├── modern-core.js        # 核心功能
    │   ├── modern-components.js  # UI组件
    │   └── modern-app.js         # 应用逻辑
    └── images/            # 图片资源
        ├── favicon.svg           # 图标文件
        └── favicon.ico           # 兼容图标
```

## 🎯 核心功能

### 主题管理
- 自动检测系统主题偏好
- 平滑的主题切换动画
- 持久化主题设置

### 响应式布局
- 移动端优化的侧边栏
- 自适应的网格布局
- 触摸友好的交互元素

### 动画效果
- 页面加载动画
- 滚动触发动画
- 悬停交互效果
- 支持无障碍访问（尊重用户的动画偏好）

### 交互组件
- 模态框
- 下拉菜单
- 标签页
- 提示消息
- 进度条
- 折叠面板
- 轮播图

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + Shift + D` | 切换深色/浅色模式 |
| `Ctrl/Cmd + B` | 切换侧边栏显示/隐藏 |

## 🔧 自定义开发

### CSS 变量

主题使用 CSS 自定义属性，便于自定义：

```css
:root {
  --primary-500: #6366f1;
  --secondary-500: #8b5cf6;
  --text-primary: #111827;
  --bg-primary: #ffffff;
  /* 更多变量... */
}
```

### JavaScript API

```javascript
// 获取主题实例
const theme = window.modernBoard;

// 切换主题
theme.toggleTheme();

// 显示通知
theme.showNotification('操作成功', 'success');

// 更新配置
theme.updateConfig({
  theme: { primary: '#ff6b6b' }
});
```

## 🌟 浏览器支持

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📝 更新日志

### v1.0.0 (2024-01-15)
- 🎉 首次发布
- ✨ 完整的主题系统
- 🎨 现代化UI设计
- 📱 响应式布局
- 🌙 深色模式支持
- ⚡ 性能优化

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个主题！

## 📄 许可证

MIT License

## 💡 技术栈

- **CSS**: 现代CSS特性、CSS Grid、Flexbox、CSS变量
- **JavaScript**: ES6+、模块化、异步处理
- **字体**: Inter、JetBrains Mono
- **图标**: Emoji + SVG
- **动画**: CSS动画、过渡效果
- **兼容性**: 现代浏览器、渐进增强

---

由 ❤️ 制作，致力于提供最佳的用户体验。 