'use strict'

const express = require('express');
const res = require('express/lib/response');
const api = express.Router();
const userController = require('../controller/user.controler')


api.get('/test', userController.test);
api.post('/register', userController.register)
api.post('/login', userController.login)

module.exports = api;