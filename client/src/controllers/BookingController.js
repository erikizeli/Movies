const reserve = async (seatList) => {

  const obj = {
    seatList:seatList
  }
  
  const response = await fetch("http://localhost:3000/api/reserve",{
    headers:{ "Content-Type": "application/json" },
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(obj)
  })

  const data = await response.json()
}

const cancelReserve = async (seatList) => {

  const obj = {seatList:seatList}
  console.log(obj)

  const response = await fetch("http://localhost:3000/api/cancelreserve",{
    headers:{ "Content-Type": "application/json" },
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(obj)
  })

  const data = response.json()
}

const finalBooking = async (seatList, userEmail,) => {
  try {
    await bookSeats(seatList)
    await createUser(userEmail, seatList)
  } catch (error) {
    console.error(error)
  }
}

const bookSeats = async (seatList) => {
  const obj = {
    seatList:seatList
  }

  const response = await fetch("http://localhost:3000/api/book",{
    headers:{ "Content-Type": "application/json" },
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(obj)
  })
}

const createUser = async (userEmail, seatList) => {

  const obj = {
    userEmail: userEmail,
    seat_id: {}
  };

  for (let i = 0; i < seatList.length; i++) {
    obj.seat_id[i] = seatList[i];
  }

  
  const response = await fetch("http://localhost:3000/user/createuser", {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(obj)
  });

  const data = await response.json();
  console.log(data)
};


export { reserve, finalBooking, cancelReserve }