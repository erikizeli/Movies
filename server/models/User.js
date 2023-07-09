const { dataBase } = require("../config/index")

const User = {
  create: function(user, callback) {
    console.log(user.body.userEmail)
    const element = user.body.seat_id
    const data = JSON.stringify(element)
    
    const query = "INSERT INTO user (email, seat_id) VALUES (?, ?)"

    dataBase.query(query, [user.body.userEmail, data], (error, result) => {

      if (error) {
        return callback(error);
      }
      callback(null, result)
    })
  }
}

module.exports = User;