基于 webpack 的开发多页面项目的脚手架，支持：

* 代码热替换
* ES2015

## 使用

```shell
git clone git@github.com:fe-config/generate-pages.git 
cd generate-pages
npm install
```

* 开发：`npm run dev`
* 上线：`npm run build`

## 结构

```
|--- pages // 页面文件
|       |--- tpl // 页面模板
|       |       |--- page1.html
|       |       |--- page2.html
|       |--- views // 添加css、js后的页面模板
|               |--- page1.html
|               |--- page2.html
|--- src // 页面css、js
|       |--- common // 公共模块
|       |       |--- index.js
|       |--- page1
|       |       |--- main.js
|       |       |--- style.css
|       |--- page2
|               |--- main.js
|               |--- style.css
|--- map.js // 页面对应js模块映射
|--- .babelrc // babel 配置文件
|--- webpack.config.js // webpack 配置文件
```

## 配置

修改 `map.js`:

```js
var path = require('path')
var ROOT = path.resolve(__dirname)

module.exports = {
    'page1/main': { // 模块名
        "src": ROOT + "/src/page1/main", // 对应页面主模块
        "tpl": "page1" // 对应模板名
    },
    'page2/main': {
        "src": ROOT + '/src/page2/main',
        "tpl": "page2"
    }
}
```

`page1/main`: `page1/main` 对应一个页面，模板对应 `pages/tpl/page1.html`，js 模块对应 `src/page1/main.js`。

在 `src/page1/main.js` 中：

```js
// 为了支持修改模板文件文件时页面自动刷新
if(ENV == 'DEV') {
    require('pages/views/page1.html')
}
[使用ProvidePlugin](./src/page3/main.js)
import style from './style.css' // 引入css
import common from 'src/common' // 引入common模块
```

## 示例

* [使用externals](./src/page1/main.js)
* [使用公共模块](./src/page2/main.js)
* [使用ProvidePlugin](./src/page3/main.js)
* [使用webpack-dev-server的代理](./src/page4/main.js)

## tips

这个项目只搭建了最基本的项目需求，肯定不能保证满足所有项目，你可能需要修改：

* 本项目默认安装 `jquery`，如果不需要，请在 `pageage.json` 和 `webpack.config.js` 中删除
* `resolve`
    * 设置 `alias` 不会让你的目录出现 `../../src/page1/main.js` 这样难以识别的目录层级
* `externals` 可以让你正常使用全局 `script` 
* `output` 
    * `filename` 设置为 `[name].[md5].js` 可能是你想要的
    * `publicPath` 如果你的 js、css 需要放在 CDN 上，就要修改这个选项了
* 如果你要使用 less / sass / postcss ，需要自己安装对应的 loader
* 没有安装 url-loader / file-loader

> Have fun in webpack !
