---
title: 让模型学会"动手"：工具调用入门
description: 第四课：Function Calling 的原理、工具定义与调用循环，附一份可直接运行的 Python 示例。
pubDate: 2026-03-22
tags:
  - Agent
  - 工具调用
  - 入门
draft: false
---

没有工具，模型再聪明也只是"纸上谈兵"。工具调用（Function Calling / Tool Use）让模型能够在对话中主动请求执行某个函数，再把结果拿回来继续推理。这是 Agent 区别于聊天机器人的分水岭。

## 它到底是怎么工作的

工具调用不是一个魔法，而是一种**约定好的消息协议**，流程分四步：

1. 你在请求里附带"可用工具清单"（函数名、参数 schema、说明）；
2. 模型读完用户问题，决定调用哪个工具，输出一个结构化的"调用请求"（不是真的执行）；
3. 你的程序收到请求后，真正去执行对应函数；
4. 把执行结果作为一条新消息返回给模型，模型据此继续回答或再次调用。

关键认知：**模型只负责"决定调什么"，执行权永远在你的代码里**。这让 Agent 既灵活又可控制。

## 一个最小可用示例

以 OpenAI 兼容接口为例，先定义一个工具：

```json
{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "查询指定城市的实时天气",
    "parameters": {
      "type": "object",
      "properties": {
        "city": { "type": "string", "description": "城市名，如 北京" }
      },
      "required": ["city"]
    }
  }
}
```

对应的执行循环（伪代码）：

```python
messages = [{"role": "user", "content": "北京今天冷不冷？"}]
tools = [weather_tool]

while True:
    resp = client.chat.completions.create(
        model=MODEL, messages=messages, tools=tools
    )
    msg = resp.choices[0].message
    messages.append(msg)          # 模型的决定进上下文

    if not msg.tool_calls:        # 没有工具请求 => 回答完毕
        break

    for call in msg.tool_calls:   # 逐个执行真实函数
        result = run_function(call.function.name, call.function.arguments)
        messages.append({
            "role": "tool",
            "tool_call_id": call.id,
            "content": str(result),
        })
```

跑起来后你会看到：模型先输出 `get_weather` 的调用请求，程序执行后把温度结果塞回去，模型再生成"北京今天 5 度，记得穿羽绒服"。

## 工具描述决定成败

模型选择工具主要靠你的 `description` 和参数说明。写得含糊，模型就会选错或填错参数。三个要点：

- **描述要写"何时用"**：例如"仅在用户询问天气时调用"，而不是只写"查询天气"；
- **参数名和说明用业务语言**：模型对语义理解比位置敏感得多；
- **数量克制**：一次给模型十几个工具，选择准确率会明显下降。给太多不如分层：先用"路由器"工具决定领域，再进入该领域的工具集。

## 常见翻车点

- 模型"假装执行"：在自由文本里写"已为您查询"，却没有发起 tool_call。对策：system 提示词里明确"需要外部信息时务必调用工具，不要臆造结果"；
- 参数是字符串：很多 SDK 传回的是 JSON 字符串，要 `json.loads` 解析后再执行；
- 忘了把结果回传：工具结果不回传，模型就"失忆"了，会重复调用或凭空发挥。

## 小结与下一步

工具调用 = 把"决定权"给模型、把"执行权"留给自己。至此，Agent 的地基三件套（LLM、提示词、工具）已经齐了。四月份，我们开始组装真正的 Agent：先手写一个 ReAct 循环，再给它装上记忆与规划能力。
