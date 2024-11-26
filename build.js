// build.js
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fse = require('fs-extra'); // 引入 fs-extra
const autoImport = require('./autoimport'); // 引入更新後的 autoimport.js

// 處理元素的通用函式
const processElement = (element, dataAttr, autoImportData, tagName, $) => {
  const value = autoImportData[dataAttr];
  if (value) {
    const originalAttributes = $(element).attr(); // 獲取所有屬性
    delete originalAttributes[`data-autoimport-${tagName}`]; // 刪除不需要的屬性

    const newTag = `<${tagName} ${Object.entries(originalAttributes).map(([key, value]) => `${key}="${value}"`).join(' ')}>${value}</${tagName}>`;
    return newTag;
  }
  return null; // 如果沒有對應的值，返回 null
};

const processFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content);

  // 處理圖片
  $('[data-autoimport-img]').each((index, element) => {
    const dataAttr = $(element).attr('data-autoimport-img');
    const imgData = autoImport.img[dataAttr]; // 獲取圖片資料

    if (imgData) {
      const originalAttributes = $(element).attr(); // 獲取所有屬性

      // 構建新的 img 標籤，僅添加提供的屬性
      const newImgTag = `<img ${Object.entries(imgData).map(([key, value]) => value ? `${key}="${value}"` : '').filter(attr => attr).join(' ')} ${Object.entries(originalAttributes).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
      $(element).replaceWith(newImgTag);
    }
  });

  // 處理文字
  $('[data-autoimport-text]').each((index, element) => {
    const dataAttr = $(element).attr('data-autoimport-text');
    const textData = autoImport.text[dataAttr];
  
    if (textData) {
      // 保留原本的屬性
      const originalAttributes = $(element).get(0).attributes;
      const newElement = $('<p></p>'); // 創建新的 <p> 元素
  
      // 將原本的屬性複製到新的元素上
      for (let i = 0; i < originalAttributes.length; i++) {
        const attrName = originalAttributes[i].name;
        const attrValue = originalAttributes[i].value;
        newElement.attr(attrName, attrValue);
      }
  
      // 設定新的屬性
      if (textData.title) {
        newElement.attr('title', textData.title);
      }
      if (textData['aria-hidden']) {
        newElement.attr('aria-hidden', textData['aria-hidden']);
      }
  
      // 設定內容
      newElement.text(textData.content);
  
      // 替換原本的元素
      $(element).replaceWith(newElement);
    }
  });
  


  // 處理文字
  // $('[data-autoimport-text]').each((index, element) => {
  //   const dataAttr = $(element).attr('data-autoimport-text');
  //   const newTextTag = processElement(element, dataAttr, autoImport.text, 'p', $);
  //   if (newTextTag) {
  //     $(element).replaceWith(newTextTag);
  //   }
  // });

  return $.html();
};

const copyDirectory = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true }); // 確保目錄存在
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath); // 遞迴複製子目錄
    } else {
      fs.copyFileSync(srcPath, destPath); // 複製檔案
    }
  }
};

const build = () => {
  const dirPath = 'pages'; // 指定要處理的目錄
  const outputDir = 'dist/pages'; // 輸出目錄

  // 刪除 dist 目錄
  if (fs.existsSync('dist')) {
    fse.removeSync('dist'); // 使用 fs-extra 刪除整個 dist 目錄
    console.log('Removed existing dist directory.');
  }

  // 檢查 pages 目錄是否存在
  if (!fs.existsSync(dirPath)) {
    console.error(`Error: The directory "${dirPath}" does not exist.`);
    return; // 結束執行
  }

  // 讀取 pages 目錄下的所有檔案
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

  // 確保輸出目錄存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }); // 使用 recursive 參數確保創建多層目錄
  }

  files.forEach(file => {
    const filePath = path.join(dirPath, file); // 獲取完整的檔案路徑
    const output = processFile(filePath);
    const outputFilePath = path.join(outputDir, file); // 獲取輸出檔案的完整路徑
    fs.writeFileSync(outputFilePath, output); // 寫入到 dist/pages 目錄
    console.log(`Processed ${file} -> ${outputFilePath}`);
  });

  // 複製 js、images 和 style 目錄到 dist
  const directoriesToCopy = ['js', 'images', 'style'];
  directoriesToCopy.forEach(dir => {
    const srcDir = path.join(__dirname, dir); // 專案目錄下的原始目錄
    const destDir = path.join('dist', dir); // 輸出目錄
    if (fs.existsSync(srcDir)) {
      copyDirectory(srcDir, destDir); // 複製目錄
      console.log(`Copied ${srcDir} to ${destDir}`);
    } else {
      console.warn(`Warning: The directory "${srcDir}" does not exist and will be skipped.`);
    }
  });
};

build();
