const { getPackagesSync } = require("@manypkg/get-packages");

/** 允许的 commit 类型 */
const commitTypes = {
  feat: {
    name: "feat",
    desc: "新功能",
  },
  fix: {
    name: "fix",
    desc: "问题修复",
  },
  docs: {
    name: "docs",
    desc: "文档注释",
  },
  style: {
    name: "style",
    desc: "代码格式（不影响代码运行的变动）",
  },
  refactor: {
    name: "refactor",
    desc: "重构、优化（既不增加新功能，也不是修复bug）",
  },
  chore: {
    name: "chore",
    desc: "构建过程或辅助工具的变动",
  },
  perf: {
    name: "perf",
    desc: "性能优化",
  },
  test: {
    name: "test",
    desc: "增加测试",
  },
  revert: {
    name: "revert",
    desc: "回退",
  },
  build: {
    name: "build",
    desc: "打包",
  },
};
/** 最长的 commitType 的名字，方便后续生成 prompt 时不用重复计算 */
const maxCommitTypeLength = Math.max(
  ...Object.keys(commitTypes).map((type) => type.length),
);

/** 获取指定目录下所有 package.json 的 name */
function getAllPackageJsonNames(targetDir) {
  return getPackagesSync(targetDir)?.packages?.map((current) => {
    return current?.packageJson?.name;
  });
}
/** 允许的，scopes（为所有的子项目名） */
const scopes = getAllPackageJsonNames(__dirname);

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 详见：https://commitlint.js.org/reference/configuration.html#rules
  rules: {
    "type-enum": [2, "always", Object.keys(commitTypes)],
    // eslint 对 scopes 的规则设定中，多个 scopes 时分隔符内置为 [\/,] 三种，不可自定义，与子项目名冲突，故暂不开启此项校验
    // "scope-enum": [2, "always", scopes],
  },
  prompt: {
    alias: { fd: "docs: fix typos" },
    messages: {
      type: "请选择提交的类型：",
      scope: "请选择本次提交涉及的范围：",
      subject: "请输入本次提交的主题：",
      body: '请输入本次提交的详细描述（可使用 "|" 来分行）：',
      breaking: '请输入本次的破坏性改动（可使用 "|" 来分行）：',
      confirmCommit: "确定使用以上内容进行提交吗？",
    },
    skipQuestions: ["footerPrefix", "footer"],
    types: Object.values(commitTypes).map((item) => ({
      value: item.name,
      name: `${item.name}: ${" ".repeat(maxCommitTypeLength - item.name.length)}${item.desc}`,
    })),
    scopes,
    allowCustomScopes: false,
    allowEmptyScopes: true,
    enableMultipleScopes: true,
    emptyScopesAlias: "空",
    markBreakingChangeMode: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    confirmColorize: true,
  },
};
