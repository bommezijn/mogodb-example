const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const user = require('../schema/apache.schema')
const Panzer = mongoose.model('helicopters', user)

const getListofUsers = async () => {
  const data = await Panzer.find()
  return data
}

router.get('/', async (request, response) => {
  return response.render('index', {
    title: 'Home',
    users: await getListofUsers()
  })
})

router.get('/addUser', (request, response) => {
  console.log('navigating to addUser')
  return response.render('addUser', {title: 'Add a User'})
})

router.post('/addNewUser', async (request, response) => {
  console.log(request.body)
  const fname = request.body.firstname
  const lname = request.body.lastname
  console.log(`${fname} en ${lname}`)
  
  let newUser = new Panzer({firstname: fname, lastname: lname});
  newUser.save((err) => {
    console.log(`saved ${newUser}`)
    if(err) return handleError(err)
  })
  return response.render('index', {
    title: 'Home',
    users: await getListofUsers()
  })
})

module.exports = router