const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  pwa: {
    iconPaths: {
      favicon32: "./icon.png",
    },
  },
  configureWebpack: {
    plugins: [
      //移除'zh-tw'以外的檔案，'en'為預設 無法移除
      new MomentLocalesPlugin({
        localesToKeep: ["zh-tw"],
      }),
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  chainWebpack: (config) => {
    // 壓縮圖片
    config.module
      .rule("images")
      .test(/\.(png|jpg|jpeg|gif)$/i)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        // jpeg
        mozjpeg: { progressive: true, quality: 30 },
        // png
        optipng: { enabled: false },
        // png
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        // jpg & png into webp
        webp: { quality: 75 },
      })
      .end();
  },
};
