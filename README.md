# 我的博客（Astro）

基于 **Astro 静态站点生成器** 的个人博客，内容用 Markdown 编写，部署到 **Cloudflare Pages**：Git 仓库一推送即自动构建发布，零服务器、零运维。

## 功能

- Markdown 写文章（frontmatter 声明标题 / 摘要 / 日期 / 标签）
- 首页文章列表、文章详情页（含阅读时长、上一篇/下一篇导航）
- 标签归档（标签云 + 按标签筛选）
- 自动 RSS（`/rss.xml`）、SEO 元信息、404 页面
- 无 JS 依赖，构建产物为纯静态 HTML/CSS，性能与 SEO 友好
- 浅色主题、响应式布局，中文字体栈适配

## 目录结构

```text
blog/
├─ astro.config.mjs          # 站点配置（site 地址等）
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ consts.ts              # 站点标题 / 描述 / 作者（改这里全局生效）
   ├─ content.config.ts      # 文章字段的类型与校验
   ├─ content/blog/          # ★ 你的文章都放这里（Markdown）
   ├─ layouts/               # 页面骨架（head / SEO）
   ├─ components/            # Header / Footer / 文章卡片
   ├─ lib/                   # 日期格式化、阅读时长工具
   ├─ styles/global.css      # 全站样式
   └─ pages/                 # 首页 / 文章页 / 标签页 / 关于 / RSS / 404
```

## 开始使用

前置：安装 Node.js 22+（或任意 Node 18+）。

```bash
npm install
npm run dev        # 本地预览 → http://localhost:4321
```

发布一篇新文章：

1. 在 `src/content/blog/` 新建 `my-post.md`
2. 按下方模板写好 frontmatter 与正文
3. 保存后首页 / 标签 / RSS 自动更新

```markdown
---
title: 文章标题
description: 一句话摘要（用于首页卡片与搜索）
pubDate: 2026-09-09
tags:
  - 分类一
  - 分类二
draft: false        # true 则不发布
---
正文写这里，支持全部 Markdown 语法。
```

## 个性化配置

| 想改什么 | 改哪里 |
| --- | --- |
| 站点名称 / 描述 / 作者 | `src/consts.ts` |
| 网站正式地址 | `astro.config.mjs` 的 `site` |
| 导航栏链接 | `src/components/Header.astro` |
| 关于页内容 | `src/pages/about.astro` |
| 颜色 / 字体 | `src/styles/global.css` 顶部的 CSS 变量 |

## 部署到 Cloudflare Pages

### 1. 推送到 GitHub

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 2. 在 Cloudflare 关联仓库

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages**
2. 选择 **Connect to Git**，授权 GitHub 并选中仓库
3. 构建配置（Astro 预设，一般会自动填好）：
   - **构建命令**：`npm run build`
   - **输出目录**：`dist`
4. 点击 **Save and Deploy**，等约一分钟即上线，得到 `https://<项目名>.pages.dev`

### 3. 修正正式域名（重要）

把 `astro.config.mjs` 里的 `site` 改成你的 pages.dev 地址（或自定义域名），再次提交推送：

```bash
git add .
git commit -m "chore: set canonical site url"
git push
```

### 4. 以后每次发文

写完文章后只需要：

```bash
git add .
git commit -m "post: 新文章标题"
git push
```

Cloudflare Pages 会自动构建并发布，无需任何手动操作。

## 绑定自定义域名（可选）

Pages 项目页 → **Custom domains** → **Add custom domain**：

- 域名若已托管在 Cloudflare，选择后会自动添加 DNS 记录，约几秒生效
- 域名在别处则需先按提示将其接入 Cloudflare DNS

## 常见问题

**本地修改后没看到新文章？**
确认 Markdown 文件位于 `src/content/blog/`，frontmatter 字段完整，且 `draft` 不是 `true`。

**构建报错？**
先 `npm install` 确保依赖完整，再执行 `npm run build` 查看具体错误信息。
