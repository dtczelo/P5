const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./server.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  node: {
      fs: "empty"
  }
};