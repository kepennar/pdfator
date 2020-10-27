module.exports = {
  devServer: {
    proxy: {
      "/pdfator": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
