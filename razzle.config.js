// const autoprefixer = require('autoprefixer');

// const cssLoader = (loader) => {
//   const config = [
//       // модуль позваляет выносить css в отдельный файл
//       isProd? 'style-loader' : MiniCssExtractPlugin.loader,
//       {
//           loader: 'css-loader',
//           options: {
//             sourceMap: true,
//           },
//       },
//   ]

//   !!loader? config.push(
//       {
//           loader: loader,
//           options: {
//             sourceMap: true,
//           },
//       }) : null
//   return config;
// }

// module.exports = {
//   dev: {
//     sourceMap: true,
//     ident: 'postcss',
//   },
//   prod: {
//     sourceMap: false,
//     ident: 'postcss',
//   },
//   plugins: [
//     {
//         name: 'scss',
//         options: {
//           postcss: {
//             dev: {
//               sourceMap: false,
//             },
//           },
//         },
//       },
//     autoprefixer({
//       browsers: ['>15%', 'last 10 versions', 'Firefox ESR', 'not ie < 9'],
//       flexbox: 'no-2009',
//     }),
//   // 'scss'
// ], // первый вариант краткий
//   //   plugins: [            // второй вариант развёрнутый
//   //   {
//   //     name: 'scss',
//   //     options: {
//   //       postcss: {
//   //         dev: {
//   //           sourceMap: false,
//   //         },
//   //       },
//   //     },
//   //   },
//   // ],
//   // module:{
//   //   rules:[
//   //       // css-loader - помагает webpack понимать импорты css в js
//   //       // style-loader - добавляет css в секцию head файла html
//   //       // file-loader плагин для подключения изображений к js, html, css
//   //       // {
//   //       //     test: /\.css$/,
//   //       //     use: cssLoader()
//   //       // },
//   //       {
//   //           test: /\.s[ac]ss$/,
//   //           use: ('sass-loader')
//   //       },
//   //   ]
//   // },
//     modify: (config, { target, dev }, webpack) => {
      
//       console.log(dev)
//       return config;
//     },
//   };


module.exports = {
  plugins: [
    {
      name: 'scss',
      options: {
        postcss: {
          dev: {
            sourceMap: true,
          },
        },
      },
    },
  ],
  performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
  },

};