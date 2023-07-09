const Seats = ({ seat, onColorChange, seatId }) => {

  

  function changeColor(){
    onColorChange(seat, seat.id)
  }

  return(
    <div>
        <div className={
          seat.booked ? "bg-gray-500 w-12 h-14 rounded-xl" : seatId.includes(seat.id) ? "bg-purple-500 w-12 h-14 rounded-xl" : 
          seat.reserved ? "bg-orange-500 w-12 h-14 rounded-xl" : "bg-green-500 w-12 h-14 rounded-xl"
        }
        onClick={changeColor}>
        </div>
    </div>
  )
}

export default Seats