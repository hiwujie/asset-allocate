# 投资组合分析 📈

一个基于历史数据的投资组合表现可视化工具，帮助用户了解多元化投资组合的长期表现。

## 📊 项目介绍

本项目展示了一个包含股票、国债、现金和黄金四种资产的投资组合表现，将其制作成直观的趋势图和详细的数据列表，方便用户：

- 📈 **投资组合走势可视化** - 多资产价值趋势图对比
- 📋 **详细数据展示** - 月度收益率、年化收益率、年初至今收益率等关键指标
- 🎯 **多资产对比** - 支持同时选择多个资产进行对比
- 💰 **投资回报分析** - 基于$10,000初始投资的长期表现追踪

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design
- **图表库**: Ant Design Charts
- **样式**: Tailwind CSS
- **日期处理**: Day.js

## 💼 投资组合配置

- **起始投资**: $10,000
- **起始日期**: 2000年1月
- **资产配置**: 
  - 股票: 25% ($2,500)
  - 国债: 25% ($2,500)
  - 现金: 25% ($2,500)
  - 黄金: 25% ($2,500)

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

启动后，在浏览器中打开 [http://localhost:5173](http://localhost:5173) 即可查看项目。

### 构建生产版本

```bash
yarn build
```

构建完成后，生产文件将生成在 `dist` 目录中。

### 预览生产版本

```bash
yarn preview
```

## 📁 项目结构

```
portfolio-analysis/
├── public/                 # 静态资源
├── src/
│   ├── Components/         # 通用组件
│   ├── Pages/             # 页面组件
│   │   └── Home/          # 首页
│   │       ├── data/      # CSV 数据文件
│   │       ├── index.tsx  # 首页组件
│   │       └── utils.ts   # 数据处理工具
│   ├── App.tsx            # 应用入口
│   └── main.tsx           # 主入口文件
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明
```

## 📊 数据说明

### 数据格式

- **数据源**: 历史ETF价格数据
- **数据格式**: CSV 文件，文件名格式为 `YYYYMM.csv`
- **基准时间**: 2000年1月（设定每种资产初始投资为$2,500）

### 数据字段

- **月度收益率**: 当月相对于上月的收益率变化
- **年化收益率**: 年化后的收益率
- **年初至今收益率**: 从年初到当前月份的累计收益率
- **当前价值**: 基于月度收益率计算的实际投资价值

## 🎨 功能特性

- ✅ **多资产选择** - 支持同时选择多个资产类别
- ✅ **趋势图对比** - 直观显示投资组合价值变化
- ✅ **数据表格** - 详细展示各项收益率指标
- ✅ **实时数据** - 基于最新市场数据更新

## 🤝 贡献指南

欢迎所有形式的贡献！无论是报告 bug、提出新功能建议，还是提交代码改进，都非常欢迎。

### 如何贡献

1. **Fork 本仓库**

   ```bash
   git clone https://github.com/your-username/portfolio-analysis.git
   cd portfolio-analysis
   ```

2. **创建功能分支**

   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **提交你的更改**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **推送到分支**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**
   - 访问 [GitHub Pull Requests](https://github.com/your-username/portfolio-analysis/pulls)
   - 点击 "New Pull Request"
   - 选择你的功能分支
   - 填写详细的描述信息

### 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 开发指南

1. **代码风格**: 使用 Prettier 和 ESLint 保持代码风格一致
2. **类型安全**: 使用 TypeScript 确保类型安全
3. **组件设计**: 遵循 React 最佳实践
4. **测试**: 建议为新功能添加测试用例

## 📄 许可证

本项目采用 [Apache 2.0 许可证](LICENSE)。

## ⭐ 支持项目

如果这个项目对你有帮助，请给我们一个 ⭐ Star！

## 📞 联系我们

- 项目地址: [GitHub Repository](https://github.com/your-username/portfolio-analysis)
- 问题反馈: [Issues](https://github.com/your-username/portfolio-analysis/issues)
- 功能建议: [Discussions](https://github.com/your-username/portfolio-analysis/discussions)

---

**投资组合分析** - 让投资数据更透明，让投资决策更明智 📈✨

**免责声明**: 本工具仅供教育和研究目的，不构成投资建议。投资有风险，入市需谨慎。