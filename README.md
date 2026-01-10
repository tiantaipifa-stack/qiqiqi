# Fuwari - Revised Template

一个基于 Astro 构建的现代化个人博客主题，专注于技术分享与实践。

## ✨ 特性

- 🚀 基于 Astro 5.0+ 构建，性能卓越
- 📱 完全响应式设计，支持移动端
- 🌙 支持深色/浅色主题切换
- 📝 支持 Markdown 和 MDX 格式
- 🔍 内置搜索功能
- 📊 文章阅读时间统计
- 🏷️ 标签和分类系统
- 📈 SEO 优化
- 🎨 可自定义配置
- 💬 评论系统支持
- 📡 RSS 订阅支持

## 🛠️ 技术栈

- **框架**: Astro 5.7
- **样式**: Tailwind CSS + Stylus
- **交互**: Svelte 5 + React 19
- **构建工具**: Vite
- **包管理**: pnpm 9
- **代码规范**: Biome

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置博客（首次使用）

```bash
pnpm quickstart
```
### 3. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:4321

### 4. 构建生产版本

```bash
pnpm build
```

### 5. 预览构建结果

```bash
pnpm preview
```

## 📝 使用指南

### 创建新文章

```bash
pnpm new-post <文章标题>
```

### 清理未使用的图片

清理 `src/content/assets` 目录下未被引用的图片：

```bash
pnpm clean
```

### 规范化图片文件名

移除文件名中的特殊字符，提高多平台兼容性：

```bash
pnpm del-space
```

### 代码格式化

```bash
pnpm format
```

### 代码检查

```bash
pnpm lint
```

## 📁 项目结构

```
├── .astro/                  # Astro 构建缓存
├── .github/                 # GitHub Actions
├── .vscode/                 # VSCode 设置
├── public/                  # 静态资源
│   ├── images/             # 示例图片
│   └── js/                 # 脚本
├── scripts/                # 工具脚本
│   ├── setup.mjs           # 配置脚本（首次使用）
│   ├── new-post.js         # 创建文章
│   ├── clean-unused-images.js
│   └── del-space.js
├── src/
│   ├── components/         # Astro/Svelte/React 组件
│   ├── config.ts           # 配置文件
│   ├── content/           # 内容
│   │   ├── posts/         # 博客文章（空）
│   │   └── assets/        # 资源文件
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面
│   ├── styles/            # 样式文件
│   ├── types/             # 类型定义
│   └── utils/             # 工具函数
├── astro.config.mjs        # Astro 配置
├── tailwind.config.cjs     # Tailwind 配置
├── wrangler.jsonc          # Cloudflare Pages 配置
└── package.json
```

## 🎨 自定义

### 手动配置

如果不想使用交互式脚本，可直接编辑以下文件：

| 配置项 | 文件位置 |
|--------|---------|
| 站点信息 | `src/config.ts` - `siteConfig` |
| 个人信息 | `src/config.ts` - `profileConfig` |
| 社交链接 | `src/config.ts` - `profileConfig.links` |
| 博客域名 | `astro.config.mjs` - `site` |
| Umami 统计 | `src/config.ts` - `umamiConfig` |
| Wrangler 项目名 | `wrangler.jsonc` - `name` |

### 主题颜色

在 `src/config.ts` 中修改：

```typescript
themeColor: {
  hue: 250,        // 主色调 (0-360)
  fixed: false,    // 是否固定颜色
}
```

## 📦 部署

### Cloudflare Pages（推荐）

1. 推送代码到 GitHub 仓库
2. 在 Cloudflare Pages 中连接仓库
3. 构建命令：`pnpm build`
4. 输出目录：`dist`
5. 环境变量：`NODE_VERSION = 20`

### Vercel

```bash
pnpm build
vercel deploy --prod
```

## 🔧 脚本说明

| 命令 | 说明 |
|------|------|
| `pnpm setup` | 交互式配置（首次使用） |
| `pnpm new-post <title>` | 创建新文章 |
| `pnpm clean` | 清理未使用图片 |
| `pnpm del-space` | 规范化文件名 |
| `pnpm format` | 代码格式化 |
| `pnpm lint` | 代码检查 |

## 📄 许可证

[MIT License](LICENSE)

## 🙏 致谢致谢
- 特别感谢 [saicaca/fuwari](https://github.com/saicaca/fuwari) 主题开发者与上游仓库 [afoim/fuwari](https://github.com/afoim/fuwari) 维护者的开源贡献