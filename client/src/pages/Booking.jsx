import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { finalBooking, cancelReserve } from "../controllers/BookingController"
import Timer from '../components/Timer'


export default function Booking() {

  const [email, setEmail] = useState('')
  const [timer, setTimer] = useState(true)
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const seatList = location.state
  

  const sendEmail = (e) => {
    e.preventDefault()
    setTimer(!timer)
    setConfirm(!confirm)
    finalBooking(seatList,email)
  }

  function timesUp(){
    cancelReserve(seatList)
    navigate("/")
  }

  return (
    <div className='flex flex-wrap justify-center w-[700px]'>
      <div className=''>
        Book your tickets before the timer runs out { timer && <Timer timesUp={timesUp}/> }
      </div>
      <div className='bg-sky-200 p-16 rounded-3xl w-[400px] m-5'>
        <p className='text-xl'>Booking for seat number: {seatList.map(e=> `${e},`)}</p>
        <form action="submit" onSubmit={sendEmail}>
        <label className='block'>Give us your email</label>
        <input className='block rounded-md p-2' type="text" placeholder='email...' onChange={(e)=>setEmail(e.target.value)}/>
        <button className='bg-red-400 rounded-xl p-3' type='submit' onClick={sendEmail}>Book</button>
        </form>
      </div>
      <div>
        { confirm && <p className='text-xl'>Successfull booking, your tickets has been sent to your email adress.</p> }
      </div>
    </div>
  )
}
