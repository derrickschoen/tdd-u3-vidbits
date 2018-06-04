// Imports
const router = require('express').Router();

// Routes
router.post('/videos', async (req, res, next) => {
  res.send(201);

});



// Export
module.exports = router;