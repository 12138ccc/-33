const pxToRem = require('postcss-pxTorem')
module.exports = {
  plugins: [
    pxToRem({
      // 根节点字体大小
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] // 所有的属性都转成rem
    })
  ]
}
