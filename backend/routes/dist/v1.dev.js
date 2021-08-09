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
}); // products

router.post('/select_products', function (req, res, next) {
  var sql = "\n  SELECT\n  product.id,\n  product.name AS product_name,\n  product.price,\n  product.stock,\n  category.name AS category_name\n  FROM product \n    JOIN category\n    ON product.category_id = category.id\n  ";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
    console.log(result);
  });
});
router.post('/update_stock', function (req, res, next) {
  console.log(req.body);
  var sql = "\n  UPDATE\n    product\n  SET\n    stock = stock - ".concat(req.body[0].quantity, "\n  WHERE\n    id = ").concat(req.body[0].id, ";\n  ");
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  }); // res.json(req.body);
}); // users

router.post('/select_users', function (req, res, next) {
  var sql = 'SELECT * FROM users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
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
router.post('/auth_login', function (req, res) {
  if (req.body.email === 'test' && req.body.password === 'test') {
    res.send({
      message: 'OK'
    });
  } else {
    res.send({
      message: 'メールアドレスまたはパスワードが間違っています'
    });
  }
});
module.exports = router;