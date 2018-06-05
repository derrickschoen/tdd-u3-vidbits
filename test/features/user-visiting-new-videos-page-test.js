const {assert} = require('chai');
const {buildItemObject, createVideoInBrowser} = require('../test-utils');

describe('User visiting new videos page', () => {
  describe('posts a new video', () => {
    it('can see it rendered', () => {
      const videoData = buildItemObject();
      const video = createVideoInBrowser(videoData);
      browser.url('/');
      assert.include(browser.getText('#videos-container'), videoData.title);
      assert.include(browser.getAttribute('body iframe', 'src'), videoData.videoUrl);

    });
  });
});
