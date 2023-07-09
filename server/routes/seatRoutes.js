const express = require("express");
const {test, getSeats, reserveSeats, bookSeats, cancelReserve } = require("../controllers/seatController")

const router = express.Router();

router.get("/test", test)

router.get("/getseats", getSeats)

router.put("/reserve", reserveSeats)

router.put("/book", bookSeats)

router.put("/cancelreserve", cancelReserve)

module.exports = router