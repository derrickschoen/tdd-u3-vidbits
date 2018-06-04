const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Video = require('../../models/video');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
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


    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/videos/create');
 
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#videoUrl-input'), '');
 
    });
  });


  describe('POST', () => {


    describe('when given valid data', () => {


      it('creates and saves a new video', async () => {
        const itemToCreate = buildItemObject();
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(itemToCreate);
        const createdItem = await Video.findOne(itemToCreate);
        assert.isOk(createdItem, 'Item was not created successfully in the database');
      });


      it('redirects home', async () => {
        const itemToCreate = buildItemObject();
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(itemToCreate);
        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/videos');
      });
    });


    describe('when given invalid data', () => {


      it('displays an error message when supplied an empty title', async () => {
        const invalidItemToCreate = {
          description: 'test',
          videoUrl: 'https://www.placebear.com/200/300'
        };
        const response = await request(app)
          .post('/videos')
          .type('form')
          .send(invalidItemToCreate);
        const allItems = await Video.find({});
        assert.equal(allItems.length, 0);
        assert.equal(response.status, 400);
        assert.include(parseTextFromHTML(response.text, 'form'), 'required');

        assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
        assert.include(parseTextFromHTML(response.text, 'textarea#description-input'), invalidItemToCreate.description);
        //assert.include(parseTextFromHTML(response.text, 'input#videoUrl-input'), invalidItemToCreate.videoUrl);
      });
    });


    it('displays an error message when supplied an empty description', async () => {
      const invalidItemToCreate = {
        title: 'test',
        videoUrl: 'https://www.placebear.com/200/300'
      };
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Video.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });


    it('displays an error message when supplied an empty videoUrl', async () => {
      const invalidItemToCreate = {
        title: 'test',
        description: 'test'
      };
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Video.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    
  });

});
