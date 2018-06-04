const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visiting new videos page', () => {
  describe('posts a new video', () => {
    it('can see it rendered', () => {
      const itemToCreate = buildItemObject();

      browser.url('/videos/create');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#videoUrl-input', itemToCreate.videoUrl);
      browser.click('#submit-button');
      browser.url('/');
      assert.include(browser.getText('#videos-container'), itemToCreate.title);
      // assert.include(browser.getText('body'), itemToCreate.description);
      assert.include(browser.getAttribute('body iframe', 'src'), itemToCreate.videoUrl);

    });
  });
});
