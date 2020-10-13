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
                browser.getAllWindowHandles().then(function (handles) {
                    let newWindowHandle = handles[1]; // this is your new window
                    browser.ignoreSynchronization = true;
                    browser.switchTo().window(newWindowHandle).then(function () {
                        browser.getCurrentUrl().then(url => {
                            expect(url).toMatch(/blob:/);
                            browser.ignoreSynchronization = false;
                        });
                    });
                    browser.switchTo().window(handles[0]);
                    browser.sleep(1000);
                });
            });
        });

    }

}