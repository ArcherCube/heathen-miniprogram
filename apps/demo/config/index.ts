import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { UnifiedWebpackPluginV5 as WeappTailwindcssWebpackPlugin } from 'weapp-tailwindcss/webpack';
import Webpack from 'webpack';
import { environmentCheck } from './environment-check';

export default defineConfig(async (merge, env) => {
  environmentCheck(env);

  const baseConfig: UserConfigExport = {
    projectName: 'heathen-miniprogram',
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@heathenjs/taro-router-plugin'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
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
        pxtransform: {
          enable: true,
          config: {
            designWidth: 750,
            deviceRatio: {
              640: 2.34 / 2,
              750: 1,
              375: 2 / 1,
              828: 1.81 / 2,
            },
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
        chain.plugin('tree-shaking-lodash').use(Webpack.NormalModuleReplacementPlugin, [/^lodash$/, 'lodash-es']);
        chain.plugin('weapp-tailwindcss').use(WeappTailwindcssWebpackPlugin, [{ appType: 'taro' }]);
        chain.module
          .rule('svg')
          .test(/\.svg(\?.*)?$/)
          .use('raw-loader')
          .loader('raw-loader')
          .end();
      },
    },
  };

  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, {
      logger: {
        quiet: false,
        stats: true,
      },
      mini: {
        sourceMapType: 'cheap-module-source-map',
      },
    });
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, {
    mini: {
      sourceMapType: 'nosources-source-map',
    },
  });
});
