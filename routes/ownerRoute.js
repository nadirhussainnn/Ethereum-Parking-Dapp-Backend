const express=require('express')
const { login, register } = require('../controllers/ownerController')

const owner_route=express()

owner_route.post('/loginOwner',login)
owner_route.post('/registerOwner',register)

module.exports=owner_route