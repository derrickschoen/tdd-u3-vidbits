// Imports
const router = require('express').Router();

const Video = require('../models/video');


// Routes
router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});


router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('videos/index', {videos});
});


router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});


// Only route the requests that include a valid MongoDB id format
router.get('/videos/:videoId([0-9A-Fa-f]{24})', async (req, res, next) => {
  const videoId = req.params.videoId;
  const item = await Video.findById(videoId);

  res.render('videos/show', {video: item})
});


// Only route the requests that include a valid MongoDB id format
router.get('/videos/:videoId([0-9A-Fa-f]{24})/edit', async (req, res, next) => {
  const videoId = req.params.videoId;
  const item = await Video.findById(videoId);

  res.render('videos/edit', {video: item})
});


router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const newVideo = new Video({title, description, videoUrl});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.status(400).render('videos/create', {newVideo: newVideo});
  } else {
    await newVideo.save();
    res.redirect('/videos/'+ newVideo._id);
  }

});

router.post('/videos/:videoId([0-9A-Fa-f]{24})/updates', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const videoId = req.params.videoId;



  const item = await Video.findById(videoId);
  item.title = title;
  item.description = description;
  item.videoUrl = videoUrl;
  item.validateSync();
  await item.save();

  await res.redirect('/videos/'+ item._id);
});

router.post('/videos/:videoId([0-9A-Fa-f]{24})/deletions', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const videoId = req.params.videoId;



  const item = await Video.findById(videoId);
  await item.remove();

  await res.redirect('/videos/');
});


module.exports = router;