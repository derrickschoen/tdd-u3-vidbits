const {assert} = require('chai');

describe('User visiting the landing page', () => {

  it('can navigate to add a video', () => {
    // Setup
    browser.url('/');
    // Exercise
    browser.click('a[href="/create.html"]');
    // Verification
    assert.include(browser.getText('body'), 'Save a video');
  });


  describe('with no existing videos', () => {

    it('shows no videos', () => {
      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  /*
  describe('with an existing video', () => {

    it('renders it in the list', () => {
      browser.url('/');
      // assert.equal(browser.getText('#videos-container'), '');
    });


    it('can navigate to a video', () => {
      browser.url('/');
      // assert.equal(browser.getText('#videos-container'), '');
    });
  });
*/


});
