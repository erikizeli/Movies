const { dataBase } = require("../config/index")
const User = require("../models/User")

const createUser = (newUser) => {

  User.create(newUser, (error, createUser) => {
        if (error) {
          console.error('Error creating user: ',error)
          return;
        }
        console.log('User created with ID: ')
      })
}

module.exports = { createUser }