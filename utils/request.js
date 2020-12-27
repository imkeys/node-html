/**
 * Created by liuhui on 2017/10/27.
 * request工具类
 */ 
var {Logger} = require('./logger');
let request = require('request');
const log = Logger

module.exports = {};

module.exports.get = function (req, rpc_id, url) {
  log.debug(url)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      json: true,
      headers: {
        'Content-Type': 'application/json',
        'user-id': req.headers['user-id'],
        'trace-id': req.headers['trace-id'],
        'rpc-id': !req.headers['rpc-id'] ? 0 : (req.headers['rpc-id'] + '.' + rpc_id)
      },
      url: url
    }, function (err, response, body) {
      if (!err) {
        if (response && response.statusCode === 200) {
          resolve(body)
        } else {
          log.error(url, err)
          reject(err);
        }
      } else {
        log.error(url, err)
        reject(err);
      }
    });
  })
};

module.exports.post = function (req, rpc_id, url, data) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      json: true,
      headers: {
        'Content-Type': 'application/json',
        'user-id': req.headers['user-id'],
        'trace-id': req.headers['trace-id'],
        'rpc-id': !req.headers['rpc-id'] ? 0 : (req.headers['rpc-id'] + '.' + rpc_id)
      },
      url: url,
      body: data
    }, function (err, response, body) {
      if (!err) {
        if (response && response.statusCode === 200) {
          resolve(body);
        } else {
          resolve(null)
        }
      } else {
        log.error(err);
        reject(err);
      }
    });
  })
};

