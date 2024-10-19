import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { UnifiedWebpackPluginV5 as WeappTailwindcssWebpackPlugin } from 'weapp-tailwindcss/webpack';
import Webpack from 'webpack';
import devConfig from './dev';
import prodConfig from './prod';

export default defineConfig(async (merge) => {
  const baseConfig: UserConfigExport = {
    projectName: 'heathen-miniprogram',
    // 使用 tailwind 时不可再依赖 taro 的单位转换，需要另外使用类似 postcss-pxtransform 的转换，但没必要，规范使用rpx就好
    // designWidth: 375,
    // deviceRatio: {
    //   640: 2.34 / 2,
    //   750: 1,
    //   375: 2 / 1,
    //   828: 1.81 / 2,
    // },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
        force: true,
      },
    },
    cache: {
      enable: false,
    },
    mini: {
      optimizeMainPackage: {
        enable: true,
      },
      postcss: {
        'postcss-import': {},
        'tailwindcss/nesting': 'postcss-nesting',
        tailwindcss: {},
        autoprefixer: {},
        url: {
          enable: true,
          config: {
            limit: 1024, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      compile: {
        include: [path.resolve(__dirname, '../../../packages')],
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(new TsconfigPathsPlugin({}));
        // taroify lodash处理，避免引入整个lodash
        chain.plugin('tree-shaking-lodash').use(Webpack.NormalModuleReplacementPlugin, [/^lodash$/, 'lodash-es']);

        chain.merge({
          plugin: {
            install: {
              plugin: WeappTailwindcssWebpackPlugin,
              args: [
                {
                  appType: 'taro',
                },
              ],
            },
          },
        });
      },
    },
  };

  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
