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
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1)
    });

    it('displays a title', async function() {
        app.client.waitUntilWindowLoaded();
        const title = await app.client.getTitle();
        return assert.equal(title, 'Metis')
    });

    it('clickFile', async function() {
        app.client.waitUntilWindowLoaded();
    });

});
