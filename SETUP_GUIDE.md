# 自定义内容配置指南

本文档说明如何使用脚本快速配置所有需要自定义的内容。

## 使用方法

### 方法 1：使用交互式脚本（推荐）

运行以下命令：

```bash
node scripts/setup.mjs
```

脚本会按以下分类逐步询问你的信息：

#### 1. 基本信息
- 博客标题
- 博客副标题
- 博客描述（用于 SEO）
- 关键词（逗号分隔，可选）

#### 2. 个人信息
- 作者名称
- 个人签名
- 头像 URL

#### 3. 部署配置
- 博客域名
- 项目名称（用于 Cloudflare Pages）

#### 4. 社交链接
- GitHub 用户名
- GitHub 编辑链接
- Bilibili 链接（可选）

#### 5. 统计配置
- 是否启用 Umami 统计
- Umami 服务器地址（如启用）
- Umami Share ID（如启用）
- 时区（如启用）

#### 6. 外观设置
- 是否启用横幅
- 是否启用背景图
- 主题色调（0-360，默认 361）

#### 7. 清理示例
- 是否清空示例文章

#### 8. 图片放置指南
脚本会在配置完成后显示图片放置说明：
- `public/images/` 目录（推荐）
- `src/content/assets/images/` 目录

### 方法 2：手动编辑

如果你更喜欢手动编辑，可以参考以下位置修改：

| 配置项 | 文件位置 | 说明 |
|--------|---------|------|
| 站点基本信息 | `src/config.ts` - `siteConfig` | 标题、副标题、描述 |
| 个人信息 | `src/config.ts` - `profileConfig` | 名称、签名、头像 |
| 社交链接 | `src/config.ts` - `profileConfig.links` | GitHub、Bilibili 等 |
| 博客域名 | `astro.config.mjs` - `site` | 主博客地址 |
| Umami 统计 | `src/config.ts` - `umamiConfig` | 访问量统计配置 |
| Wrangler 项目 | `wrangler.jsonc` - `name` | Cloudflare Pages 项目名 |
| GitHub 编辑 | `src/config.ts` - `gitHubEditConfig.baseUrl` | 文章编辑链接 |

## 需要自定义的内容清单

- [ ] 站点标题和副标题
- [ ] 站点描述
- [ ] 作者名称和签名
- [ ] 头像 URL
- [ ] 博客域名
- [ ] 项目名称（Cloudflare Pages）
- [ ] GitHub 用户名和编辑链接
- [ ] 社交媒体链接（Bilibili 等）
- [ ] Umami 统计配置（如启用）
- [ ] 横幅和背景图开关
- [ ] 主题色调
- [ ] 清空示例文章（可选）

## 示例

### 交互式脚本执行示例

```
> node scripts/setup.mjs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Fuwari 博客自定义配置
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【基本信息】
博客标题: My Tech Blog
博客副标题: 技术分享与实践
博客描述 (SEO): 一个分享技术与生活的博客
关键词 (逗号分隔，可选): tech, blog, coding

【个人信息】
作者名称: John Doe
个人签名: Keep learning, keep growing.
头像 URL: https://example.com/avatar.png

【部署配置】
博客域名 (https://...): https://myblog.com
项目名称: my-tech-blog

【社交链接】
GitHub 用户名: johndoe
GitHub 编辑链接: https://github.com/johndoe/myblog/edit/main/src/content/posts
Bilibili 链接 (可选): https://space.bilibili.com/123456

【统计配置】
启用 Umami? (y/n): y
Umami 地址: https://umami.example.com
Umami Share ID: abc123
时区 (如 Asia/Shanghai): Asia/Shanghai

【外观设置】
启用横幅? (y/n): y
启用背景图? (y/n): y
主题色调 (0-360，默认 361): 200

【清理示例】
清空示例文章? (y/n): y

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   📷 图片放置指南
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

有两种方式放置图片:

1️⃣  放置在 public 目录 (推荐)
   路径: public/images/xxx.png
   使用: /images/xxx.png

2️⃣  放置在 src/content/assets 目录
   路径: src/content/assets/images/xxx.webp
   使用: /assets/images/xxx.webp

📝 文章中引用示例:
   ![图片描述](/images/xxx.png)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

确认保存配置? (y/n)
> y

【应用配置...】

✅ 完成! 成功: 12, 跳过: 3

【清理示例文章...】
  ✅ 已删除 2 篇文章

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   配置摘要
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  标题: My Tech Blog
  副标题: 技术分享与实践
  作者: John Doe
  域名: https://myblog.com
  GitHub: johndoe
  Umami: ✓ 已启用

✨ 配置完成!
```

## 常见问题

### Q: 头像 URL 可以使用本地文件吗？
A: 可以。可以使用 `/images/avatar.png` 这样的相对于 `/public` 目录的路径。

### Q: 我没有 Umami 统计需求，可以跳过吗？
A: 可以。在询问"启用 Umami?"时回答 `n` 即可。

### Q: 脚本会覆盖所有配置吗？
A: 脚本只会替换指定的值，不会删除或更改其他配置。但建议先备份重要文件。

### Q: 运行后需要重新启动开发服务器吗？
A: 是的。请重新运行 `pnpm dev` 以应用更改。

### Q: 如何清空示例文章？
A: 在脚本询问"清空示例文章?"时回答 `y`，脚本会自动删除 `src/content/posts` 目录下的所有文件。

### Q: 图片应该放在哪里？
A: 脚本会在配置完成后显示图片放置指南。推荐放在 `public/images/` 目录，使用 `/images/xxx.png` 引用。

### Q: GitHub 编辑链接是什么？
A: 这是文章页面底部的"在 GitHub 上编辑此页"链接。格式为 `https://github.com/用户名/仓库名/edit/main/src/content/posts`

## 支持的配置字段

### src/config.ts 修改的字段

| 字段 | 位置 | 说明 |
|------|------|------|
| `title` | siteConfig | 博客标题 |
| `subtitle` | siteConfig | 博客副标题 |
| `description` | siteConfig | 博客描述 |
| `name` | profileConfig | 作者名称 |
| `bio` | profileConfig | 个人签名 |
| `avatar` | profileConfig | 头像 URL |
| `links[].url` | profileConfig | 社交链接 (GitHub, Bilibili) |
| `baseUrl` | gitHubEditConfig | GitHub 编辑链接 |
| `hue` | themeColor | 主题色调 (0-360) |
| `timezone` | umamiConfig | Umami 时区 |

### astro.config.mjs 修改的字段

| 字段 | 说明 |
|------|------|
| `site` | 博客主域名 |

### wrangler.jsonc 修改的字段

| 字段 | 说明 |
|------|------|
| `name` | Cloudflare Pages 项目名称 |

### package.json 修改的字段

| 字段 | 说明 |
|------|------|
| `name` | 项目名称（与 wrangler 保持一致） |

## 更多帮助

如有问题，请参考：
- Fuwari 主题文档：https://github.com/saicaca/fuwari
- Astro 文档：https://docs.astro.build
- Cloudflare Pages 文档：https://developers.cloudflare.com/pages
