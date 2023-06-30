import React from 'react'
import './home.scss'
import Herobanner from './herobanner/Herobanner'
import Trending from './trending/trending'
import Popular from './popular/Popular'
import TopRated from './toprated/TopRated'

const Home = () => {
  return (
    <div className='homePage'>
      <Herobanner />
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home