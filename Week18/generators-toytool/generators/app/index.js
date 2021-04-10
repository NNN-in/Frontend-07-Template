var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag
  }

  async initPackage() {
    let answer = await this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname, // Default to current folder name
    }])

    const pkgJson = {
      "name": answer.name,
      "version": "1.0.0",
      "description": "",
      "main": "generators/app/index.js",
      "scripts": {
        "build": "webpack",
        "test": "mocha --require @babel/register",
        "coverage": "nyc mocha --require @babel/register"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        
      },
      "dependencies": {

      }
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

    this.npmInstall(['vue', 'mocha', 'nyc'], { 'save-dev': false });

    this.npmInstall([
      'webpack', 'webpack-cli', 'copy-webpack-plugin',
      'vue-loader', 'vue-template-compiler', 'vue-style-loader', 'css-loader',
      "babel-loader",
      '@babel/core', '@babel/preset-env', '@babel/register', '@istanbuljs/nyc-config-babel', 'babel-plugin-istanbul'
    ], { 'save-dev': true });
 
    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answer.name }
    );

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
      {}
    );

    this.fs.copyTpl(
      this.templatePath('sample-test.js'),
      this.destinationPath('test/sample-test.js'),
      {}
    );
  }

  // async method1() {
  //   // const answers = await this.prompt([
  //   //   {
  //   //     type: 'input',
  //   //     name: 'name',
  //   //     message: 'Your project name',
  //   //     default: this.appname, // Default to current folder name
  //   //   },
  //   //   {
  //   //     type: 'confirm',
  //   //     name: 'cool',
  //   //     message: 'Would you like to enable the Cool feature?',
  //   //   },
  //   // ]);

  //   // this.log('app name', answers.name);
  //   // this.log('cool feature', answers.cool);

  //   this.fs.copyTpl(
  //     this.templatePath('t.html'),
  //     this.destinationPath('public/index.html'),
  //     { title: 'Templating with Yeoman' }
  //   );
  // }

  // method2() {
  //   this.log('method 2 just ran');
  // }
};
