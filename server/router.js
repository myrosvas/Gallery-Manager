const express = require('express');
const router = express.Router();

router.get('/load', (req, res) => {
  debugger;
  console.log('test');
  res.send(req.body);
});

router.post('/save', (req, res) => {
  console.log('api:save');
  res.send(req.body);
});

module.exports = router;
