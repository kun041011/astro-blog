export type ResumeLang = 'zh' | 'en';

export interface ResumeCopy {
  eyebrow: string;
  name: string;
  nameAlt: string;
  role: string;
  summary: string;
  contacts: { label: string; value: string; href: string }[];
  strengthsTitle: string;
  strengths: { title: string; text: string }[];
  experienceTitle: string;
  jobs: {
    org: string;
    role: string;
    time: string;
    stack: string;
    points: string[];
    href?: string;
    hrefLabel?: string;
  }[];
  projectsTitle: string;
  projectsNote: string;
  detailsLabel: string;
  projects: {
    name: string;
    role: string;
    time: string;
    stack: string;
    points: string[];
    details: string[];
    href?: string;
    hrefLabel?: string;
  }[];
  educationTitle: string;
  school: string;
  program: string;
  eduTime: string;
  eduExtra: string;
  courses: string;
  skillsTitle: string;
  skills: { label: string; text: string }[];
  honorsTitle: string;
  honors: string[];
  printLabel: string;
}

const contacts = {
  email: {
    href: 'mailto:kun041011@outlook.com',
    value: 'kun041011@outlook.com',
  },
  phone: { href: 'tel:18953362110', value: '18953362110' },
  github: {
    href: 'https://github.com/kun041011',
    value: 'github.com/kun041011',
  },
  blog: { href: 'https://kun44.cn/', value: 'kun44.cn' },
};

