const {assert} = require('chai');
const {buildItemObject, seedItemToDatabase} = require('../test-utils');

function createVideoInBrowser(options = {}){
  const itemToCreate = buildItemObject(options);

  browser.url('/videos/create');
  browser.setValue('#title-input', itemToCreate.title);
  browser.setValue('#description-input', itemToCreate.description);
  browser.setValue('#videoUrl-input', itemToCreate.videoUrl);
  browser.click('#submit-button');
  browser.url('/');

  return itemToCreate;
}

describe('User visiting the landing page', () => {

  it('can navigate to add a video', () => {
    // Setup
    browser.url('/');
    // Exercise
    browser.click('a[href="/videos/create"]');
    // Verification
    assert.include(browser.getText('body'), 'Save a video');
  });


  describe('with no existing videos', () => {

    it('shows no videos', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });


  describe('with an existing video', () => {

    it('sees it in the list', () => {
      const videoData = buildItemObject();
      const video = createVideoInBrowser(videoData)
      browser.url('/');
      assert.include(browser.getText('.video-title'), videoData.title);
      assert.include(browser.getAttribute('iframe.video-player', 'src'), videoData.videoUrl);
    });


    it('can navigate to a video', () => {
      const videoData = buildItemObject();
      const video = createVideoInBrowser(videoData)
      browser.url('/');
      browser.click('.video-title')
      assert.include(browser.getText('.video-title'), videoData.title);
      assert.include(browser.getAttribute('iframe.video-player', 'src'), videoData.videoUrl);
      assert.include(browser.getText('.video-description'), videoData.description);
    });

  });



});
