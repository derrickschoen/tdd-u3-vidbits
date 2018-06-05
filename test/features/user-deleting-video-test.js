const {assert} = require('chai');
const {buildItemObject, createVideoInBrowser} = require('../test-utils');


describe('deleting a video', () => {
  it('can\'t  see it rendered', () => {
    const videoData = buildItemObject();
    const video = createVideoInBrowser(videoData);

    browser.url('/');
    browser.click('.video-title');
    browser.click('button#delete');

    assert.notInclude(browser.getText('body'), videoData.title);

  });
});

