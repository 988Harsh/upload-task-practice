getChromeDriver = function () {
  if (/^win/.test(process.platform)) {
    return '../node_modules/chromedriver/lib/chromedriver/chromedriver.exe';
  }
  return '../node_modules/chromedriver/lib/chromedriver/chromedriver';
}
// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
// const { protractor } = require('protractor/built/ptor');


/**
 * @type { import("protractor").Config }
 */
exports.config = {
  chromeDriver: getChromeDriver(),
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    By.addLocator('custom', function (value) {
      return document.querySelectorAll('[custom-' + value + ']');
    })

  }
};