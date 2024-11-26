const page2 = {
  img: {
    'page2-img-1': {
      src: '../images/img-1.jpg',
      title: 'page2 正式title-1',
      alt: 'page2 正式圖片的描述-1',
      "aria-hidden": 'true',
    },
    'page2-img-2': {
      src: '../images/img-2.jpg',
      title: 'page2 正式title-1',
      alt: 'page2 正式圖片的描述-2'
    },
  },
  text: {
    'page2-text-1': {
      title: 'page2 正式title-1',
      "aria-hidden": 'true',
      content: 'page2 正式文案文字內容1', // 這個不是屬性，這是 <p> 的內容
    }, 
    'page2-text-2': {
      title: 'page2 正式title-2',
      "aria-hidden": 'false',
      content: 'page2 正式文案文字內容2', // 這個不是屬性，這是 <p> 的內容
    }, 
    // 'page2-text-1': 'page2 正式文案文字內容1',
    // 'page2-text-2': 'page2 正式文案文字內容2'
  }
}

module.exports = page2;
