const Video = require('../../models/video');
const {assert} = require('chai');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../database-utilities');


describe('Model: Video', () => {
  beforeEach(async () => {
    await connectDatabaseAndDropData();
  });

  afterEach(async () => {
    await disconnectDatabase();
  });


  describe('#title', () => {

    it('is a String', () => {
      const titleAsNonString = 42;
      const item = new Video({title: titleAsNonString});
      assert.strictEqual(item.title, titleAsNonString.toString());
    });


    it('is required', () => {
      const item = new Video({});
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });

  describe('#description', () => {

    it('is a String', () => {
      const descriptionAsNonString = 42;
      const item = new Video({description: descriptionAsNonString});
      assert.strictEqual(item.description, descriptionAsNonString.toString());
    });


    it('is required', () => {
      const item = new Video({});
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');
    });
  });


  describe('#videoUrl', () => {

    it('is a String', () => {
      const videoUrlAsNonString = 42;
      const item = new Video({videoUrl: videoUrlAsNonString});
      assert.strictEqual(item.videoUrl, videoUrlAsNonString.toString());
    });


    it('is required', () => {
      const item = new Video({});
      item.validateSync();
      assert.equal(item.errors.videoUrl.message, 'Path `videoUrl` is required.');
    });
  });
});


