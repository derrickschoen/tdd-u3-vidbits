const {assert} = require('chai');
const {buildItemObject, createVideoInBrowser} = require('../test-utils');



describe('User updating a video', () => {


    it('can change the values', () => {
      const videoData = buildItemObject();
      const video = createVideoInBrowser(videoData);
      const newTitle = 'Double Rainbow';
      browser.click('.video-title')
      browser.click('button#edit');

      assert.include(browser.getUrl(), 'edit');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');

      assert.include(browser.getText('.video-title'), newTitle);
      assert.notInclude(browser.getText('.video-title'), videoData.title);
      // assert.include(browser.getAttribute('iframe.video-player', 'src'), videoData.videoUrl);
      // assert.include(browser.getText('.video-description'), videoData.description);
    });



    it('updates an existing record instead of creating a new one.', () => {
      const videoData = buildItemObject();
      const video = createVideoInBrowser(videoData);
      const newTitle = 'Double Rainbow';
      browser.click('.video-title')
      browser.click('button#edit');

      assert.include(browser.getUrl(), 'edit');
      browser.setValue('#title-input', newTitle);
      browser.click('#submit-button');
      browser.url('/');

      assert.include(browser.getText('.video-title'), newTitle);
      assert.notInclude(browser.getText('.video-title'), videoData.title);
    });

});