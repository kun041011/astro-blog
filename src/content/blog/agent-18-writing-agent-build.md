---
title: 综合实战（下）：实现"博客写作 Agent"
description: 第十八课：从状态定义到节点实现，再到人工闸门与评测迭代，把设计落成可跑的代码。
pubDate: 2026-08-09
tags:
  - Agent
  - 实战
draft: false
---

上篇完成了需求与设计。这篇动手实现，仍然贯彻"工作流骨架 + Agent 节点 + 人工把关"的架构。为聚焦原理，代码用清晰可读的示意写法，真实接入模型 API 处用函数占位。

## 状态结构：先定义"要传递什么"

用 LangGraph 风格的状态（也可以理解为普通数据类）：

```python
class DraftState(TypedDict):
    topic: str                # 用户主题
    materials: list[str]      # 检索到的资料（含来源标注）
    outline: list[str]        # 大纲小节
    sections: list[str]       # 各节草稿
    polished: str             # 润色后的完整正文
    meta: dict                # 标题/描述/标签，用于生成 frontmatter
    approved: bool            # 人工确认标记
```

状态就是整个任务的"记忆"：每一步只往里面加字段，任何一步失败都可以带着已保存的状态续跑（七月可靠性篇）。

## 节点一：规划（检索 + 大纲）

```python
def plan_node(state: DraftState) -> dict:
    mats = search_notes(state["topic"]) + search_web(state["topic"])
    outline = call_llm_json(
        f"为「{state['topic']}」生成 5 节以内的文章大纲，输出 JSON 数组",
        context=mats[:6],
    )
    return {"materials": mats, "outline": outline}
```

注意两点：检索结果要**带来源**一起塞给起草环节（减少幻觉，五月 RAG 篇）；大纲用结构化输出约束（三月提示词篇）。

## 人工确认点：大纲不通过就改

这是"人在回路"的关键闸门（六月人审篇）。示意实现：

```python
def human_review(state: DraftState) -> dict:
    print("=== 拟定大纲 ===")
    for i, s in enumerate(state["outline"], 1):
        print(f"{i}. {s}")
    cmd = input("确认 [y] / 修改意见 [直接输入] / 终止 [q]：")
    if cmd == "y":
        return {"approved": True}
    if cmd == "q":
        raise SystemExit("用户终止")
    return {"outline": revise_outline(state["outline"], cmd),
            "approved": False}   # 带意见回去重写
```

条件边据此决定：通过则起草，不通过则带修改意见返回规划节点。

## 节点二/三：逐节起草与润色

起草按大纲逐节进行，每节独立成文再拼接，避免一次生成过长（上篇设计过这个取舍）：

```python
def draft_node(state: DraftState) -> dict:
    sections = []
    for sec in state["outline"]:
        sections.append(call_llm(
            f"请撰写这一节：{sec}\n"
            f"要求：通俗、有实例、结尾可留悬念；"
            f"仅使用以下资料，不编造：{join_materials(state['materials'])}"
        ))
    return {"sections": sections}

def polish_node(state: DraftState) -> dict:
    joined = "\n\n".join(state["sections"])
    polished = call_llm(
        "将以下草稿润色为完整博客正文：统一小标题层级、"
        "修正 Markdown 语法、补一句开头引语与结尾小结。\n" + joined
    )
    return {"polished": polished}
```

润色是最后一道"模型加工"，接下来进入纯代码的收尾——尽量把确定性工作留给代码。

## 收尾：组装 frontmatter + 终审闸门

标题、描述、标签尽量让模型先给草案，再用代码校验格式（例如日期用当天、标签去重、与现有 slug 冲突检测），最后落到待发布文件：

```python
def assemble_node(state: DraftState) -> dict:
    meta = validate_meta(state["meta"])          # 纯代码校验
    frontmatter = render_frontmatter(meta)       # 纯代码渲染
    path = DRAFTS_DIR / f"{slugify(meta['title'])}.md"
    path.write_text(frontmatter + state["polished"], encoding="utf-8")
    return {"meta": meta}
```

**刻意设计**：这一步只写入"草稿目录"，真正把文件移入 `src/content/blog/` 并 `git push` 的按钮永远留给用户手动执行——发布是不可逆的高影响动作，交给人是六月和七月反复强调的底线。

## 评测与迭代：别只靠感觉

按上篇定的指标做小规模评测（六月可观测篇的 LLM-as-Judge）：

```python
def evaluate(draft, materials, reference):
    return judge_llm(f"""按维度打分（1-5）：忠实度(是否忠于资料)、
结构、可读性。
资料：{materials}  参考：{reference}  草稿：{draft}""")
```

攒 10-20 个"主题-预期"用例，每次改提示词/切模型都全量跑一遍，分数回退就说明改动有害。这是半年里我们反复强调的闭环：**没有评测的优化都是自我感觉良好**。

## 小结

从三月到今天，这个项目把整条学习线串了起来：提示词与工具（三月）支撑每个节点，ReAct 与规划（四月）决定骨架，RAG（五月）提供资料，框架（五月）负责编排，人审与安全（六月）守住闸门，可靠性与成本思维（七月）约束设计。最后一篇，我们做半年复盘与路线图。
