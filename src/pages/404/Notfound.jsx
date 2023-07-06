import React from 'react'
import './notfound.scss'
import notfoundImg from "./notfoundImg.png"

const Notfound = () => {
  return (
    <>
    <div className="title">Oops !!</div>
      <div className='notfoundDiv'>

        <img src={notfoundImg} alt="notFound" />
      </div>
    </>



  )
}

export default Notfound