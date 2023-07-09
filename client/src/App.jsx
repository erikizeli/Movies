import HomePage from './pages/HomePage'
import { Routes, Route, Navigate } from 'react-router-dom'
import MoviePage from './pages/MoviePage'
import Booking from './pages/Booking'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/film' element={<MoviePage />}/>
      <Route path='/booking' element={<Booking />}/>
    </Routes>
    </>
  )
}

export default App
