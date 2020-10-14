import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { Utils } from '../utils';
const path = require('path');

describe('upload App', () => {
  let page: AppPage;
  let utils: Utils;
  let pngFilePath = path.resolve(__dirname, '../docs/battery.png');
  let mp4FilePath = path.resolve(__dirname, '../docs/file_example_MP4_480_1_5MG.mp4');

  beforeEach(() => {
    utils = new Utils();
    page = new AppPage();
  });


  it('should be able to upload a png file', async () => {
    page.navigateTo();
    utils.waitForChanges();
    expect(element(by.custom('no-files')).isDisplayed()).toBe(true);
    await element(by.custom('file')).sendKeys(pngFilePath);
    expect(element(by.custom('no-files')).isPresent()).toBe(false);
  });

  it('should display a file in file list', () => {
    utils.waitForChanges();
    expect(element(by.custom('file-list')).isDisplayed()).toBe(true);
  });

  it('should be able to open a file', () => {
    utils.waitForChanges();
    utils.openAllFiles();
  });

  it('should be able to delete file', () => {
    utils.waitForChanges();
    expect(element(by.custom('no-files')).isPresent()).toBe(false);
    element(by.custom('remove')).click();
    expect(element(by.custom('no-files')).isDisplayed()).toBe(true);
  });

  it('should be able to upload a mp4 file', async () => {
    browser.refresh();
    utils.waitForChanges();
    expect(element(by.custom('no-files')).isDisplayed()).toBe(true);
    await element(by.custom('file')).sendKeys(mp4FilePath);
    expect(element(by.custom('no-files')).isPresent()).toBe(false);

  });

  it('should be able to open a mp4 file', () => {
    utils.waitForChanges();
    utils.openAllFiles();
  });

  it('should accept multiple files at once', async () => {
    browser.refresh();
    utils.waitForChanges();
    expect(element(by.custom('no-files')).isDisplayed()).toBe(true);
    await element(by.custom('file')).sendKeys(mp4FilePath + '\n' + pngFilePath);
    expect(element(by.custom('no-files')).isPresent()).toBe(false);
    browser.sleep(1000);
  });

  it('should be able to open any of the multiple files', () => {
    utils.waitForChanges();
    utils.openAllFiles();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
