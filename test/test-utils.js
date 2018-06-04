const {jsdom} = require('jsdom');

const Item = require('../models/video');

// Create and return a sample Item object
const buildItemObject = (options = {}) => {
  const title = options.title || 'Excited train guy, New York!';
  const imageUrl = options.imageUrl || 'https://www.youtube.com/embed/6lutNECOZFw';
  const description = options.description || 'Listen to that horn!';
  return {title, imageUrl, description};
};

// Add a sample Item object to mongodb
const seedItemToDatabase = async (options = {}) => {
  const item = await Item.create(buildItemObject(options));
  return item;
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

module.exports = {
  buildItemObject,
  seedItemToDatabase,
  parseTextFromHTML,
};
