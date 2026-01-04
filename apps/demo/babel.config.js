module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "react",
        ts: true,
        decoratorsLegacy: false,
        decoratorsBeforeExport: false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        version: '2023-11',
      },
    ],
  ],
};
