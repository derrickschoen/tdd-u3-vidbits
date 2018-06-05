const {jsdom} = require('jsdom');

const Video = require('../models/video');

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || 'Excited train guy, New York!';
  const videoUrl = options.videoUrl || 'https://www.youtube.com/embed/6lutNECOZFw';
  const description = options.description || 'Listen to that horn!';
  return {title, videoUrl, description};
};

const createVideoInBrowser = (options = {}) => {
  const itemToCreate = buildItemObject(options);

  browser.url('/videos/create');
  browser.setValue('#title-input', itemToCreate.title);
  browser.setValue('#description-input', itemToCreate.description);
  browser.setValue('#videoUrl-input', itemToCreate.videoUrl);
  browser.click('#submit-button');
  browser.url('/');

  return itemToCreate;
}

// Add a sample Item object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const video = await Video.create(buildItemObject(options));
  return video;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};


const parseAttributeFromHTML = (htmlAsString, selector, attribute) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.getAttribute(attribute);
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

module.exports = {
  buildItemObject,
  createVideoInBrowser,
  seedItemToDatabase,
  parseTextFromHTML,
  parseAttributeFromHTML,
};
