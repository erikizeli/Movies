const { dataBase } = require("../config/index")


const getSeats = async( req, res ) => {
  const query = "SELECT * FROM seats"
  dataBase.query(query, ( err, data ) => {
    if (err) {
      res.json(err)
    } else {
      res.json(data)
    }
  })
}

const reserveSeats = async ( req, res ) => {
  const seats = req.body.seatList
    try {
      for (const element of seats){
      const query = "UPDATE seats SET reserved = 1 WHERE id = (?)"
      await new Promise((resolve, reject) => {
        dataBase.query(query, element, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }
      res.json({ message: "Seats updated successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

const bookSeats = async ( req, res ) => {
  const seats = req.body.seatList
    try {
      for ( const element of seats ){
      const query = "UPDATE seats SET booked = 1 WHERE id = (?)"
      await new Promise((resolve, reject) => {
        dataBase.query(query, element, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    }
      res.json({ message: "Seats updated successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  const cancelReserve = async ( req, res ) => {
    const seats = req.body.seatList
    console.log(seats)
    try {
      for( const element of seats ){
        const query = "UPDATE seats SET reserved = 0 WHERE id = (?)"
        await new Promise((resolve, reject) => {
          dataBase.query(query, element, ( err, data ) => {
            if (err) {
              reject(err)
            } else {
              resolve(data)
            }
          })
        })
      }
      res.json({ message: "Seats updated successfully" })
    } catch (error) {
      console.log(error)
    }
  }


const test = async (req, res) => {
  res.json("Working")
  console.log(process.env.PASSWORD)
}
module.exports = { test, getSeats, reserveSeats, bookSeats, cancelReserve  }