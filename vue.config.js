const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false,
    },
    proxy: {
      "/": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/": "",
        },
      },
    },
  },
});
