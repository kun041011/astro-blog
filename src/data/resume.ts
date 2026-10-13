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
    role: 'Python 开发 / Agent 开发',
    summary:
      'Python 开发，方向是 Agent。用 asyncio、FastAPI 和 git worktree 并行跑多个 CLI Agent，再做分支对比和合并。情感分析、舆情采集和亿级交通数据中台，也是同一套 Python 服务交付。',
    contacts: [
      { label: '邮箱', ...contacts.email },
      { label: '电话', ...contacts.phone },
      { label: 'GitHub', ...contacts.github },
      { label: '博客', ...contacts.blog },
    ],
    strengthsTitle: '核心能力',
    strengths: [
      {
        title: 'Python 开发',
        text: 'asyncio、FastAPI、Flask、Pydantic、服务与接口交付。',
      },
      {
        title: 'Agent 开发',
        text: 'git worktree、并行 CLI Agent、分支对比与合并、按问题路由。',
      },
      {
        title: '后端服务',
        text: 'RabbitMQ 异步接入、ClickHouse 查询、WebSocket 推送。',
      },
      {
        title: '数据链路',
        text: '多平台采集、清洗入库、MySQL 分表、标准化接口。',
      },
    ],
    experienceTitle: '实习经历',
    jobs: [
      {
        org: '吉林省卡思特科技有限公司',
        role: '交通运输数据中台 · Python 开发',
        time: '2025.11 – 2026.02',
        stack: 'Python · FastAPI · ClickHouse · RabbitMQ',
        points: [
          '用 Python 做亿级交通数据中台后端，把省厅、出租、网约车等多源数据收成接入、治理、交付一条链路。',
          '车辆位置和营运交易走 RabbitMQ，日均千万级消息；百万级车辆与驾驶员按分页分批同步。',
          '核心数据放 ClickHouse，分区键和排序索引把复杂查询时间降了约 40%，对外接口用 FastAPI。',
        ],
        href: '/posts/resume-05-data-midplatform/',
        hrefLabel: '阅读复盘',
      },
      {
        org: '吉林省卡思特科技有限公司',
        role: 'TOCC 舆情监控系统 · Python 开发',
        time: '2025.08 – 2025.10',
        stack: 'Python · Flask · DrissionPage · MySQL',
        points: [
          '用 Python 做中文舆情监控后端，覆盖抖音、微博、小红书的采集、清洗、入库和情感分析。',
          '用 UA 轮转、动态代理和浏览器指纹把采集成功率拉上来，日均万级评论落到 MySQL 分表。',
          '接上自研情感模块（LangChain + FAISS），做极性判断，并抽出方面词 / 观点词四元组。',
        ],
        href: '/posts/resume-04-tocc/',
        hrefLabel: '阅读复盘',
      },
    ],
    projectsTitle: '项目经历',
    projectsNote: '默认只放结果和职责，需要细节时再展开。',
    detailsLabel: '细节',
    projects: [
      {
        name: 'Scion · 并行 Coding Agent 编排服务',
        role: '独立开发 / Agent 开发',
        time: '2026.09 – 至今',
        stack: 'Python · asyncio · FastAPI · WebSocket · Git',
        points: [
          '用 Python 设计并实现并行 Coding Agent 编排，同一仓库可同时跑 Cursor、Claude Code、Codex 等 CLI Agent。',
          '每个 agent 独占 worktree 和分支；最多 6 路对照创建基线做并排 diff，胜出分支可以一键合回。',
          '主仓库有未提交改动，或合并出现冲突，就中止，不留半成品。',
        ],
        details: [
          '解析 stream-json，经 WebSocket 推送，断线后可以回放。运行中用 stdin 追问，结束后用已捕获的 session id 在同一 worktree 恢复。另有 CLI（run / attach / compare / merge）和令牌鉴权的 Web 控制台。',
        ],
        href: 'https://github.com/kun041011/Scion',
        hrefLabel: '查看仓库',
      },
      {
        name: '智能情感分析系统',
        role: '项目负责人 / Python 开发',
        time: '2025.03 – 2025.05',
        stack: 'LangChain · LLM · FAISS · Agent · RAG · FastAPI',
        points: [
          '用 Python 和 LangChain 做 ABSA 细粒度分析，Pydantic 把输出收成稳定 JSON，抽出方面词 / 观点词四元组。',
          'FAISS + RAG 做检索增强，Agent 按问题类型路由，服务用 FastAPI 对外。',
          '响应低于 200ms；相对纯 LLM，RAG 把新评论分析准确率提高了 22%。',
        ],
        details: [
          '后来接到实习的舆情监控里，承接日均万级评论。',
        ],
        href: '/posts/resume-03-sentiment/',
        hrefLabel: '阅读复盘',
      },
      {
        name: '慧眼 · 工业产品缺陷智能检测平台',
        role: '项目主导 / Python 开发',
        time: '2024.01 – 2024.07',
        stack: 'Python · PyQt5 · PyTorch · PyTorch-Lightning · PaDiM · FastFlow · STFPM',
        points: [
          '用 Python 做成面向产线的缺陷检测平台，集成 PaDiM、FastFlow、STFPM，支持实时检测和本地推理。',
          '用 PyTorch-Lightning 把训练、验证、推理收成同一条流程，PyQt5 负责可视化操作。',
          '误报率低于 0.5%，图像级平均 AUC 0.907，像素级 AUC 0.967，全流程操作时间缩短约 60%。',
        ],
        details: [
          '产线缺陷样本少，所以走无监督。预处理和模型对比会直接给出图像级、像素级 AUC。项目获第十七届中国大学生计算机设计大赛国家二等奖。',
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
        label: 'Python',
        text: 'asyncio、FastAPI、Flask、WebSocket、Pydantic',
      },
      {
        label: 'Agent',
        text: 'git worktree、LangChain、RAG、FAISS、Prompt、Agent 路由；Cursor、Claude Code、Codex CLI',
      },
      {
        label: '数据与中间件',
        text: 'MySQL、ClickHouse、HBase、Redis、RabbitMQ、Docker、Nginx',
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
    role: 'Python Developer / Agent Developer',
    summary:
      'Python developer, focused on agents. asyncio, FastAPI, and git worktrees run several CLI agents in parallel, then compare and merge their branches. Sentiment analysis, public-opinion collection, and a hundred-million-scale transportation platform were the same kind of Python service work.',
    contacts: [
      { label: 'Email', ...contacts.email },
      { label: 'Phone', ...contacts.phone },
      { label: 'GitHub', ...contacts.github },
      { label: 'Blog', ...contacts.blog },
    ],
    strengthsTitle: 'Core Strengths',
    strengths: [
      {
        title: 'Python',
        text: 'asyncio, FastAPI, Flask, Pydantic, services and APIs.',
      },
      {
        title: 'Agent development',
        text: 'git worktree, parallel CLI agents, branch compare and merge, routing by question type.',
      },
      {
        title: 'Backend services',
        text: 'RabbitMQ ingest, ClickHouse queries, WebSocket streaming.',
      },
      {
        title: 'Data pipelines',
        text: 'Multi-platform collection, cleaning, MySQL sharding, standardized APIs.',
      },
    ],
    experienceTitle: 'Experience',
    jobs: [
      {
        org: '吉林省卡思特科技有限公司',
        role: 'Transportation Data Platform · Python Developer',
        time: '2025.11 – 2026.02',
        stack: 'Python · FastAPI · ClickHouse · RabbitMQ',
        points: [
          'Built the Python backend for a hundred-million-scale transportation platform, folding provincial, taxi, and ride-hailing sources into one ingest, governance, and delivery path.',
          'Vehicle locations and operating transactions went through RabbitMQ, tens of millions of messages a day. Million-scale vehicle and driver records synced in paged batches.',
          'Core data lives in ClickHouse. Partition keys and sort indexes cut complex query time by about 40%. FastAPI exposed the APIs.',
        ],
        href: '/posts/resume-05-data-midplatform/',
        hrefLabel: 'Write-up (Chinese)',
      },
      {
        org: '吉林省卡思特科技有限公司',
        role: 'TOCC Public-Opinion System · Python Developer',
        time: '2025.08 – 2025.10',
        stack: 'Python · Flask · DrissionPage · MySQL',
        points: [
          'Built the Python backend for Chinese public-opinion monitoring across Douyin, Weibo, and Xiaohongshu: collection, cleaning, storage, and sentiment.',
          'UA rotation, rotating proxies, and browser fingerprints raised collection success. About ten thousand comments a day landed in sharded MySQL.',
          'Plugged in an in-house LangChain + FAISS module for polarity and aspect/opinion quadruples.',
        ],
        href: '/posts/resume-04-tocc/',
        hrefLabel: 'Write-up (Chinese)',
      },
    ],
    projectsTitle: 'Projects',
    projectsNote: 'Outcomes and ownership stay visible. Open a project when the mechanism matters.',
    detailsLabel: 'Details',
    projects: [
      {
        name: 'Scion · Parallel Coding-Agent Orchestrator',
        role: 'Independent / Agent development',
        time: '2026.09 – Present',
        stack: 'Python · asyncio · FastAPI · WebSocket · Git',
        points: [
          'Designed the parallel coding-agent orchestrator in Python. Cursor, Claude Code, Codex, and other CLI agents can run against one repository at the same time.',
          'Each agent gets its own worktree and branch. Up to six branches compare against the creation baseline, and the winner merges back in one step.',
          'A dirty main checkout or a merge conflict aborts the merge, so nothing half-applied is left behind.',
        ],
        details: [
          'stream-json is parsed and pushed over WebSocket, then replayed after a disconnect. Follow-ups go to stdin while an agent is running. The captured session id resumes work in the same worktree. A CLI (run / attach / compare / merge) and a token-protected web console ship with it.',
        ],
        href: 'https://github.com/kun041011/Scion',
        hrefLabel: 'Repository',
      },
      {
        name: 'Aspect-Level Sentiment System',
        role: 'Project lead / Python development',
        time: '2025.03 – 2025.05',
        stack: 'LangChain · LLM · FAISS · Agent · RAG · FastAPI',
        points: [
          'Built aspect-level sentiment analysis in Python with LangChain. Pydantic kept the JSON stable and extracted aspect/opinion quadruples.',
          'FAISS and RAG handled retrieval, an agent routed by question type, and FastAPI served it.',
          'Responses stayed under 200ms. Against the LLM alone, RAG raised accuracy on new comments by 22%.',
        ],
        details: [
          'The same module later fed the internship public-opinion monitor, about ten thousand comments a day.',
        ],
        href: '/posts/resume-03-sentiment/',
        hrefLabel: 'Write-up (Chinese)',
      },
      {
        name: 'Huiyan · Industrial Defect Detection Platform',
        role: 'Project lead / Python development',
        time: '2024.01 – 2024.07',
        stack: 'Python · PyQt5 · PyTorch · PyTorch-Lightning · PaDiM · FastFlow · STFPM',
        points: [
          'Built a Python line-side defect detector around PaDiM, FastFlow, and STFPM, with live inspection and local inference.',
          'PyTorch-Lightning kept training, validation, and inference on one path. PyQt5 was the operator-facing UI.',
          'False positives stayed under 0.5%. Mean image-level AUC was 0.907, pixel-level AUC 0.967, and end-to-end time dropped by about 60%.',
        ],
        details: [
          'Defect samples on a production line are scarce, so the models are unsupervised. Preprocessing and model comparison emit image-level and pixel-level AUC directly. The project won a national second prize at the 17th China Collegiate Computing Design Contest.',
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
        label: 'Python',
        text: 'asyncio, FastAPI, Flask, WebSocket, Pydantic',
      },
      {
        label: 'Agent',
        text: 'git worktree, LangChain, RAG, FAISS, prompting, agent routing; Cursor, Claude Code, Codex CLI',
      },
      {
        label: 'Data and middleware',
        text: 'MySQL, ClickHouse, HBase, Redis, RabbitMQ, Docker, Nginx',
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
