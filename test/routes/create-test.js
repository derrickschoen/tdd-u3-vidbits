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
/*
  describe('GET', () => {


    it('renders empty input fields', async () => {
      const response = await request(app)
        .get('/items/create');
 
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
 
    });
  });
*/

  describe('POST', () => {

    // it('returns 201', async () => {
    //   const itemToCreate = buildItemObject();
    //   const response = await request(app)
    //     .post('/videos')
    //     .type('form')
    //     .send(itemToCreate);
    //   assert.equal(response.status, 201);
    // });

    it('creates and saves a new video', async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post('/videos')
        .type('form')
        .send(itemToCreate);
      const createdItem = await Video.findOne(itemToCreate);
      assert.isOk(createdItem, 'Item was not created successfully in the database');
    });


/*




    it('redirects home', async () => {
      const itemToCreate = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });


    it('displays an error message when supplied an empty title', async () => {
      const invalidItemToCreate = {
        description: 'test',
        imageUrl: 'https://www.placebear.com/200/300'
      };
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Item.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });


    it('displays an error message when supplied an empty description', async () => {
      const invalidItemToCreate = {
        title: 'test',
        imageUrl: 'https://www.placebear.com/200/300'
      };
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Item.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });


    it('displays an error message when supplied an empty imageUrl', async () => {
      const invalidItemToCreate = {
        title: 'test',
        description: 'test'
      };
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItemToCreate);
      const allItems = await Item.find({});
      assert.equal(allItems.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    */
  });

});
