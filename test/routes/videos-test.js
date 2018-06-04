const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /videos', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {

    it('renders an existing video', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .get(`/videos`);

      assert.include(parseTextFromHTML(response.text, '.video-title'), item.title);
      // const imageElement = findImageElementBySource(response.text, item.videoUrl);
      // assert.equal(imageElement.src, item.videoUrl);
    });

    it('renders all items from the database', async () => {
      const firstItem = await seedItemToDatabase({title: 'Item1'});
      const secondItem = await seedItemToDatabase({title: 'Item2'});

      const response = await request(app)
        .get(`/videos`);

      assert.include(parseTextFromHTML(response.text, `#video-${firstItem._id} .video-title`), firstItem.title);
      assert.include(parseTextFromHTML(response.text, `#video-${secondItem._id} .video-title`), secondItem.title);
    });

  });
});
