const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口檔案
  output: {
    filename: 'bundle.js', // 輸出檔案名稱
    path: path.resolve(__dirname, 'dist'), // 輸出目錄
  },
  mode: 'production', // 設定模式為生產模式
};
