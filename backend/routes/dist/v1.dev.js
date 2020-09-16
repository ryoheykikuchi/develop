"use strict";

var express = require('express');

var router = express.Router();

var mysql = require('mysql');

var _require = require('../app'),
    response = _require.response,
    getMaxListeners = _require.getMaxListeners;

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ChtC0nver5e',
  database: 'express_db'
});
con.connect(function (err) {
  if (err) throw err;
  console.log('Connection Successed!');
});
/* GET users listing. */

router.post('/select_users', function (req, res, next) {
  var sql = 'SELECT * FROM users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
router.get('/test', function (req, res, next) {
  res.json({
    message: 'Test API',
    id: 2,
    name: {
      sei: 'kikuchi',
      mei: 'ryohei'
    }
  });
});
router.post('/insert_user', function (req, res, next) {
  var sql = "INSERT INTO users SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send('Submit Successed!');
  });
});
module.exports = router;