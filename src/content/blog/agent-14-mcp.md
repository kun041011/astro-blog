---
title: MCP：让 Agent 连接一切工具的开放协议
description: 第十四课：模型上下文协议是什么，为何它像"AI 界的 USB-C"，以及如何接一个 MCP 服务。
pubDate: 2026-07-05
tags:
  - Agent
  - MCP
  - 工程化
draft: false
---

七月份，我们把 Agent 推向生产。第一个话题是这两年最重要的一个工程协议：MCP（Model Context Protocol，模型上下文协议）。三月讲工具调用时，工具是"你自己代码里的函数"；MCP 解决的问题是：**当工具分散在各家系统里时，如何用一套统一标准把它们接进来**。

## 为什么需要 MCP

没有 MCP 之前，接入一个新工具（比如某个 SaaS 或内部系统）通常要写一套胶水代码：鉴权、定义 schema、封装 API、处理错误，各家各写各的。工具方每适配一个 Agent/客户端，也要重复劳动。MCP 改变了分工方式：

- **工具方只实现一次 MCP 服务**（暴露工具列表与调用接口）；
- **Agent 方只实现一次 MCP 客户端**（发现工具、调用工具）；
- 中间通过标准协议通信，谁都能接谁。

所以 MCP 常被比喻成"AI 世界的 USB-C"：一个统一接口，连接各种能力。

## MCP 的三个角色

| 角色 | 是什么 | 类比 |
| --- | --- | --- |
| Host | Agent / 应用本身，负责决策 | 电脑 |
| Client | Host 内置的连接器 | 操作系统驱动 |
| Server | 暴露工具/资源/提示的独立服务 | 外接设备 |

一次典型交互：Host 让 Client 去连接某个 MCP Server，Server 汇报"我有这些工具"，Host 把工具清单交给模型，模型请求调用时再由 Client 转发给 Server 执行。协议底层走 JSON-RPC，支持 stdio（本地进程）和 HTTP/SSE（远程服务）两类传输。

## 能暴露的不只是"工具"

MCP 定义了三种原语，理解它们才能用好：

1. **Tools（工具）**：可执行的动作，模型自主调用——我们在用的就是这个；
2. **Resources（资源）**：可读取的数据，如文件、数据库表、文档，通常由用户或程序按需提供给模型；
3. **Prompts（提示模板）**：可复用的交互模板，帮助用户快速启动某个任务。

生产系统的常见接法：文件系统、数据库、搜索、代码仓库、浏览器、IM/邮件，几乎都已有社区或官方 MCP Server。

## 动手接一个 MCP Server

以官方 SDK 为例，写一个最小的 MCP Server（Python）：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("notes-server")

@mcp.tool()
def search_notes(keyword: str) -> list[str]:
    """在个人笔记库中搜索包含关键词的笔记标题。"""
    # 这里接你的笔记存储
    return [title for title in note_titles() if keyword in title]

if __name__ == "__main__":
    mcp.run()   # 默认 stdio 传输
```

Agent 侧（以通用 MCP 客户端 SDK 为例）就是"发现工具 → 加入模型工具清单 → 转发调用"，与第四课学过的 function calling 无缝衔接——对模型来说，MCP 工具和本地函数长得一模一样。

## 落地时的四个实践问题

- **权限与信任**：MCP Server 拿到了什么权限？尤其远程服务。不要把高权限 Server 交给不可信的 Agent；
- **工具数量膨胀**：连了十个 Server、上百个工具后，模型选择准确率会掉。解决办法是"按需挂载"：根据任务动态决定加载哪些 Server（分层/路由）；
- **连接治理**：远程 MCP 的地址、密钥、可用性要有统一管理，出问题可拔插；
- **安全审计**：Agent 调用外部工具是"行动"，务必叠加六月讲的人审与护栏，而不是默认放行。

## 小结

MCP 把"接工具"从点对点集成变成标准化的生态接入，是 Agent 走向规模化落地的基础设施。用好它的关键是管好权限、控制工具面。下周我们讲更朴素但同样要命的主题：生产环境的可靠性。
