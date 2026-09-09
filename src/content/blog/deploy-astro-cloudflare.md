---
title: 用 Astro 搭建博客并部署到 Cloudflare Pages
description: 从零到线上：一套零服务器、零运维、push 即自动发布的博客方案。
pubDate: 2026-09-08
tags:
  - Astro
  - Cloudflare Pages
  - 部署
---

静态站点生成器加 Cloudflare Pages，是个人博客最省心的组合之一：内容用 Markdown 写，构建在云端完成，仓库一推送就自动发布，几乎没有运维成本。

## 整体流程

1. 本地用 Astro 写好文章与主题
2. 把代码推到 GitHub 仓库
3. 在 Cloudflare Pages 里关联该仓库
4. 之后每次 `git push`，Pages 自动构建并发布

## 部署步骤

先在本地把项目准备好并推送到 GitHub：

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后打开 Cloudflare 控制台：

1. 进入 **Workers & Pages**，点击 **Create**，选择 **Pages**
2. 选择 **Connect to Git**，授权并选中刚推送的仓库
3. 构建配置使用 Astro 的默认预设即可：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
4. 点击 **Save and Deploy**

首次部署完成后，会得到一个 `https://<项目名>.pages.dev` 的地址。在项目根目录的 `astro.config.mjs` 里把 `site` 改成这个正式地址，再推一次代码，让 SEO 与 RSS 使用正确的域名。

## 绑定自定义域名（可选）

Pages 项目页面进入 **Custom domains**，可以添加自己的域名：

- 如果域名托管在 Cloudflare，选择后会提示自动添加 DNS 记录，一键生效
- 若域名在别处，按提示把域名解析改为 Cloudflare 托管即可

之后每次写完文章，只要：

```bash
git add .
git commit -m "post: 新文章"
git push
```

等一两分钟，线上就更新了。这就是整套方案的日常使用方式。
