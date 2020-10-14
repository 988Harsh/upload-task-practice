import { browser, by, element } from 'protractor';

export class Utils {

    waitForChanges() {
        browser.waitForAngular();
        browser.sleep(1000);
    }

    openAllFiles() {
        element.all(by.custom('file-list-button')).each(button => {
            button.click().then(() => {
                this.waitForChanges();
                browser.getAllWindowHandles().then(handles => {
                    const newWindowHandle = handles[1]; // this is your new window
                    browser.waitForAngularEnabled(false);
                    browser.switchTo().window(newWindowHandle).then(() => {
                        browser.getCurrentUrl().then(url => {
                            expect(url).toMatch(/blob:/);
                            browser.waitForAngularEnabled(true);
                            browser.close();
                            browser.switchTo().window(handles[0]);
                            browser.sleep(1000);
                        });
                    });
                });
            });
        });
    }
}
