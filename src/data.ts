export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'ai-tester',
    title: 'AI 测试用例生成器',
    description: '基于 AI 的测试用例自动生成工具，支持需求分析、边界场景补全、人工审核和导出功能。显著提升了测试设计的效率和覆盖率。',
    tags: ['JavaScript', 'Gemini API', 'Web Components'],
    link: 'https://github.com/Camellia0422'
  },
  {
    id: 'tech-blog',
    title: '技术博客平台',
    description: '一个自建的高性能、支持 Markdown 的技术博客平台。采用响应式设计，适配多端阅读体验，并集成了 SEO 优化。',
    tags: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/Camellia0422'
  },
  {
    id: 'auto-test-lib',
    title: '自动化测试脚本库',
    description: '一系列用于 Web UI 自动化测试的复用脚本库，集成了常用的断言工具和报告生成插件，支持 CI/CD 集成。',
    tags: ['Playwright', 'Jest', 'CI/CD'],
    link: 'https://github.com/Camellia0422'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'why-ai-tester',
    title: '为什么我要做 AI 测试用例生成器',
    date: '2024-04-15',
    excerpt: '在日常的软件测试工作中，我发现编写测试用例是一个极其耗时且容易遗漏边缘情况的过程。为了解决这个问题，我决定利用 AI 的推理能力...',
    content: `
编写测试用例是软件测试生命周期中至关重要的一环，但也往往是最枯燥的。传统的测试设计依赖于测试工程师的经验和对业务的理解。然而，随着业务复杂度的增加，人工覆盖所有边界条件变得越来越困难。

### 痛点分析
1. **重复劳动**：许多基本场景（如为空检查、格式校验）在不同模块中重复出现。
2. **逻辑遗漏**：复杂的业务组合场景，人工很难穷举。
3. **维护成本高**：需求稍有变动，成百上千的用例需要手动更新。

### AI 的介入
通过集成 Gemini API，我的工具可以读取需求文档（PRD），自动识别核心功能点，并生成包含正常路径、边界路径和异常路径的测试矩阵。这不仅节省了 60% 以上的初稿编写时间，更重要的是，它能基于大语言模型的知识库，提醒我一些从未想过的特殊场景。

### 结论
AI 不会替代测试工程师，但掌握 AI 工具的测试工程师将会替代那些拒绝改变的人。
    `,
    readTime: '5 min',
    tags: ['AI', '测试设计', '自动化']
  },
  {
    id: 'vibe-coding',
    title: 'Vibe Coding：用自然语言开发软件的体验',
    date: '2024-03-20',
    excerpt: '最近 "Vibe Coding" 这个词在开发者社区非常流行。这种主要依靠自然语言描述需求，由 AI 辅助生成代码的开发模式，正在悄悄改变我们的工作流。',
    content: `
所谓的 Vibe Coding，本质上是把开发者从繁琐的语法和配置中解脱出来，将重心转移到系统设计和逻辑验证上。

### 这种模式的优势
- **原型开发极快**：只要你能描述清楚，代码就能在几秒钟内生成。
- **降低门槛**：让更多非专业人士能够尝试构建自己的小工具。

### 对测试的挑战
当代码生成变得如此廉价时，如何验证这些代码的正确性就成了核心矛盾。作为测试工程师，我发现我们的角色正在向“验证者”和“评审者”转变。
    `,
    readTime: '4 min',
    tags: ['开发文化', 'AI', '工作流']
  },
  {
    id: 'junior-portfolio',
    title: '软件测试新人如何打造作品集',
    date: '2024-02-10',
    excerpt: '作为一名正在寻找实习机会的准毕业生，如何让面试官在众多的简历中一眼看到你？一个扎实的技术作品集是关键。',
    content: `
对于面试官来说，一份包含真实项目、博客记录甚至自动化脚本仓库的作品集，其说服力远超简单的技能列表。

### 核心要素
1. **真实的项目**：不要只写课后作业，去解决一个真实存在的痛点。
2. **思考过程**：博客里要记录你是如何发现问题、定位问题并最终解决问题的。
3. **规范的代码**：结构清晰、有注释的代码能体现你的工程素养。
    `,
    readTime: '6 min',
    tags: ['职业发展', '新人指南']
  }
];
