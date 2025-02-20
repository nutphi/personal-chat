import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            outputPath: 'dist/personal-chat',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: ['zone.js'],
            tsConfig: 'tsconfig.app.json',
            inlineStyleLanguage: 'scss',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['src/styles.scss'],
            scripts: [],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true,
          },
        },
      },
    },
    specPattern: '**/*.cy.ts',
  },
});
