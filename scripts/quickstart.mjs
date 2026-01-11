#!/usr/bin/env node

/**
 * Fuwari 博客自定义配置脚本
 * 使用: node scripts/quickstart.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const BASE_PATH = path.dirname(__filename);

// 配置文件路径
const CONFIG_FILE = path.join(BASE_PATH, 'src/config.ts');

// 创建交互式接口
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// 读取现有配置
function readConfig() {
	const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
	return content;
}

// 查找配置值
function findValue(content, key, defaultVal = '') {
	const patterns = {
		title: /title:\s*"([^"]*)"/,
		subtitle: /subtitle:\s*"([^"]*)"/,
		description: /description:\s*:\s*"([^"]*)"/,
		authorName: /name:\s*"([^"]*)",\s*\/\/ 博主昵称/,
		authorBio: /bio:\s*"([^"]*)"/,
		avatar: /avatar:\s*"([^"]*)"/,
		friendsEnable: /enable:\s*(true|false),(\s*\/\/ 是否启用友链功能)/,
		umamiEnable: /enable:\s*(true|false),(\s*\/\/ 是否启用统计分析)/,
		umamiShareUrl: /shareUrl:\s*"([^"]*)",(\s*\/\/ Umami 分享页面)/,
	};
	
	const match = content.match(patterns[key]);
	return match ? match[1] : defaultVal;
}

// 获取用户输入
async function getUserInput() {
	console.clear();
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log('   Fuwari 博客自定义配置');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

	const config = readConfig();
	const input = {};

	// 基本信息
	console.log('【基本信息】');
	input.title = await question(`博客标题 [${findValue(config, 'title')}]: `) || findValue(config, 'title');
	input.subtitle = await question(`博客副标题 [${findValue(config, 'subtitle')}]: `) || findValue(config, 'subtitle');
	input.description = await question(`博客描述 [${findValue(config, 'description')}]: `) || findValue(config, 'description');

	// 个人信息
	console.log('\n【个人信息】');
	input.authorName = await question(`作者名称 [${findValue(config, 'authorName')}]: `) || findValue(config, 'authorName');
	input.authorBio = await question(`个人签名 [${findValue(config, 'authorBio')}]: `) || findValue(config, 'authorBio');
	input.avatarUrl = await question(`头像 URL [${findValue(config, 'avatar')}]: `) || findValue(config, 'avatar');

	// 友链配置
	console.log('\n【友链配置】');
	const friendsEnable = await question('启用友链? (y/n): ');
	input.friendsEnable = friendsEnable.toLowerCase() === 'y';

	// 统计配置
	console.log('\n【统计配置】');
	const umamiEnable = await question('启用 Umami 统计? (y/n): ');
	if (umamiEnable.toLowerCase() === 'y') {
		input.umamiEnable = true;
		input.umamiShareUrl = await question(`分享页面 URL [${findValue(config, 'umamiShareUrl')}]: `) || findValue(config, 'umamiShareUrl');
	} else {
		input.umamiEnable = false;
	}

	// 清理示例
	console.log('\n【清理示例】');
	input.clearPosts = await question('清空示例文章? (y/n): ');

	return input;
}

// 更新配置
function updateConfig(input) {
	let content = fs.readFileSync(CONFIG_FILE, 'utf-8');

	// 更新标题
	content = content.replace(
		/title:\s*"[^"]*"/,
		`title: "${input.title}"`
	);

	// 更新副标题
	content = content.replace(
		/subtitle:\s*"[^"]*"/,
		`subtitle: "${input.subtitle}"`
	);

	// 更新描述
	content = content.replace(
		/description:\s*:\s*"[^"]*"/,
		`description: "${input.description}"`
	);

	// 更新作者名称
	content = content.replace(
		/name:\s*"([^"]*)",\s*\/\/ 博主昵称/,
		`name: "${input.authorName}", // 博主昵称`
	);

	// 更新个人签名
	content = content.replace(
		/bio:\s*"[^"]*"/,
		`bio: "${input.authorBio}"`
	);

	// 更新头像
	content = content.replace(
		/avatar:\s*"[^"]*"/,
		`avatar: "${input.avatarUrl}"`
	);

	// 更新友链启用状态
	content = content.replace(
		/enable:\s*(true|false),(\s*\/\/ 是否启用友链功能)/,
		`enable: ${input.friendsEnable},$2`
	);

	// 更新统计启用状态
	content = content.replace(
		/enable:\s*(true|false),(\s*\/\/ 是否启用统计分析)/,
		`enable: ${input.umamiEnable},$2`
	);

	// 更新 Umami 分享页面
	if (input.umamiEnable) {
		content = content.replace(
			/shareUrl:\s*"[^"]*",(\s*\/\/ Umami 分享页面)/,
			`shareUrl: "${input.umamiShareUrl}",$1`
		);
	}

	fs.writeFileSync(CONFIG_FILE, content, 'utf-8');
}

// 清空示例文章
function clearPosts() {
	const postsPath = path.join(BASE_PATH, 'src/content/posts');
	if (fs.existsSync(postsPath)) {
		const files = fs.readdirSync(postsPath);
		let deleted = 0;
		for (const file of files) {
			const filePath = path.join(postsPath, file);
			if (fs.statSync(filePath).isFile()) {
				fs.unlinkSync(filePath);
				deleted++;
			}
		}
		return deleted;
	}
	return 0;
}

// 主函数
async function main() {
	try {
		const input = await getUserInput();

		console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
		console.log('   配置摘要')
		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
		console.log(`  标题: ${input.title}`);
		console.log(`  副标题: ${input.subtitle}`);
		console.log(`  作者: ${input.authorName}`);
		console.log(`  友链: ${input.friendsEnable ? '启用' : '关闭'}`);
		console.log(`  Umami: ${input.umamiEnable ? '启用' : '关闭'}`);
		console.log('\n确认保存? (y/n)');

		const confirm = await question('> ');
		if (confirm.toLowerCase() !== 'y') {
			console.log('❌ 已取消');
			rl.close();
			return;
		}

		// 应用配置
		updateConfig(input);
		console.log('✅ 配置已更新');

		// 清空示例文章
		if (input.clearPosts?.toLowerCase() === 'y') {
			const deleted = clearPosts();
			console.log(`✅ 已删除 ${deleted} 篇文章`);
		}

		console.log('\n✨ 完成! 运行 pnpm dev 启动开发服务器');

	} catch (error) {
		console.error(`\n❌ 错误: ${error.message}`);
	} finally {
		rl.close();
	}
}

main();