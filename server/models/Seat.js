const { dataBase } = require("../config/index")

const Seat = {
  create: function(user, seat, callback) {
    const query = "INSERT INTO seats (seat_number, reserved, booked, user_id) VALUES (?, ?, ?, ?)"
    console.log('user id: ',user.id)

    const getQuery = `SELECT user.id FROM user WHERE seat_id = ${seat.id}`

    dataBase.query(query, [seat.seat_number, seat.reserved, seat.booked, user.id], (error, result) => {
      if (error) {
        return callback(error);
      }
      callback(null, null, result.insertId)
    })
  }
}

module.exports = Seat