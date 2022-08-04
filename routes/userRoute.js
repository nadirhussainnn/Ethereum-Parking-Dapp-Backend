const express=require('express')
const { login, register, test } = require('../controllers/userController')

const user_route=express()

user_route.post('/test',test)
user_route.post('/loginUser',login)
user_route.post('/registerUser',register)

module.exports=user_route