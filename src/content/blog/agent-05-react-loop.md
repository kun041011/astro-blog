---
title: 手写一个 ReAct：Agent 的思考-行动循环
description: 第五课：不依赖框架，用几十行代码实现"思考→行动→观察"的 Agent 核心循环。
pubDate: 2026-04-05
tags:
  - Agent
  - ReAct
  - 实践
draft: false
---

三月份我们把 LLM、提示词、工具调用三块积木搭好了。这个月第一课，用它们拼出 Agent 的心脏：ReAct 循环。ReAct 源自 2022 年的一篇论文（Reasoning and Acting in Language Models），核心思想朴素却极其有用：**模型交替输出"思考"与"行动"，根据工具返回的"观察"继续推理**。

## 循环长什么样

一个典型循环：

1. 用户提问；
2. 模型输出 Thought（当前判断）与 Action（要调的工具 + 参数）；
3. 程序执行工具，把结果作为 Observation 返回；
4. 回到第 2 步，直到模型输出 Final Answer。

这套模式在今天几乎所有 Agent 框架里都能看到影子，理解了它，看任何框架的源码都不会懵。

## 不靠框架，直接写

为了看清本质，我们用纯字符串协议实现，不用任何 Agent SDK。完整可运行的核心如下：

```python
import json

SYSTEM = """你是一个带工具的助手。
可用的行动格式：只能输出 JSON，字段为：
{"thought": "你的推理", "action": "工具名", "action_input": {...}}
工具只有 get_weather。当任务完成时，输出：
{"thought": "信息已足够", "action": "finish", "action_input": {"answer": "最终回答"}}"""

def run_agent(question: str, max_steps: int = 5) -> str:
    messages = [{"role": "system", "content": SYSTEM},
                {"role": "user", "content": question}]

    for _ in range(max_steps):
        text = call_llm(messages)          # 1. 推理：拿到一句 JSON
        step = json.loads(text)            # 2. 解析决定
        messages.append({"role": "assistant", "content": text})

        if step["action"] == "finish":
            return step["action_input"]["answer"]

        observation = execute_tool(step["action"], step["action_input"])  # 3. 执行
        messages.append({"role": "user",
                         "content": f"Observation: {observation}"})       # 4. 回传
    return "已达最大步数，任务终止"

print(run_agent("北京现在多少度？"))
```

这里 `call_llm` 可以是任意模型的对话接口，`execute_tool` 是一个函数分发表。整体不过三十来行，却已经是一个能自主完成多步任务的 Agent 雏形。

## 三个工程要点

- **步数上限必须有**：模型可能陷入死循环（反复查同一个东西）。`max_steps` 就是熔断器；
- **让"思考"可见**：Thought 字段不仅帮助模型推理，也是我们调试 Agent 行为的宝贵日志；
- **JSON 解析要容错**：模型偶尔会输出多余文字或非法 JSON。稳妥做法是加一次"纠错重试"：把解析失败连同报错塞回对话，让模型重新输出。

## 用 OpenAI 的 function calling 也行

如果你的模型原生支持工具调用（像上篇讲的那样），可以让 SDK 帮你完成解析与回传，写法更省心。但强烈建议**至少手写一遍上面的纯文本循环**——它能帮你理解框架在背后做了什么，出了问题才知道去哪里排查。

## 小结

ReAct 是 Agent 的灵魂：推理让行动有方向，行动的结果又喂回推理。下一篇，我们给这个循环装上"记忆"，让它能记住更长时间跨度的信息。
