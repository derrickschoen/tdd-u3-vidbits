// Imports
const router = require('express').Router();

const Video = require('../models/video');


// Routes
router.get('/', async (req, res, next) => {
  res.redirect('/videos');
});


router.get('/videos', async (req, res, next) => {
  const videos = await Video.find({});
  res.render('index', {videos});
});


router.get('/videos/create', async (req, res, next) => {
  res.render('videos/create');
});


router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const newVideo = new Video({title, description, videoUrl});
  newVideo.validateSync();
  if (newVideo.errors) {
    //console.log(newVideo.errors)
    res.status(400).render('create', {video: newVideo});
  } else {
    await newVideo.save();
    res.redirect('/videos');
  }

});



// Export
module.exports = router;