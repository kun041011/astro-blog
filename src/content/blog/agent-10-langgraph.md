---
title: LangGraph 实战：用"图"编排一个可维护的 Agent
description: 第十课：节点、边与状态——用一个带人工确认环节的示例，体验 LangGraph 的编排方式。
pubDate: 2026-05-24
tags:
  - Agent
  - LangGraph
  - 实践
draft: false
---

上篇对比框架时我说过，LangGraph 是目前构建生产级流程的主流选择。今天动真格：用一个小例子（"查资料 → 草拟 → 人工确认 → 定稿"的写作 Agent）体验它的核心概念。

## 三个核心概念

LangGraph 把一切建模成三样东西：

- **State（状态）**：在节点间流转的数据对象，是流程的"记忆"，例如 `{"topic", "draft", "approved"}`；
- **Node（节点）**：一段业务逻辑，接收 State 返回更新后的 State；
- **Edge（边）**：节点间的连线，可以带**条件**，决定下一步走哪条路。

写 LangGraph 与其说在写代码，不如说在**画流程图**：每个圆圈是一个节点，每条箭头是一条边，条件判断是菱形。

## 安装与最小骨架

```bash
pip install langgraph langchain-openai
```

```python
from typing import TypedDict
from langgraph.graph import StateGraph, END

class State(TypedDict):
    topic: str
    draft: str
    approved: bool

def draft_node(state: State) -> dict:
    draft = call_llm(f"围绕『{state['topic']}』写一段 300 字草稿")
    return {"draft": draft}

def human_review(state: State) -> dict:
    # 真实场景：暂停并等待人工输入（interrupt）
    return {"approved": ask_human(state["draft"])}

def finish_node(state: State) -> dict:
    publish(state["draft"])
    return {}

def route_after_review(state: State):
    return "finish" if state["approved"] else "rewrite"   # 条件边

g = StateGraph(State)
g.add_node("draft", draft_node)
g.add_node("rewrite", draft_node)      # 复用草拟逻辑做修改
g.add_node("review", human_review)
g.add_node("finish", finish_node)

g.set_entry_point("draft")
g.add_edge("draft", "review")
g.add_conditional_edges("review", route_after_review,
                        {"finish": "finish", "rewrite": "rewrite"})
g.add_edge("rewrite", "review")
g.add_edge("finish", END)

app = g.compile()
app.invoke({"topic": "Agent 的落地实践"})
```

## 对比手写的进步

回想四月份我们手写的 `while True` 循环：逻辑全在函数里，一旦要加"分支"（比如人工不通过就回去重写），代码就开始堆 `if/else`，改多了就乱。用图表达之后：

- **流程一目了然**：看图的定义就知道整个 Agent 有几条路；
- **状态显式化**：State 定义即数据结构文档；
- **好插桩**：在任意节点前后加日志、埋点、断点都方便；
- **天然支持人审**：LangGraph 内置 `interrupt`，可以让流程"暂停等人"，这是手写最难的部分之一。

## 生产级的几个关键配置

LangGraph 有配套的持久化与平台能力，值得了解的能力清单：

- **Checkpointer（检查点）**：保存每次状态，支持断点续跑、回放、多轮对话记忆；
- **Time travel / 回放**：任意一步重跑，是调试利器；
- **超时与重试**：给节点单独设置超时，避免单个工具卡死整个流程；
- **流式输出（streaming）**：节点产出逐步推送给前端，提升用户体感。

## 什么时候其实不需要它

再次强调上篇的结论：如果流程固定且简单，手写 30 行循环更划算。LangGraph 的收益在"复杂 + 需要长期演进"时才会兑现。**选型跟着复杂度走，不跟热度走**。

## 小结

至此五月的三块拼图完成：RAG 给 Agent 知识，框架对比给选型依据，LangGraph 给生产级的流程表达。六月份，我们把镜头拉远：多个 Agent 如何协作、如何观测与评测 Agent、以及如何在关键环节引入人工。
