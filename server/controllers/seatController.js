const { dataBase } = require("../config/index")
const { getUser } = require("./userController")
const nodemailer = require("nodemailer")


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
  const email = req.body.userEmail
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
      sendEmail(seats, email)
      res.json({ message: "Seats updated successfully" })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Internal Server Error" })
    }
  }

  const sendEmail = async (seats, email) => {

    console.log(seats)
    console.log(email)

    const html = `
      Your seat numbers for the movie are: ${seats}
    `

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'nodemailertest85@gmail.com',
        pass: 'hipgwjfpjhlfrbdp'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    const mailOptions = {
      from: 'nodemailertest85@gmail.com',
      to: email,
      subject: 'Movie Tickets',
      html: html
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
  }

  const cancelReserve = async ( req, res ) => {
    const seats = req.body.seatList
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
}
module.exports = { test, getSeats, reserveSeats, bookSeats, cancelReserve  }