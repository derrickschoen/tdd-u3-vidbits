const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visiting new videos page', () => {

  it('can save a video', () => {
    const itemToCreate = buildItemObject();

    browser.url('/create.html');
    browser.setValue('#title-input', itemToCreate.title);
    browser.setValue('#description-input', itemToCreate.description);
    // browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
    browser.click('#submit-button');
    assert.include(browser.getText('body'), itemToCreate.title);
    // assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);

  });
});
