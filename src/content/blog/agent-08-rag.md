---
title: 给 Agent 装上知识库：RAG 快速上手
description: 第八课：为什么 Agent 需要外部知识，RAG 的三个环节，以及一个可落地的实现骨架。
pubDate: 2026-05-10
tags:
  - Agent
  - RAG
  - 实践
draft: false
---

四月在讲记忆时提到过"按需检索"。这个月第一课，我们把这条线彻底打通：用 RAG（Retrieval-Augmented Generation，检索增强生成）给 Agent 装上一个可以随时查询的知识库。

## 为什么要 RAG

模型的知识停留在训练截止时间，也不了解你的私有资料。给模型"灌知识"有三条路：

| 方案 | 做法 | 缺点 |
| --- | --- | --- |
| 微调 | 用资料继续训练模型 | 贵、慢、知识更新难 |
| 全部塞上下文 | 把资料全文放进提示 | 超 Token 上限，长文效果差 |
| RAG | 检索相关片段再回答 | 需要搭建检索链路 |

RAG 用"检索"替代"背诵"：只在需要时把相关资料拿出来，答案可溯源、知识可随时更新，是知识型 Agent 的事实标准。

## RAG 的标准三环节

1. **索引（Indexing）**：把文档切块（chunk），每块做嵌入向量化，存入向量数据库；
2. **检索（Retrieval）**：把用户问题向量化，用相似度找出最相关的 K 个片段；
3. **生成（Generation）**：把问题 + 检索到的片段一起交给 LLM，让它"基于资料回答"。

### 切块是第一步也是最重要的细节

块太大，噪声多、容易超限；块太小，语义不完整。经验值一般在几百到上千字，配合**重叠**（前后块保留少量重复）减少切断语义。更进阶的做法是按文档结构（标题/段落）切，而不是无脑按字数切。

## 一个最小实现骨架

下面用伪代码勾勒完整链路，具体向量库可用任意支持余弦相似度的实现：

```python
def build_index(docs, embed_fn):
    chunks = []
    for doc in docs:
        for piece in split_by_heading_and_size(doc, size=600, overlap=80):
            chunks.append({"text": piece,
                           "vec": embed_fn(piece)})   # 文本 -> 向量
    return chunks

def retrieve(chunks, question, embed_fn, top_k=4):
    qv = embed_fn(question)
    scored = sorted(chunks,
                    key=lambda c: cosine(qv, c["vec"]),
                    reverse=True)
    return [c["text"] for c in scored[:top_k]]

def answer_with_rag(question, chunks):
    hits = retrieve(chunks, question, embed_fn)
    context = "\n\n".join(f"[资料{i+1}] {t}" for i, t in enumerate(hits))
    return call_llm(f"""请基于以下资料回答用户问题。
资料可能不完整，资料中没有答案时请明确说明。
{context}

问题：{question}""")
```

## 与 Agent 的整合模式

RAG 和 Agent 结合有三种常见姿势：

1. **一次检索**：用户问题进来先检索再回答——适合常见问答，快但僵化；
2. **检索作为工具**：把 `search_knowledge(query)` 注册成工具（第四课的方法），Agent 自主决定何时检索、检索什么——灵活，推荐；
3. **多轮检索**：Agent 先拆问题，逐个子问题检索再汇总——适合复杂调研。

进阶时还可以做**混合检索**（向量 + 关键词）、**重排（Rerank）**（对初筛结果用模型精排）、**引用溯源**（回答附上 [资料N] 标记，四月的记忆实现里我用了同样的思路）。

## 评估：别凭感觉说"效果好"

RAG 上线前至少要测三件事：

- **检索召回率**：该找到的资料有没有被找出来；
- **忠实度**：回答是否严格基于资料、有没有编造；
- **答案质量**：是否准确、完整、格式正确。

建议准备一份几十条的评测集，每次改动索引策略都跑一遍对比分数。关于"怎么系统评测 Agent"，六月可观测性一课会展开。

## 小结

RAG = 离线把资料向量化 + 在线按需检索 + 基于资料作答。对 Agent 而言，它既是"记忆的扩展"，也是"可信度的来源"。下周我们把视野拉高，看看主流的 Agent 框架各自擅长什么、怎么选。
