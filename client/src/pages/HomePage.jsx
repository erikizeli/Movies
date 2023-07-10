import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <div className='text-4xl font-thin mb-10'>
        <h1>Movies</h1>
      </div>
      <Link to={"/film"}>
        <div className='text-2xl'>
          Oppenheimer
        </div>
      </Link>
    </div>
  )
}
