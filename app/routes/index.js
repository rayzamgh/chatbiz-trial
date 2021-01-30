const express = require('express');
const botRouter = require('./bot');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Welcome!');
});

router.use('/api/v1', botRouter);

module.exports = router;
