const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  /*
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      // Create an Item in the database using seedItemToDatabase().
      const item = await seedItemToDatabase();
      const itemId = item._id;

      // Make a request for the item. The route should be /items/:itemId.
      // You can use the created item's _id property to make this request.
      const response = await request(app)
        .get('/items/' + itemId);


      // Assert that the created item's title and description are in the returned HTML.
      // You can get this text in the #item-title and #item-description fields.
      assert.include(parseTextFromHTML(response.text, '#item-title'), item.title);
      assert.include(parseTextFromHTML(response.text, '#item-description'), item.description);
    });
  });
  */
});
