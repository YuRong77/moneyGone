module.exports = {
  publicPath: "./",
  pwa: {
    iconPaths: {
      favicon32: "./icon.png",
    },
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
};
