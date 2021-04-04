# 学习笔记

## yemoan

```
npm init
npm install yeoman-generator
```

项目名称修改，需要以`generator-`开头

```json
{
  "name": "generator-name",
  "version": "0.1.0",
  "description": "",
  "files": [
    "generators"
  ],
  "keywords": ["yeoman-generator"],
  "dependencies": {
    "yeoman-generator": "^1.0.0"
  }
}
```

文件目录

```
├───package.json
└───generators/
    ├───app/
    │   └───index.js
    └───router/
        └───index.js
```

index.js

```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  // 获取用户反馈
  async prompting() {
    const answers = await this.prompt([  // 异步方法
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ]);

    // 使用用户反馈的结果
    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
    this.answers = answers;
  }

  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

    // 安装依赖
    this.yarnInstall(['lodash'], { 'dev': true });
  }

  tmp() {
    // 拷贝文件
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.title } // user answer `title` used
    );
  },

  method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  }
};

```

将全局模块链接到该文件目录

```
npm link
```


## webpack

```
npx webpack
```

## babel

```
npm install @babel/core @babel/cli
```

```
npm install @babel/preset-env
```

```
babel sample.js >1.txt
```


https://yeoman.io/authoring/index.html

https://webpack.js.org/plugins/copy-webpack-plugin/#root

https://vue-loader.vuejs.org/guide/