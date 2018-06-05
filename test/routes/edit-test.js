const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildItemObject, seedItemToDatabase, parseAttributeFromHTML} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /videos/:id/updates', () => {


  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders a form for editing the Video', async () => {
      const item = await seedItemToDatabase();
      const editUrl = '/videos/' + item._id + '/edit'

      const response = await request(app)
        .get(editUrl);

      assert.include(parseAttributeFromHTML(response.text, '#title-input', 'value'), item.title);
      assert.include(parseTextFromHTML(response.text, '#description-input'), item.description);
      assert.include(response.text, item.videoUrl);
    });
  });


  describe('POST', () => {


    describe('when given valid data', () => {

      it('updates the existing video instead of creating a new one.', async () => {
        const item = await seedItemToDatabase();
        const editUrl = '/videos/' + item._id + '/updates';
        const updateData = buildItemObject({title: 'Double Rainbow'});



        const response = await request(app)
          .post(editUrl)
          .type('form')
          .send(updateData);

        const originalItem = await Video.findOne(item.toObject());
        const updatedItem = await Video.findOne(updateData);

        assert.isNotOk(originalItem, 'Item was not replaced successfully in the database');
        assert.isOk(updatedItem, 'Item was not updated successfully in the database');
      });


    });

  });

});
