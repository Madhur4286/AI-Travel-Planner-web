import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex items-center gap-9 mx-56 flex-col'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'><span className='text-[#f56551]'>Discover Your Next Adventure With AI: </span>Personalized Itineries At Your Fingertips</h1>

      <p className='text-xl text-gray-500 text-center'>Your Personel Trip Planner and Travel Curator, Creating Custom Itineries Tailored To Your Interest And Budget.</p>
      <Link to={'/create-trip'}>
      <Button>Get Started, It's Free</Button>
      </Link>

      <img src="/cover-photo.jpeg" alt="" className='-mt-3' />
    </div>
  )
}

export default Hero
