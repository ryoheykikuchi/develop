const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { response, getMaxListeners } = require('../app');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ChtC0nver5e',
  database: 'express_db'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connection Successed!');
});

router.post('/select_users', function(req, res, next) {
  const sql = 'SELECT * FROM users';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  })
});
router.post('/select_products', function(req, res, next) {
  const sql = 'SELECT product.name AS product_name, product.price, product.stock, category.name AS category_name FROM product JOIN category ON product.category_id = category.id';
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
    console.log(result);
  })
});

router.post('/insert_user', function(req, res, next) {
  const sql = "INSERT INTO users SET ?";
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send('Submit Successed!');
  })
});

module.exports = router;