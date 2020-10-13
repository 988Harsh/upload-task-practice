import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
const path = require('path');

describe('upload App', () => {
  let page: AppPage;
  let pngFilePath = path.resolve(__dirname, '../docs/battery.png');
  let mp4FilePath = path.resolve(__dirname, '../docs/file_example_MP4_480_1_5MG.mp4');

  beforeEach(() => {
    page = new AppPage();
  });


  it('should be able to upload a png file', () => {
    page.navigateTo();
    browser.waitForAngular();
    browser.sleep(1000);
    expect(element(by.css('.no-files')).isDisplayed()).toBe(true);
    element(by.css('.file')).sendKeys(pngFilePath);
    expect(element(by.css('.no-files')).isPresent()).toBe(false);
  });

  it('should display a file in file list', () => {
    browser.waitForAngular();
    browser.sleep(1000);
    expect(element(by.css('.file-list')).isDisplayed()).toBe(true);
  });

  it('should be able to open a file', () => {
    browser.waitForAngular();
    browser.sleep(1000);
    element(by.css('.file-list-button')).click().then(() => {
      browser.waitForAngular();
      browser.getAllWindowHandles().then(function (handles) {
        let newWindowHandle = handles[1]; // this is your new window
        browser.ignoreSynchronization = true;
        browser.switchTo().window(newWindowHandle).then(function () {
          browser.getCurrentUrl().then(url => {
            expect(url).toMatch(/blob:/);
          });
        });
        browser.switchTo().window(handles[0]);
        browser.sleep(1000);
      });
    });
  });

  it('should be able to delete file', () => {
    browser.waitForAngular();
    browser.sleep(1000);
    expect(element(by.css('.no-files')).isPresent()).toBe(false);
    element(by.css('.remove')).click();
    expect(element(by.css('.no-files')).isDisplayed()).toBe(true);
  });

  it('should be able to upload a mp4 file', () => {
    browser.refresh();
    browser.waitForAngular();
    browser.sleep(1000);
    expect(element(by.css('.no-files')).isDisplayed()).toBe(true);
    element(by.css('.file')).sendKeys(mp4FilePath);
    expect(element(by.css('.no-files')).isPresent()).toBe(false);
  });

  it('should be able to open a mp4 file', () => {
    browser.waitForAngular();
    browser.sleep(1000);
    element(by.css('.file-list-button')).click().then(() => {
      browser.waitForAngular();
      browser.getAllWindowHandles().then(function (handles) {
        let newWindowHandle = handles[1]; // this is your new window
        browser.ignoreSynchronization = true;
        browser.switchTo().window(newWindowHandle).then(function () {
          browser.sleep(1000);
          browser.getCurrentUrl().then(url => {
            expect(url).toMatch(/blob:/);
          });
        });
        browser.switchTo().window(handles[0]);
        browser.sleep(1000);
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
