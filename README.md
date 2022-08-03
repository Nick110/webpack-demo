# 山寨网易云

## tree-shaking
webpack会在production下默认开启`tree-shaking`，打包时把无用的代码摇掉，以优化打包结果。
通过在`package.json`中配置`sideEffects`以配置`tree-shaking`的作用范围，不配置的话，默认应该是有一套自己的规则。

[简单说说 tree-shaking 有啥鸟用吧！](https://juejin.cn/post/7062180864968359943)
```JavaScript
// package.json

// 所有文件都有副作用，全都不可 tree-shaking
{
  "sideEffects": true
}
// 没有文件有副作用，全都可以 tree-shaking
{
  "sideEffects": false
}
// 只有这些文件有副作用，
// 所有其他文件都可以 tree-shaking，
// 但会保留这些文件
{
  "sideEffects": [
    "./src/file1.js",
    "./src/file2.js"
  ]
}

```