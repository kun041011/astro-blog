---
title: 欢迎来到我的博客
description: 第一篇文章：介绍本站的定位，以及如何快速添加一篇新文章。
pubDate: 2026-09-09
tags:
  - 博客
  - 指南
---

欢迎来到本站。这是一篇示例文章，用来演示博客的基本用法：把文章写在 `src/content/blog/` 目录下，一行标题配几段正文，构建时就会自动生成页面。

## 如何写新文章

在 `src/content/blog/` 里新建一个 Markdown 文件（文件名就是网址后缀，建议用英文小写加连字符），然后在文件开头写一段 frontmatter：

```yaml
---
title: 文章的标题
description: 一段用于首页摘要与 SEO 的简介。
pubDate: 2026-09-09
tags:
  - 博客
  - 指南
draft: false
---
```

各字段的含义如下：

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `description` | 是 | 摘要，显示在卡片与搜索引擎结果中 |
| `pubDate` | 是 | 发布日期，格式 `年-月-日` |
| `tags` | 否 | 标签数组，用于归档 |
| `updatedDate` | 否 | 最近更新日期，可选 |
| `draft` | 否 | 设为 `true` 则不会发布 |

写完正文后保存，首页、标签页与 RSS 会自动更新，无需改任何其他代码。

## 本地开发命令

```bash
npm install    # 首次安装依赖
npm run dev    # 本地开发，默认 http://localhost:4321
npm run build  # 构建静态产物到 dist/
```

想把它部署到线上？见下一篇《用 Astro 搭建博客并部署到 Cloudflare Pages》。祝写作愉快。
