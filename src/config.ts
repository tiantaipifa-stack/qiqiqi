import type {
	AnalyticsConfig,
	ExpressiveCodeConfig,
	FriendsConfig,
	GitHubEditConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

/**
 * 友链配置
 * 友链页显示的好友列表（必须在 navBarConfig 之前定义）
 */
export const friendsConfig: FriendsConfig = {
	enable: true, // 是否启用友链功能
	friends: [
		{
			name: "临明小狐狸の小窝", // 友链名称
			avatar: "https://lmxhl.top/wp-content/uploads/2025/08/cropped-g.jpg", // 头像
			description: "Ciallo～(∠・ω< )⌒★", // 简介
			url: "https://lmxhl.top" // 网站链接
		}
	]
};

/**
 * 统计分析配置
 * 支持 Umami、百度统计、Clarity、Google Analytics、Cloudflare（必须在 navBarConfig 之前定义）
 */
export const analyticsConfig: AnalyticsConfig = {
	enable: false, // 是否启用统计分析
	umami: {
		scriptUrl: "https://umami.2x.nz/script.js", // Umami 脚本 URL
		websiteId: "5d710dbd-3a2e-43e3-a553-97b415090c63", // Umami 网站 ID
		shareUrl: "https://cloud.umami.is/share/bQ5DAx3NBElpT3mW", // Umami 统计分享页面
	},
	baidu: {
		hmJsUrl: "https://hm.baidu.com/hm.js", // 百度统计脚本 URL
		hmKey: "b219eaad631b87d273cfe72148b2138b", // 百度统计 key
	},
	clarity: {
		scriptUrl: "https://www.clarity.ms/tag/", // Clarity 脚本 URL
		projectId: "t8f0gmcwtx", // Clarity 项目 ID
	},
	google: {
		scriptUrl: "https://www.googletagmanager.com/gtag/js", // Google Analytics 脚本 URL
		measurementId: "G-9Z4LT4H8KH", // Google Analytics 测量 ID
	},
	cloudflare: {
		beaconUrl: "https://static.cloudflareinsights.com/beacon.min.js", // Cloudflare 脚本 URL
		token: "15fe148e91b34f10a15652e1a74ab26c", // Cloudflare token
	},
};

/**
 * 站点配置
 * 包含标题、副标题、主题、背景等基础设置
 */
export const siteConfig: SiteConfig = {
	title: " 夜致星月的博客", // 网站标题
	subtitle: "一个普通的博客", // 网站副标题（显示在页面标题中）
	description: "夜致星月的博客", // SEO 描述

	keywords: [], // SEO 关键词（逗号分隔）
	lang: "zh_CN", // 网站语言：en, zh_CN, zh_TW, ja, ko, es, th
	themeColor: {
		hue: 361, // 主题色色相值（0-360），如红色: 0, 青色: 200, 粉色: 345
		fixed: false, // 隐藏主题色选择器
		forceDarkMode: false, // 强制深色模式并隐藏主题切换器
	},
	// 域名安全警告配置
	domainWarning: {
		enable: false, // 是否启用域名安全警告
		officialSites: [ // 官方域名列表，用于检测非官方域名访问
			""
		],
	},
	// 横幅配置
	banner: {
		enable: false, // 是否启用横幅图片
		src: "/images/Banner.png", // 横幅图片路径（相对于 /src 或 /public 目录）

		position: "center", // 图片位置：top, center, bottom
		credit: {
			enable: false, // 显示横幅图片署名
			text: "", // 署名文字

			url: "", // 原始作品或艺术家页面链接（可选）
		},
	},
	// 背景图片配置
	background: {
		enable: true, // 是否启用背景图片
		src: "", // 背景图片 URL（支持 HTTPS）
		position: "center", // 背景位置：top, center, bottom
		size: "cover", // 背景尺寸：cover, contain, auto
		repeat: "no-repeat", // 背景重复：no-repeat, repeat, repeat-x, repeat-y
		attachment: "fixed", // 背景附着方式：fixed, scroll, local
		opacity: 1, // 背景透明度（0-1）
		randomBackgroundScript: "https://pic.acofork.com/random.js", // 随机背景图脚本 URL
	},
	// 目录配置
	toc: {
		enable: true, // 是否在文章右侧显示目录
		depth: 2, // 目录显示的最大标题深度（1-3）
	},
	// 网站图标配置
	favicon: [
		// 留空数组使用默认图标
		{
			src: "/favicon/icon.png", // 图标路径（相对于 /public 目录）
			//   theme: 'light',              //（可选）亮色/暗色模式专用图标
			//   sizes: '32x32',              //（可选）不同尺寸的图标
		},
	],
};

/**
 * 导航栏配置
 * 动态生成导航链接，支持条件显示友链和统计
 */
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home, // 首页
		LinkPreset.Archive, // 归档
		// 友链：根据 friendsConfig.enable 动态显示
		...(friendsConfig.enable
			? [{ name: "友链", url: "/friends/" }]
			: []),
		// 统计：根据 analyticsConfig.enable 动态显示
		...(analyticsConfig.enable
			? [{
				name: "统计",
				url: analyticsConfig.umami?.shareUrl || "https://cloud.umami.is/share/bQ5DAx3NBElpT3mW",
				external: true,
			}]
			: []),
		{ name: "监控", url: "https://uptime.sikon.top", external: false }, // 站点监控
	],
};

/**
 * 个人资料配置
 * 博主头像、昵称、简介和社交链接
 */
export const profileConfig: ProfileConfig = {
	avatar: "/images/avatar.png", // 头像路径
	name: "夜致星月", // 博主昵称
	bio: "夜致星月是小猫娘", // 个人简介
	links: [], // 社交链接（可选，在 NavMenuPanel 中显示）
};

/**
 * 版权协议配置
 * 文章底部的许可协议信息
 */
export const licenseConfig: LicenseConfig = {
	enable: true, // 是否显示版权协议
	name: "CC BY-NC-SA 4.0", // 协议名称
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 协议链接
};

/**
 * 图片加载失败 fallback 配置
 * 当图片加载失败时使用备用图床
 */
export const imageFallbackConfig: ImageFallbackConfig = {
	enable: false, // 是否启用图片 fallback
	originalDomain: "https://eopfapi.acofork.com/pic?img=ua", // 原图域名（用于判断）
	fallbackDomain: "https://eopfapi.acofork.com/pic?img=ua", // 备用图床域名
};

/**
 * 代码高亮配置
 * Expressive Code 主题设置
 */
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark", // 代码主题
};

/**
 * GitHub 编辑配置
 * 文章底部的"在 GitHub 上编辑此页"链接
 */
export const gitHubEditConfig: GitHubEditConfig = {
	enable: false, // 是否显示编辑链接
	baseUrl: "", // GitHub 仓库 URL
};

/**
 * Umami 配置
 * 用于显示访问量和访客数（与 analyticsConfig 不同，这个是获取统计数据）
 */
export const umamiConfig: UmamiConfig = {
	enable: false, // 是否启用
	baseUrl: "", // Umami API 地址
	shareId: "", // 分享 ID
	timezone: "Asia/Shanghai", // 时区
};
