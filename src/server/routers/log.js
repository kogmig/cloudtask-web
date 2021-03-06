const express = require('express');
const logCtrl = require('./../controllers/log');

let router = express.Router();

router.get('/activity',
  logCtrl.getActivity
);

router.get('/logs',
  logCtrl.getLog
);

router.post('/activity',
  logCtrl.postActivity
);

module.exports = router;
