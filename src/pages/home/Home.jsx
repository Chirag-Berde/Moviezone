import React from 'react'
import './home.scss'
import Herobanner from './herobanner/Herobanner'

const Home = () => {
  return (
    <div className='homePage'>
      <Herobanner />
      <div style={{height:1000}}></div>
    </div>
  )
}

export default Home