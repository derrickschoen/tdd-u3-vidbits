// Imports
const router = require('express').Router();

const Video = require('../models/video');

// Routes
router.post('/videos', async (req, res, next) => {
  const {title, description, videoUrl} = req.body;
  const newVideo = new Video({title, description, videoUrl});
  newVideo.validateSync();
  if (newVideo.errors) {
    console.log(newVideo.errors)
    // res.status(400).render('create', {newVideo: newVideo});
  } else {
    await newVideo.save();
    //res.redirect('/');
    res.send('<h1>' + title + '</h1> '
  +'<p>' + description + '</p>'
);
  }

});



// Export
module.exports = router;