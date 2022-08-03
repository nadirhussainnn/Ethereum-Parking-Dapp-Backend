const express=require('express')
const { sendTransaction, updateVacancy, addParkingLot } = require('../controllers/transactionController')


const transaction_route=express()

transaction_route.post('/sendTransaction',sendTransaction)
transaction_route.post('/updateVacancy',updateVacancy)
transaction_route.post('/addParkingLot',addParkingLot)

module.exports=transaction_route