# 文案替換工具

## 開發背景

此工具的開發源於公司與 XXX 單位合作的 XXX 專案。  
由於在頒獎後才能確定得獎者與新聞稿的正式內容，開發階段只能使用假資料作為佔位。  
然而，當正式資料下來時，我們需要在多個頁面、元件中逐一替換假資料，這不僅耗時，還容易因內容錯誤或漏貼而導致問題。

原本考慮將文案與圖片路徑集中管理於各頁面的文案 JavaScript 檔案中，這樣開發者只需修改文案檔案即可同步更新頁面內容。然而，使用 JavaScript 在客戶端動態替換文案，會導致文案無法被搜尋引擎爬蟲正確讀取，進而影響 SEO 表現。

為了解決上述問題，我們開發了這個文案替換工具。

---

## 解決方案

我們的工具採用了以下方法：

1. **集中管理文案與圖片**  
   將需要更改的文案與圖片資訊統一存放在文案 JavaScript 檔案中，並使用結構清晰的物件進行管理。  
   - 圖片資訊放置於 `img` 屬性中，文字資訊放置於 `text` 屬性中。
   - 以識別名稱（如 `圖片名稱A` 或 `名稱文字A`）作為唯一標識，便於頁面對應。

   示例：
   ```javascript
   export const content = {
     img: {
       '圖片名稱A': {
         src: '../images/img-1.jpg',
         title: 'page1 正式title-1',
         alt: 'page1 正式圖片的描述-1',
         "aria-hidden": 'true',
       },
       // 更多圖片...
     },
     text: {
       '名稱文字A': 'page1 正式文案文字內容1',
       // 更多文字...
     },
   };

2. 對應 HTML 標籤與文案識別名稱
在 HTML 標籤中加入 data-autoimport-* 屬性，對應文案的識別名稱，例如：

```
<img data-autoimport-img="圖片名稱A" src="../images/開發時的測試圖片.png">
<p data-autoimport-text="名稱文字A" class="text-center" title="文字title">開發時的假文字</p>
```

3. 使用 Node.js 替換內容
透過 Node.js 腳本解析文案 JavaScript 檔案的內容，依據 data-autoimport-* 屬性對應的識別名稱，將內容插入到相應的 HTML 標籤中，並保有該元素本身的所有屬性內容，完成文案與圖片的替換。


## 使用說明

1. 安裝依賴
在專案根目錄執行以下指令以安裝所需依賴：
```
npm install
```

2. 設定文案檔案
在 頁面.js 檔案中新增需要替換的文案與圖片資訊。結構如下：

```
const content = {
  img: {
    '圖片名稱A': {
      src: '../images/img-1.jpg',
      title: '正式圖片標題',
      alt: '正式圖片描述',
      (可擴充其他屬性...)
    },
  },
  text: {
    '名稱文字A': '正式文字內容',
  },
};

module.exports = page1;
```

3. 編輯 HTML 文件
在 HTML 文件中，為需要替換的元素新增對應的 data-autoimport-* 屬性，對應文案的識別名稱，例如：
```
<img data-autoimport-img="圖片名稱A" src="../images/placeholder.png">
<p data-autoimport-text="名稱文字A">這是占位文字</p>

```

4. 執行文案替換
在專案根目錄執行以下指令：
```
npm run build
```

此腳本會自動解析 pages/* 文案檔案，並將正式內容插入對應的 HTML 文件中。
替換後的檔案將生成到 dist/ 資料夾，包含以下目錄結構：

- pages/
- images/
- js/
- style/

若有其他希望自動加入到 dist/ 的資料夾或檔案，請自行到 build.js 將資料夾名稱新增到 directoriesToCopy 變數中。

5. 檢查輸出結果
替換完成後，檢查生成的 HTML 文件，確認文案與圖片是否正確替換。


## 注意事項

開發與正式環境的區分
建議在開發時使用占位內容進行調試，僅在正式發佈前執行替換腳本。

識別名稱唯一性
識別名稱需保持唯一，避免覆蓋錯誤的內容。