# 快速上手

<!--
[![](https://api.travis-ci.org/uiw-react/uiw.svg?branch=master)](https://travis-ci.org/uiw-react/uiw/builds) [![](https://img.shields.io/github/issues/uiw-react/uiw.svg)](https://github.com/uiw-react/uiw/issues) [![](https://img.shields.io/github/forks/uiw-react/uiw.svg)](https://github.com/uiw-react/uiw/network) [![](https://img.shields.io/github/stars/uiw-react/uiw.svg)](https://github.com/uiw-react/uiw/stargazers) [![](https://img.shields.io/github/release/uiw-react/uiw.svg)](https://github.com/uiw-react/uiw/releases) [![Packagist](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/uiw-react/uiw) [![Packagist](https://img.shields.io/npm/v/uiw.svg)](https://www.npmjs.com/package/uiw) [![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest) -->

## 安装

```bash
# 先要把npm下载仓库set成公司的私有npm,假如你安装了cnpm,你就可以设置cnpm
cnpm  config  set  registry  http://172.16.68.115:7001/

cnpm install @tzfe/tz-react-design --save


# 指定版本
npm i -S @tzfe/tz-react-design@v1.0.0


> ps: **通过 GitHub 仓库安装**的 win 用户请在 `Git Bash` 下执行，因为需要用到 git。
```

## 使用

```js
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@tzfe/tz-react-design";

ReactDOM.render(
  <Button type="primary">Hello</Button>,
  document.getElementById("app")
);
```

## 组件冲突

重新取一个名字

```js
import { Button as ButtonView } from "@tzfe/tz-react-design";
```

## 按需加载组件

```diff
- import { Alert } from '@tzfe/tz-react-design';
+ import { Alert } from '@tzfe/tz-react-design/lib/alert';
```

## 开发

要开发，运行自重新构建，获取代码：

```bash
$ git clone http://git.tanzk.cn/frontend/teaching/tz-react-design.git
$ cd uiw
$ npm install
```

要开发，运行自重新构建：

```bash
# Run the app
# Restart the app automatically every time code changes.
# Useful during development.
$ npm start
```

打开浏览器并访问：http://127.0.0.1:2087

更新文档

```bash
npm run deploy
```

## 文件目录说明

```bash
├── dist           # 生成的文档静态文件目录
├── docs           # 文档的源文件
├── lib
├── package.json
├── script
└── src            # React组件在此
```

## License

Licensed under the MIT License.
