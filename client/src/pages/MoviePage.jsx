import React, { useEffect, useState } from 'react'
import Seats from '../components/Seats'
import { io } from 'socket.io-client'
import { reserve } from "../controllers/BookingController" 
import { NavLink, useNavigate } from 'react-router-dom';

const socket = io("http://localhost:3000", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  transports: ["websocket"],
});

export default function MoviePage() {

  const [seats, setSeats] = useState()
  const [seatsToBook, setSeatsToBook] = useState([])
  const [seatId, setSeatId] = useState([])
  const navigate = useNavigate()

  function handleColorChange(seat, seat_id){
    const isSeatId = seatId.includes(seat_id)
    if (isSeatId) {
      const filteredList = seatsToBook.filter(e=> e != seat_id)
      const filteredId = seatId.filter(e => e != seat_id)
      
      setSeatId(filteredId)
      setSeatsToBook(filteredList)
    } else {
      setSeatsToBook([...seatsToBook, seat])
      setSeatId([...seatId, seat_id])
    }
  }
  
   socket.on('colorChanged', (input) => {
     setSeatsToBook(input)
   })

  useEffect(()=>{
    callSeats()
  },[seats])

  function reserveSeats(){
    let isReserved = false
    for(let element of seatsToBook){
      if (element.reserved) {
        isReserved = true
      } else {
        isReserved = false
      }
    }
    if (seatId.length > 0 && !isReserved) {
       socket.emit('changeColor', (seatId));
      reserve(seatId)
      const state = seatId
      navigate("/booking", {state} )
    } else if (isReserved) {
      alert("This seat is reserved")
    }
  }

  const callSeats = async () => {
    const response = await fetch("http://localhost:3000/api/getseats")
    const data = await response.json()
    setSeats(data)
  }

  return (
    <div>
      <div className='flex flex-row-reverse items-center'>
        <div className='flex-wrap items-center'>
          <div className='flex items-center pb-2'>
            <div className=' w-5 h-5 bg-green-500'></div>  
            <p className='pl-2'>Free</p>
          </div>
          <div className='flex items-center pb-2'>
            <div className='w-5 h-5 bg-orange-500'></div>  
            <p className='pl-2'>Reserved</p>
          </div>
          <div className='flex items-center pb-2'>
            <div className='w-5 h-5 bg-gray-500'></div>  
            <p className='pl-2'>Sold</p>
          </div>
          <div className='flex items-center pb-2'>
            <div className='w-5 h-5 bg-purple-500'></div>  
            <p className='pl-2'>Selected</p>
          </div>
        </div>
        <div className='flex flex-wrap mt-10 w-[600px] justify-center pr-10'>
          <div className='w-full bg-gray-700 h-8 mb-20 rounded-t-3xl rounded-b-lg text-center '>
            <p className='text-white text-xl'>Screen</p>
          </div>
          <div className='flex flex-wrap gap-2 w-[600px]'>
            {seats && seats.map((e,i)=>{return <Seats key={i} seat={e} seatId={seatId} onColorChange={handleColorChange}/>})}
          </div>
          <div className='bg-cyan-400 w-fit p-2 rounded-xl justify-center mt-5'>
            <button onClick={()=>reserveSeats(seatId)} >Reserve</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
