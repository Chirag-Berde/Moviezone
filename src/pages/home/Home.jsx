import React from 'react'
import './home.scss'
import Herobanner from './herobanner/Herobanner'
import Trending from './trending/trending'

const Home = () => {
  return (
    <div className='homePage'>
      <Herobanner />
      <Trending/>
      <div style={{height:1000}}></div>
    </div>
  )
}

export default Home