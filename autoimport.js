const page1 = require('./autoimportModules/page1.js');
const page2 = require('./autoimportModules/page2.js');

const autoImport = {
  img: {
    ...page1.img,
    ...page2.img,
  },
  text: {
    ...page1.text,
    ...page2.text,
  }
};

module.exports = autoImport;
