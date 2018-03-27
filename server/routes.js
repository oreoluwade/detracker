const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.json({
      message: 'Welcome to the start of something beautiful'
    })
  })

module.exports = router;
