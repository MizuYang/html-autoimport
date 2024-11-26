const page1 = {
  img: {
    'page1-img-1': {
      src: '../images/img-1.jpg',
      title: 'page1 正式title-1',
      alt: 'page1 正式圖片的描述-1',
      "aria-hidden": 'true',
    },
    'page1-img-2': {
      src: '../images/img-2.jpg',
      title: 'page1 正式title-1',
      alt: 'page1 正式圖片的描述-2'
    },
  },
  text: {
    'page1-text-1': {
      title: 'page1 正式title-1',
      "aria-hidden": 'true',
      content: 'page1 正式文案文字內容1', // 這個不是屬性，這是 <p> 的內容
    }, 
    'page1-text-2': {
      title: 'page1 正式title-2',
      "aria-hidden": 'false',
      content: 'page1 正式文案文字內容2', // 這個不是屬性，這是 <p> 的內容
    }, 
    // 'page1-text-1': 'page1 正式文案文字內容1',
    // 'page1-text-2': 'page1 正式文案文字內容2'
  }
}

module.exports = page1;