export const resume: Record<ResumeLang, ResumeCopy> = {
  zh: {
    eyebrow: '在线简历',
    name: '张煜坤',
    nameAlt: 'Zhang Yukun',
    role: 'Agent 开发 / LLM 应用',
    summary:
      '做 Agent 应用和后端交付。独立实现了并行 Coding Agent 编排服务 Scion，也做过基于 LangChain 的细粒度情感分析服务。实习期间负责舆情监控后端，以及亿级交通数据中台。',
    contacts: [
      { label: '邮箱', ...contacts.email },
      { label: '电话', ...contacts.phone },
      { label: 'GitHub', ...contacts.github },
      { label: '博客', ...contacts.blog },
    ],
    strengthsTitle: '核心能力',
    strengths: [
      {
        title: 'Agent 编排',
        text: '用 asyncio、FastAPI 和 git worktree 并行运行多个 CLI Agent，并完成分支对比与合并。',
      },
      {
        title: 'LLM 应用',
        text: 'LangChain、RAG、FAISS、Pydantic 结构化输出，以及按问题类型做 Agent 路由。',
      },
      {
        title: '后端服务',
        text: 'FastAPI / Flask 接口，RabbitMQ 异步接入，ClickHouse 上的查询与交付。',
      },
      {
        title: '数据链路',
        text: '多平台采集、清洗入库、MySQL 分表，以及标准化后的对外接口。',
      },
    ],
    experienceTitle: '实习经历',
    jobs: [
      {
        org: '吉林省卡思特科技有限公司',
        role: '交通运输数据中台 · 后端开发',
        time: '2025.11 – 2026.02',
        stack: 'Python · FastAPI · ClickHouse · RabbitMQ',
        points: [
          '负责亿级交通数据中台后端，对接省厅、出租、网约车等多源数据，建成「多源接入 → 标准化治理 → 合规交付」链路。',
          '用 RabbitMQ 异步接入车辆位置与营运交易等日均千万级消息；百万级车辆与驾驶员数据采用分批分页同步。',
          '核心数据存于 ClickHouse。通过分区键与排序索引，复杂查询响应时间降低约 40%，并用 FastAPI 封装标准化接口。',
        ],
        href: '/posts/resume-05-data-midplatform/',
        hrefLabel: '阅读复盘',
      },
      {
        org: '吉林省卡思特科技有限公司',
        role: 'TOCC 舆情监控系统 · 后端核心开发',
        time: '2025.08 – 2025.10',
        stack: 'Python · Flask · DrissionPage · MySQL',
        points: [
          '负责中文舆情监控后端，覆盖抖音、微博、小红书的采集、清洗、存储与情感分析。',
          '用 UA 池轮转、动态代理和浏览器指纹模拟提升采集成功率，MySQL 分表承接日均万级评论。',
          '集成自研情感分析模块（LangChain + FAISS），完成评论极性判断与方面词 / 观点词四元组抽取。',
        ],
        href: '/posts/resume-04-tocc/',
        hrefLabel: '阅读复盘',
      },
    ],
    projectsTitle: '项目经历',
    projectsNote: '默认只保留结果和职责，细节可以展开。',
    detailsLabel: '细节',
    projects: [
      {
        name: 'Scion · 并行 Coding Agent 编排服务',
        role: '独立开发',
        time: '2026.09 – 至今',
        stack: 'Python · asyncio · FastAPI · WebSocket · Git',
        points: [
          '同一仓库可同时运行 Cursor、Claude Code、Codex 等 CLI Agent，每个 agent 独占 worktree 与分支。',
          '支持最多 6 路同仓库分支相对创建基线的并排 diff，并可一键把胜出分支合并回基准分支。',
          '主仓库不干净或发生冲突时中止合并，不留下半成品。',
        ],
        details: [
          '解析 stream-json 输出，经 WebSocket 实时推送并支持断线回放。运行中可以通过 stdin 追问，结束后用已捕获的 session id 在同一 worktree 上恢复会话。',
          '提供 CLI（run / attach / compare / merge）和带令牌鉴权的 Web 控制台。代码公开在 GitHub。',
        ],
        href: 'https://github.com/kun041011/Scion',
        hrefLabel: '查看仓库',
      },
      {
        name: '智能情感分析系统',
        role: '项目负责人',
        time: '2025.03 – 2025.05',
        stack: 'LangChain · LLM · FAISS · Agent · RAG · FastAPI',
        points: [
          '基于 LangChain 构建 ABSA 细粒度分析链，用 Pydantic 约束 JSON 输出。',
          '以 FAISS + RAG 增强语义检索，由 Agent 路由动态调度问答，并封装为 FastAPI 服务。',
          '响应低于 200ms；RAG 召回使新评论分析准确率相比纯 LLM 提升 22%。',
        ],
        details: [
          '实现方面词 / 观点词四元组自动抽取。该能力后用于实习公司的舆情监控，支撑日均万级评论处理。',
        ],
        href: '/posts/resume-03-sentiment/',
        hrefLabel: '阅读复盘',
      },
      {
        name: '慧眼 · 工业产品缺陷智能检测平台',
        role: '项目主导',
        time: '2024.01 – 2024.07',
        stack: 'Python · PyQt5 · PyTorch · PyTorch-Lightning · PaDiM · FastFlow · STFPM',
        points: [
          '集成 PaDiM、FastFlow、STFPM 三类无监督缺陷检测模型，用 PyQt5 做成支持实时与本地推理的可视化平台。',
          '误报率控制在 0.5% 以下，图像级平均 AUC 达到 0.907，像素级 AUC 达到 0.967。',
          '全流程操作时间缩短约 60%，获第十七届中国大学生计算机设计大赛国家二等奖。',
        ],
        details: [
          '针对人工目检效率低、漏检高的问题，基于 PyTorch-Lightning 统一训练与推理流程，并做了数据预处理和模型对比，自动输出图像级与像素级 AUC。',
        ],
        href: '/posts/resume-02-huayan/',
        hrefLabel: '阅读复盘',
      },
    ],
    educationTitle: '教育经历',
    school: '长春理工大学',
    program: '数据科学与大数据技术 · 本科',
    eduTime: '2022.09 – 2026.06',
    eduExtra: 'GPA：专业前 30% · 三次校三等奖学金',
    courses: '主修课程：数据结构与算法、计算机网络、数据库系统、操作系统、Python 程序设计',
    skillsTitle: '技能栈',
    skills: [
      {
        label: 'Agent',
        text: 'Python、asyncio、FastAPI、WebSocket、git worktree；使用过 Cursor、Claude Code、Codex CLI',
      },
      {
        label: 'LLM 应用',
        text: 'LangChain、RAG、FAISS、Prompt、Pydantic 结构化输出、Agent 路由',
      },
      {
        label: '后端与数据',
        text: 'Flask、MySQL、ClickHouse、HBase、Redis、RabbitMQ、Docker、Nginx',
      },
    ],
    honorsTitle: '荣誉证书',
    honors: [
      '大学英语四级（CET-4）',
      '第十七届中国大学生计算机设计大赛国家二等奖',
      '第十五届蓝桥杯国家三等奖',
      '三次校三等奖学金',
    ],
    printLabel: '打印',
  },
  en: {
    eyebrow: 'Online Resume',
    name: 'Zhang Yukun',
    nameAlt: '张煜坤',
    role: 'Agent Developer / LLM Applications',
    summary:
      'I build agent applications and backend systems. I independently built Scion, a service that runs coding agents in parallel, and a LangChain service for aspect-level sentiment analysis. As an intern I owned a public-opinion backend and a large-scale transportation data platform.',
    contacts: [
      { label: 'Email', ...contacts.email },
      { label: 'Phone', ...contacts.phone },
      { label: 'GitHub', ...contacts.github },
      { label: 'Blog', ...contacts.blog },
    ],
    strengthsTitle: 'Core Strengths',
    strengths: [
      {
        title: 'Agent orchestration',
        text: 'Run several CLI agents in parallel with asyncio, FastAPI, and git worktrees, then compare and merge the branches.',
      },
      {
        title: 'LLM applications',
        text: 'LangChain, RAG, FAISS, Pydantic structured output, and routing by question type.',
      },
      {
        title: 'Backend services',
        text: 'FastAPI and Flask APIs, asynchronous ingest with RabbitMQ, and query/delivery on ClickHouse.',
      },
      {
        title: 'Data pipelines',
        text: 'Multi-platform collection, cleaning, MySQL sharding, and standardized delivery APIs.',
      },
    ],
    experienceTitle: 'Experience',
    jobs: [
      {
        org: '吉林省卡思特科技有限公司',
        role: 'Transportation Data Platform · Backend Developer',
        time: '2025.11 – 2026.02',
        stack: 'Python · FastAPI · ClickHouse · RabbitMQ',
        points: [
          'Built the backend of a transportation data platform at hundred-million scale, connecting provincial, taxi, and ride-hailing sources into one ingest, governance, and delivery path.',
          'Ingested vehicle locations and operating transactions through RabbitMQ, on the order of tens of millions of messages per day. Synced million-scale vehicle and driver records in paged batches.',
          'Stored the core data in ClickHouse. Partition keys and sort indexes cut complex query time by about 40%. FastAPI exposed the standardized APIs.',
        ],
        href: '/posts/resume-05-data-midplatform/',
        hrefLabel: 'Write-up (Chinese)',
      },
      {
        org: '吉林省卡思特科技有限公司',
        role: 'TOCC Public-Opinion System · Backend Developer',
        time: '2025.08 – 2025.10',
        stack: 'Python · Flask · DrissionPage · MySQL',
        points: [
          'Owned the backend for Chinese public-opinion monitoring across Douyin, Weibo, and Xiaohongshu, from collection through cleaning, storage, and sentiment analysis.',
          'Raised collection success with UA rotation, rotating proxies, and browser-fingerprint simulation. Sharded MySQL tables held about ten thousand comments per day.',
          'Integrated an in-house sentiment module (LangChain + FAISS) for polarity and aspect/opinion quadruple extraction.',
        ],
        href: '/posts/resume-04-tocc/',
        hrefLabel: 'Write-up (Chinese)',
      },
    ],
    projectsTitle: 'Projects',
    projectsNote: 'The page stays on outcomes. Open a project for the implementation notes.',
    detailsLabel: 'Details',
    projects: [
      {
        name: 'Scion · Parallel Coding-Agent Orchestrator',
        role: 'Independent',
        time: '2026.09 – Present',
        stack: 'Python · asyncio · FastAPI · WebSocket · Git',
        points: [
          'Runs Cursor, Claude Code, Codex, and other CLI agents against one repository. Each agent gets its own worktree and branch.',
          'Compares up to six branches from the same repository against the creation baseline, then merges the chosen branch in one step.',
          'Aborts the merge when the main checkout is dirty or the merge conflicts, so a half-finished merge is not left behind.',
        ],
        details: [
          'Parses stream-json output, pushes it over WebSocket, and replays the stream after a disconnect. Follow-ups go to stdin while an agent is running. After it exits, the captured session id resumes work in the same worktree.',
          'Ships a CLI (run / attach / compare / merge) and a token-protected web console. The code is public on GitHub.',
        ],
        href: 'https://github.com/kun041011/Scion',
        hrefLabel: 'Repository',
      },
      {
        name: 'Aspect-Level Sentiment System',
        role: 'Project lead',
        time: '2025.03 – 2025.05',
        stack: 'LangChain · LLM · FAISS · Agent · RAG · FastAPI',
        points: [
          'Built an ABSA chain with LangChain and constrained the JSON output with Pydantic.',
          'Used FAISS and RAG for retrieval, routed questions with an agent, and served the system through FastAPI.',
          'Responses stayed under 200ms. RAG improved accuracy on new comments by 22% compared with the LLM alone.',
        ],
        details: [
          'The service extracts aspect/opinion quadruples. It was later used in the internship public-opinion monitor, which handled about ten thousand comments a day.',
        ],
        href: '/posts/resume-03-sentiment/',
        hrefLabel: 'Write-up (Chinese)',
      },
      {
        name: 'Huiyan · Industrial Defect Detection Platform',
        role: 'Project lead',
        time: '2024.01 – 2024.07',
        stack: 'Python · PyQt5 · PyTorch · PyTorch-Lightning · PaDiM · FastFlow · STFPM',
        points: [
          'Integrated the unsupervised detectors PaDiM, FastFlow, and STFPM, and built a PyQt5 app for live and local inference.',
          'Kept the false-positive rate under 0.5%. Mean image-level AUC reached 0.907, and pixel-level AUC reached 0.967.',
          'Cut end-to-end operation time by about 60%, and won a national second prize at the 17th China Collegiate Computing Design Contest.',
        ],
        details: [
          'The platform replaced slow manual inspection. PyTorch-Lightning standardized training and inference, and a comparison module reported image-level and pixel-level AUC.',
        ],
        href: '/posts/resume-02-huayan/',
        hrefLabel: 'Write-up (Chinese)',
      },
    ],
    educationTitle: 'Education',
    school: 'Changchun University of Science and Technology',
    program: 'B.S. Data Science and Big Data Technology',
    eduTime: '2022.09 – 2026.06',
    eduExtra: 'GPA: top 30% of the major · three university third-class scholarships',
    courses:
      'Coursework: data structures and algorithms, computer networks, database systems, operating systems, Python',
    skillsTitle: 'Skills',
    skills: [
      {
        label: 'Agent',
        text: 'Python, asyncio, FastAPI, WebSocket, git worktree; Cursor, Claude Code, and Codex CLI',
      },
      {
        label: 'LLM applications',
        text: 'LangChain, RAG, FAISS, prompting, Pydantic structured output, agent routing',
      },
      {
        label: 'Backend and data',
        text: 'Flask, MySQL, ClickHouse, HBase, Redis, RabbitMQ, Docker, Nginx',
      },
    ],
    honorsTitle: 'Honors',
    honors: [
      'CET-4',
      'National second prize, 17th China Collegiate Computing Design Contest',
      'National third prize, 15th Lanqiao Cup',
      'University third-class scholarship, three times',
    ],
    printLabel: 'Print',
  },
};
