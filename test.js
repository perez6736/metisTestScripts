const assert = require('assert');
const Application = require('spectron').Application;

const app = new Application ({
    path: 'C:/Metis/Metis.exe'
    
});

describe('Electron app tests', function () {

    this.timeout(10000);
    //Start the electron app before each test
    beforeEach(() => {
      return app.start();
    });
  
    //Stop the electron app after completion of each test
    afterEach(() => {
      if (app && app.isRunning()) {
        return app.stop();
      }
    });

    it('display the electron app window', async function() {
        let windowCount = await app.client
        .waitUntilWindowLoaded()
        .getWindowCount();
        return assert.equal(windowCount, 1)
    });

    it('displays a title', async function() {
        let titleName = await app.client
        .waitUntilWindowLoaded()
        .getTitle();

        return assert.equal(titleName, 'Metis')
    });

    it('columns display', async function() {
        let isColumnsVisible = await app.client
        .waitUntilWindowLoaded()
        .isVisible('.column');
        return assert.ok(isColumnsVisible); //assert.ok checks if value is true. 
    });

    it('confirm text on column', async function() {
      let columnText = await app.client
      .waitUntilWindowLoaded()
      .getText('//*[@id="root"]/div/div/div[2]/div[2]/div/div/div/div[1]/div/div[2]/div/div/div/p'); // p tag with in the column. 
      return assert.equal(columnText, "Please connect your device"); 
  });

});
